import asyncio
import json
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler

BASE_URL = "https://www.evolveithub.com"
COURSES_URL = f"{BASE_URL}/courses"


async def extract_evolve():
    courses = []

    async with AsyncWebCrawler() as crawler:
        # 1. Crawl courses listing page
        listing_result = await crawler.arun(url=COURSES_URL)

        soup = BeautifulSoup(listing_result.html, "html.parser")

        # Find course links
        course_links = []
        for a in soup.select("a[href]"):
            href = a.get("href")
            if href and "/course/" in href:
                full_url = href if href.startswith("http") else BASE_URL + href
                course_links.append(full_url)

        # Remove duplicates
        course_links = list(set(course_links))

        # 2. Crawl each course page
        for url in course_links:
            print(f"Crawling: {url}")
            result = await crawler.arun(url=url)
            course_soup = BeautifulSoup(result.html, "html.parser")

            # Extract title
            title_tag = course_soup.find("h1")
            title = title_tag.get_text(strip=True) if title_tag else ""

            # Try extracting price (site does NOT expose it normally)
            price = ""
            for text in course_soup.stripped_strings:
                if "₹" in text or "Rs." in text or "$" in text:
                    price = text
                    break

            courses.append({
                "title": title,
                "url": url,
                "price": price  # placeholder remains if not found
            })

    return courses


async def main():
    courses = await extract_evolve()

    with open("evolveithub_courses.json", "w", encoding="utf-8") as f:
        json.dump(courses, f, indent=4, ensure_ascii=False)

    print("✅ Data saved to evolveithub_courses.json")


if __name__ == "__main__":
    asyncio.run(main())
