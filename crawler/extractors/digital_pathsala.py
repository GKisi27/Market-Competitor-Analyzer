import asyncio
import json
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler

BASE_URL = "https://digitalpathshalanepal.com"

COURSES = [
    "/courses/flutter",
    "/courses/mern-stack-training-in-nepal",
    "/courses/react-native-training-in-nepal",
    "/courses/react-js-training-in-nepal",
    "/courses/web-development-training-in-nepal",
    "/courses/ai-ml-training-in-nepal",
    "/courses/node-js-training-in-nepal",
    "/courses/full-stack-saas-development-training-in-nepal",
    "/courses/digital-marketing-training-in-nepal",
    "/courses/next-js-training-in-nepal",
    "/courses/lifetime-free-at-999-"
]

async def extract_digital_pathsala():
    data = []

    async with AsyncWebCrawler() as crawler:
        for path in COURSES:
            url = BASE_URL + path
            print(f"[*] Crawling: {url}")

            result = await crawler.arun(url=url)
            soup = BeautifulSoup(result.html, "html.parser")

            # Extract title
            title_tag = soup.find("h1")
            title = title_tag.get_text(strip=True) if title_tag else ""

            # Extract price
            price = ""
            for txt in soup.stripped_strings:
                if "Rs." in txt or "₹" in txt:
                    price = txt
                    break

            # Extract duration
            duration = ""
            for txt in soup.stripped_strings:
                if "Days" in txt or "Months" in txt or "Lifetime" in txt:
                    duration = txt
                    break

            # Extract student count
            students = ""
            for txt in soup.stripped_strings:
                if "+" in txt and "Students" in txt:
                    students = txt
                    break

            data.append({
                "title": title,
                "url": url,
                "price": price,
                "duration": duration,
                "students": students
            })

    return data

async def main():
    courses = await extract_digital_pathsala()

    with open("digitalpathshala_all_courses.json", "w", encoding="utf-8") as f:
        json.dump(courses, f, indent=4, ensure_ascii=False)

    print("digital_pathsala.json")

if __name__ == "__main__":
    asyncio.run(main())
