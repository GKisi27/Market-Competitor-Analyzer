# crawler/extractors/code_it.py
"""
Extractor for: Code IT Nepal
URL  : https://codeit.com.np/
Page : JS-rendered. Course cards with title, schedule, price, enroll URL.

PREVIOUS ISSUE (now fixed):
  The old scraper stored schedule text in course_name, original price in
  duration, and never captured the URL. This extractor is a complete rewrite.

Strategy:
  - Scroll to load all course cards.
  - Each card: extract title from heading, price from discounted price element,
    duration from schedule/duration badge, URL from card's anchor href.
  - Currency = NPR (Rs. prefix).
  - Two price elements often exist: original (strikethrough) and discounted.
    We always capture the DISCOUNTED (lower) price.
"""

from __future__ import annotations
import re
import asyncio
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, BrowserConfig

BASE_URL = "https://codeit.com.np"
CURRENCY = "NPR"

_PRICE_RE    = re.compile(r'(?:rs\.?|npr)?\s*([\d,]+)', re.IGNORECASE)
_DURATION_RE = re.compile(
    r'(\d+[\d.]*\s*(?:months?|weeks?|days?|hours?|hrs?))',
    re.IGNORECASE,
)


def _parse_price(raw: str) -> float | None:
    """'Rs.1,499', 'Rs.8,500', '1499' → 1499.0"""
    m = _PRICE_RE.search(raw)
    if m:
        try:
            return float(m.group(1).replace(",", ""))
        except ValueError:
            pass
    return None


def _lowest_price(prices: list[float]) -> float | None:
    valid = [p for p in prices if p and p > 0]
    return min(valid) if valid else None


async def fetch() -> list[dict]:
    """Returns a list of canonical course dicts."""
    browser_cfg = BrowserConfig(headless=True, verbose=False)
    run_cfg = CrawlerRunConfig(
        # Scroll down to trigger lazy-loaded cards
        js_code="""
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 1500));
            window.scrollTo(0, 0);
        """,
        wait_for="css:.course, css:.course-card, css:article, css:.card",
        delay_before_return_html=3.0,
        word_count_threshold=0,
        verbose=False,
    )

    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        result = await crawler.arun(url=BASE_URL, config=run_cfg)

    if not result.success:
        print(f"[code_it] Crawl failed: {result.error_message}")
        return []

    soup = BeautifulSoup(result.html, "html.parser")
    courses = []
    seen_urls = set()

    # ── Strategy 1: find cards that contain course-detail links ───────────────
    # codeit.com.np uses cards with anchor links to course pages
    all_anchors = soup.find_all("a", href=True)

    for link in all_anchors:
        href = link["href"]
        # Skip non-course links (nav, social, etc.)
        if not href or href in ("#", "/") or "course" not in href.lower():
            if not re.search(r'/batch|/class|/training|/bootcamp', href, re.I):
                continue

        full_url = href if href.startswith("http") else BASE_URL.rstrip("/") + "/" + href.lstrip("/")
        if full_url in seen_urls:
            continue
        seen_urls.add(full_url)

        card = link.find_parent(["div", "article", "section", "li"]) or link

        # ── Title ──────────────────────────────────────────────────────────────
        title_el = card.find(["h1", "h2", "h3", "h4"])
        title = title_el.get_text(strip=True) if title_el else link.get_text(strip=True)

        # Skip if title is schedule text (contains pipe characters or time format)
        if not title or re.search(r'\d+:\d+|\|', title):
            continue

        # ── Duration ───────────────────────────────────────────────────────────
        duration = None
        for text in card.stripped_strings:
            m = _DURATION_RE.search(text)
            if m:
                duration = m.group(1).strip()
                break
        # fallback: look for "X Days" or "X month" patterns
        if not duration:
            for text in card.stripped_strings:
                m = re.search(r'(\d+\s+(?:day|days|month|months|week|weeks))', text, re.I)
                if m:
                    duration = m.group(1).strip()
                    break

        # ── Prices ─────────────────────────────────────────────────────────────
        all_prices = []
        for text in card.stripped_strings:
            if re.search(r'(?:rs\.?|npr|\d{3,})', text, re.I):
                p = _parse_price(text)
                if p:
                    all_prices.append(p)

        price = _lowest_price(all_prices)  # take discounted (lower) price

        if not title or price is None or duration is None:
            continue

        courses.append({
            "course_name": title,
            "duration":    duration,
            "price":       price,
            "currency":    CURRENCY,
            "url":         full_url,
            "level":       None,
            "discount":    None,
        })

    print(f"[code_it] Extracted {len(courses)} courses.")
    return courses


if __name__ == "__main__":
    results = asyncio.run(fetch())
    for r in results:
        print(r)