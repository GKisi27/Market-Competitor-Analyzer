import asyncio
import json
from crawl4ai import AsyncWebCrawler
from bs4 import BeautifulSoup

COURSE_URLS = [
    "https://letslearn.asia/course/web-development/",
    "https://letslearn.asia/course/digital-marketing/",
    "https://letslearn.asia/course/mobile-application-development/",
    "https://letslearn.asia/course/software-development-course/",
    "https://letslearn.asia/course/artificial-intelligence-course/",
    "https://letslearn.asia/course/graphic-design-ui-ux/"
]

OUTPUT_FILE = "letslearn_courses.json"


def clean_text(text):
    return " ".join(text.split()) if text else None


async def scrape_course(crawler, url):
    result = await crawler.arun(url=url)
    soup = BeautifulSoup(result.html, "lxml")

    # Course Name
    title = soup.select_one("h1")

    # Description (main content area)
    description = soup.select_one(".tutor-course-content, .course-content, .entry-content")

    # Price & Duration (text-based search – robust)
    price = soup.find(string=lambda t: t and ("Rs" in t or "NPR" or "/-" in t))
    duration = soup.find(string=lambda t: t and ("Month" in t or "Months" in t))

    return {
        "course_name": clean_text(title.get_text()) if title else "Not available",
        "price": clean_text(price) if price else "Not listed",
        "duration": clean_text(duration) if duration else "Not listed",
        "description": clean_text(description.get_text()) if description else "Not available",
        "course_url": url
    }


async def main():
    courses = []

    async with AsyncWebCrawler() as crawler:
        for url in COURSE_URLS:
            print(f"🔍 Scraping: {url}")
            course_data = await scrape_course(crawler, url)
            courses.append(course_data)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(courses, f, indent=4, ensure_ascii=False)

    print(f"\n✅ Scraped {len(courses)} courses")
    print(f"📁 Saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    asyncio.run(main())
