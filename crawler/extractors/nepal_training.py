import asyncio
import json
from crawl4ai import AsyncWebCrawler
from bs4 import BeautifulSoup

URL = "https://www.nepaltrainingcentre.com/computer-course-fees-with-discount-and-duration/"
OUTPUT_FILE = "nepal_trainingcentre_courses.json"


def extract_nepal_training(soup):
    courses = []
    table = soup.find("table")

    if not table:
        return courses

    rows = table.find_all("tr")

    for row in rows[1:]:  # Skip header row
        cols = row.find_all(["td", "th"])
        if len(cols) >= 4:
            course_name = cols[1].get_text(strip=True)
            duration = cols[2].get_text(strip=True)
            fee = cols[3].get_text(strip=True)

            if course_name:  # Only include valid rows
                courses.append({
                    "course_name": course_name,
                    "duration": duration,
                    "fee": fee
                })

    return courses


def parse_discount_table(soup):
    discounts = []
    tables = soup.find_all("table")

    # The discount table appears after the course table; often second one
    if len(tables) > 1:
        discount_table = tables[1]
        rows = discount_table.find_all("tr")

        for row in rows[1:]:
            cells = row.find_all(["td", "th"])
            if len(cells) >= 3:
                group = cells[1].get_text(strip=True)
                discount = cells[2].get_text(strip=True)
                discounts.append({
                    "group": group,
                    "discount": discount
                })
    return discounts


async def main():
    async with AsyncWebCrawler() as crawler:
        print(f" Crawling {URL}")
        result = await crawler.arun(url=URL)

        soup = BeautifulSoup(result.html, "lxml")

        courses = extract_nepal_training(soup)
        discounts = parse_discount_table(soup)

        data = {
            "source_url": URL,
            "courses": courses,
            "discounts": discounts
        }

        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

        print(f" Saved {len(courses)} courses and {len(discounts)} discounts to {OUTPUT_FILE}")


if __name__ == "__main__":
    asyncio.run(main())
