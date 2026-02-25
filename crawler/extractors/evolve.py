# crawler/extractors/evolve.py
"""
Extractor for: Evolve IT Hub
URL  : https://www.evolveithub.com/courses
Page : JS-rendered. Course cards contain title, price, URL.
       Duration is NOT on the listing page — fetched from each course detail page.

Strategy:
  - Step 1: Scrape course listing page → get title, price, detail URL.
  - Step 2: For each course URL, fetch detail page → extract duration.
  - Currency = NPR (prices are plain integers like "15000" with no symbol).
  - Run detail fetches concurrently with asyncio.gather for speed.
"""

from __future__ import annotations
import re
import asyncio
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, BrowserConfig

BASE_URL    = "https://www.evolveithub.com"
COURSES_URL = f"{BASE_URL}/courses"
CURRENCY    = "NPR"

# Duration patterns to search in detail pages
_DURATION_RE = re.compile(
    r'(\d+[\d.]*\s*(?:months?|weeks?|days?|hours?|hrs?))',
    re.IGNORECASE,
)


def _parse_price(raw: str) -> float | None:
    """'15000', 'Rs.15,000', 'NPR 15000' → 15000.0"""
    cleaned = re.sub(r'(?i)(rs\.?|npr|inr|,|\s)', '', str(raw)).strip()
    try:
        return float(cleaned)
    except ValueError:
        return None


async def _fetch_duration(crawler: AsyncWebCrawler, url: str) -> str | None:
    """Fetch a course detail page and extract duration text."""
    run_cfg = CrawlerRunConfig(
        word_count_threshold=0,
        verbose=False,
        delay_before_return_html=1.0,
    )
    try:
        result = await crawler.arun(url=url, config=run_cfg)
        if not result.success:
            return None
        soup = BeautifulSoup(result.html, "html.parser")

        # Look for duration in structured data or visible text
        for text in soup.stripped_strings:
            m = _DURATION_RE.search(text)
            if m:
                return m.group(1).strip()
    except Exception:
        pass
    return None


async def fetch() -> list[dict]:
    """Returns a list of canonical course dicts with duration from detail pages."""
    browser_cfg = BrowserConfig(headless=True, verbose=False)
    list_cfg = CrawlerRunConfig(
        wait_for="css:.course, css:.course-card, css:article, css:.card",
        js_code="window.scrollTo(0, document.body.scrollHeight);",
        delay_before_return_html=2.5,
        word_count_threshold=0,
        verbose=False,
    )

    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        # ── Step 1: fetch course listing ─────────────────────────────────────
        list_result = await crawler.arun(url=COURSES_URL, config=list_cfg)

        if not list_result.success:
            print(f"[evolve] Listing crawl failed: {list_result.error_message}")
            return []

        soup = BeautifulSoup(list_result.html, "html.parser")
        raw_courses = []

        # Find all course links pointing to /course/<slug>
        course_links = soup.find_all("a", href=re.compile(r'/course/[^"\']+'))
        seen = set()

        for link in course_links:
            href = link.get("href", "")
            full_url = href if href.startswith("http") else BASE_URL + href
            if full_url in seen:
                continue
            seen.add(full_url)

            card = link.find_parent(["div", "article", "li"])
            if not card:
                card = link

            # Title
            title_el = card.find(["h2", "h3", "h4"])
            title = title_el.get_text(strip=True) if title_el else link.get_text(strip=True)
            if not title:
                continue

            # Price — look for numeric string in card
            price = None
            for el in card.find_all(string=re.compile(r'\d{4,}')):
                price = _parse_price(el.strip())
                if price:
                    break

            raw_courses.append({
                "course_name": title,
                "price":       price,
                "url":         full_url,
            })

        # ── Step 2: fetch durations from detail pages concurrently ────────────
        detail_urls = [c["url"] for c in raw_courses]
        durations = await asyncio.gather(
            *[_fetch_duration(crawler, url) for url in detail_urls]
        )

    courses = []
    for course, duration in zip(raw_courses, durations):
        if course["price"] is None:
            continue
        courses.append({
            "course_name": course["course_name"],
            "duration":    duration or "N/A",  # keep record even if not found
            "price":       course["price"],
            "currency":    CURRENCY,
            "url":         course["url"],
            "level":       None,
            "discount":    None,
        })

    print(f"[evolve] Extracted {len(courses)} courses.")
    return courses


if __name__ == "__main__":
    results = asyncio.run(fetch())
    for r in results:
        print(r)