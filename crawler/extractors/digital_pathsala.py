# crawler/extractors/digital_pathsala.py
"""
Extractor for: Digital Pathshala Nepal
URL  : https://digitalpathshalanepal.com/courses
Page : React/JS-rendered SPA — requires JS execution.

Strategy:
  - Use crawl4ai with JS enabled (wait for course cards to render).
  - Each course card contains: title, price (rupee-sign prefix), duration, url.
  - Currency = INR (rupee sign ₹ confirmed on all price tags).
  - Skip records where duration contains description text (known data quality issue).
  - Skip garbage titles like "LifetimeFreeat999/-".
"""

from __future__ import annotations
import re
import asyncio
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, BrowserConfig

BASE_URL  = "https://digitalpathshalanepal.com"
COURSES_URL = f"{BASE_URL}/courses"
CURRENCY  = "INR"

# Patterns that indicate duration field contains description text
_BAD_DURATION = re.compile(
    r"(professional|lifetime|guidance|support|real outcomes|outcome|training)",
    re.IGNORECASE,
)

# Patterns that mark a title as garbage
_BAD_TITLE = re.compile(r'\d+/-')


def _parse_price(raw: str) -> float | None:
    """'₹999', '₹1,499', '₹4000' → 999.0 / 1499.0 / 4000.0"""
    cleaned = re.sub(r'[₹,\s]', '', raw).strip()
    try:
        return float(cleaned)
    except ValueError:
        return None


async def fetch() -> list[dict]:
    """
    Returns a list of canonical course dicts.
    Course cards on digitalpathshalanepal.com are rendered via React.
    We wait for '.course-card' or equivalent elements to appear.
    """
    browser_cfg = BrowserConfig(headless=True, verbose=False)
    run_cfg = CrawlerRunConfig(
        wait_for="css:.card, css:.course-card, css:.course-item, css:article",
        js_code="window.scrollTo(0, document.body.scrollHeight);",
        delay_before_return_html=2.0,
        word_count_threshold=0,
        verbose=False,
    )

    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        result = await crawler.arun(url=COURSES_URL, config=run_cfg)

    if not result.success:
        print(f"[digital_pathsala] Crawl failed: {result.error_message}")
        return []

    soup = BeautifulSoup(result.html, "html.parser")
    courses = []

    # Strategy 1: look for anchor tags that link to /courses/<slug>
    course_links = soup.find_all("a", href=re.compile(r'/courses/[^"]+'))

    seen_urls = set()
    for link in course_links:
        href = link.get("href", "")
        full_url = href if href.startswith("http") else BASE_URL + href

        if full_url in seen_urls:
            continue
        seen_urls.add(full_url)

        # Walk up to find the card container
        card = link.find_parent(["div", "article", "li", "section"])
        if not card:
            card = link

        # Extract title — try heading tags first, then link text
        title_el = card.find(["h2", "h3", "h4", "h5"])
        title = title_el.get_text(strip=True) if title_el else link.get_text(strip=True)

        if not title or _BAD_TITLE.search(title):
            continue

        # Extract price — look for rupee sign
        price_el = card.find(string=re.compile(r'₹'))
        price_raw = price_el.strip() if price_el else ""
        price = _parse_price(price_raw)
        if price is None:
            # try any element with price-like content
            for el in card.find_all(string=re.compile(r'₹\s*\d+')):
                price = _parse_price(el)
                if price:
                    break

        # Extract duration
        dur_el = card.find(string=re.compile(r'\d+\s*(days?|months?|weeks?|hours?)', re.I))
        duration = dur_el.strip() if dur_el else None

        if duration and _BAD_DURATION.search(duration):
            duration = None  # will be skipped at normalization if None

        if not title or price is None:
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

    print(f"[digital_pathsala] Extracted {len(courses)} courses.")
    return courses


if __name__ == "__main__":
    results = asyncio.run(fetch())
    for r in results:
        print(r)