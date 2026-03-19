# crawler/extractors/lets_learn.py
"""
Extractor for: LetsLearn Nepal
URL  : https://letslearn.asia/courses
Page : WordPress site — course listing with cards.
       Each card has: title, duration, price (NRP format), enroll URL.

Strategy:
  - Scrape the /courses listing page.
  - Parse course cards: title, duration badge, price (discounted), URL.
  - Currency = NPR ("NRP." prefix used on site, normalised to NPR).
  - Level extracted from course detail page "Level" badge where available.
  - Prices appear as: "NRP. 25,000" (original) and "NRP. 15,000 /-" (discounted).
    We capture the LOWER (discounted) price.
"""

from __future__ import annotations
import re
import asyncio
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, BrowserConfig

BASE_URL    = "https://letslearn.asia"
COURSES_URL = f"{BASE_URL}/courses"
CURRENCY    = "NPR"

_PRICE_RE    = re.compile(r'(?:NRP?\.?\s*)([\d,]+)', re.IGNORECASE)
_DURATION_RE = re.compile(r'(\d+[\d.]*\s*(?:months?|weeks?|days?|hours?))', re.IGNORECASE)
_LEVEL_RE    = re.compile(r'(beginner|intermediate|advanced|basic\s*[–-]\s*advance)', re.IGNORECASE)


def _parse_price(raw: str) -> float | None:
    """'NRP. 15,000 /-' or 'NRP. 25,000' → 15000.0"""
    m = _PRICE_RE.search(raw)
    if m:
        try:
            return float(m.group(1).replace(",", ""))
        except ValueError:
            pass
    # fallback: strip all non-numeric except dot
    cleaned = re.sub(r'[^\d.]', '', raw)
    try:
        return float(cleaned) if cleaned else None
    except ValueError:
        return None


def _lowest_price(prices: list[float]) -> float | None:
    valid = [p for p in prices if p and p > 0]
    return min(valid) if valid else None


async def fetch() -> list[dict]:
    """Returns a list of canonical course dicts."""
    browser_cfg = BrowserConfig(headless=True, verbose=False)
    run_cfg = CrawlerRunConfig(
        wait_for="css:.course, css:article, css:.card, css:.elementor-post",
        js_code="window.scrollTo(0, document.body.scrollHeight);",
        delay_before_return_html=2.5,
        word_count_threshold=0,
        verbose=False,
    )

    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        result = await crawler.arun(url=COURSES_URL, config=run_cfg)

    if not result.success:
        print(f"[lets_learn] Crawl failed: {result.error_message}")
        return []

    soup = BeautifulSoup(result.html, "html.parser")
    courses = []
    seen_urls = set()

    # Course cards link to /course/<slug>
    course_links = soup.find_all("a", href=re.compile(r'/course/[^"\']+'))

    for link in course_links:
        href = link.get("href", "")
        full_url = href if href.startswith("http") else BASE_URL + href

        if full_url in seen_urls:
            continue
        seen_urls.add(full_url)

        card = link.find_parent(["div", "article", "li", "section"]) or link

        # ── Title ──────────────────────────────────────────────────────────────
        title_el = card.find(["h2", "h3", "h4"])
        title = title_el.get_text(strip=True) if title_el else link.get_text(strip=True)
        if not title:
            continue

        # ── Duration ───────────────────────────────────────────────────────────
        duration = None
        for text in card.stripped_strings:
            m = _DURATION_RE.search(text)
            if m:
                duration = m.group(1).strip()
                break

        # ── Prices — collect all, take the lowest ─────────────────────────────
        raw_prices = []
        for text in card.stripped_strings:
            if re.search(r'NRP?', text, re.I) or re.search(r'\d{4,}', text):
                p = _parse_price(text)
                if p:
                    raw_prices.append(p)
        price = _lowest_price(raw_prices)

        # ── Level ──────────────────────────────────────────────────────────────
        level = None
        for text in card.stripped_strings:
            m = _LEVEL_RE.search(text)
            if m:
                level = m.group(1).strip()
                break

        if not title or price is None or duration is None:
            continue

        courses.append({
            "course_name": title,
            "duration":    duration,
            "price":       price,
            "currency":    CURRENCY,
            "url":         full_url,
            "level":       level,
            "discount":    None,
        })

    print(f"[lets_learn] Extracted {len(courses)} courses.")
    return courses


if __name__ == "__main__":
    results = asyncio.run(fetch())
    for r in results:
        print(r)