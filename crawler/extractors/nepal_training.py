# crawler/extractors/nepal_training.py
"""
Extractor for: Nepal Training Centre
URL  : https://www.nepaltrainingcentre.com/computer-course-fees-with-discount-and-duration/
Page : Static HTML — one table with Course | Duration | Fee rows.

Strategy:
  - Use crawl4ai with no JS (static page, faster).
  - Parse the fee table with BeautifulSoup.
  - URL for every course = source page URL (no individual course pages).
  - Currency = NPR (Rs. prefix in fee column).
  - Discount = group-based, not per-course — stored in separate "discounts" key.
"""

from __future__ import annotations
import re
import asyncio
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig


SOURCE_URL = "https://www.nepaltrainingcentre.com/computer-course-fees-with-discount-and-duration/"
CURRENCY   = "NPR"


def _parse_price(raw: str) -> float | None:
    """'Rs. 4000', 'Rs  6000', 'Rs.10000' → 4000.0"""
    cleaned = re.sub(r'(?i)(rs\.?|,|\s)', '', raw).strip()
    try:
        return float(cleaned)
    except ValueError:
        return None


async def fetch() -> list[dict]:
    """
    Returns a list of canonical course dicts.
    Raw structure on page:
        <table> S.No | Course | Time Duration | Fees </table>
    """
    config = CrawlerRunConfig(
        word_count_threshold=0,
        verbose=False,
    )

    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=SOURCE_URL, config=config)

    if not result.success:
        print(f"[nepal_training] Crawl failed: {result.error_message}")
        return []

    soup = BeautifulSoup(result.html, "html.parser")
    courses = []

    # Find the fee table — it's the first <table> on the page
    tables = soup.find_all("table")
    if not tables:
        print("[nepal_training] No tables found on page.")
        return []

    fee_table = tables[0]
    rows = fee_table.find_all("tr")

    for row in rows:
        cells = [td.get_text(strip=True) for td in row.find_all("td")]
        if len(cells) < 4:
            continue  # skip header or malformed rows

        # cols: S.No | Course | Time Duration | Fees
        _, course_name, duration, fee_raw = cells[0], cells[1], cells[2], cells[3]

        if not course_name or course_name.lower() in ("course", "s.no"):
            continue  # skip header rows that slipped through

        price = _parse_price(fee_raw)
        if price is None:
            continue

        courses.append({
            "course_name": course_name,
            "duration":    duration,
            "price":       price,
            "currency":    CURRENCY,
            "url":         SOURCE_URL,
            "level":       None,
            "discount":    None,
        })

    print(f"[nepal_training] Extracted {len(courses)} courses.")
    return courses


if __name__ == "__main__":
    results = asyncio.run(fetch())
    for r in results:
        print(r)