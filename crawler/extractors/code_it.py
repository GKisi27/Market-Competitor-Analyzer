import requests
from bs4 import BeautifulSoup
import json


def extract_codeit():
    url = "https://codeit.com.np/upcoming-classes"
    
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")

    courses = []
    text = soup.get_text(separator="\n").split("\n")
    lines = [l.strip() for l in text if l.strip()]

    i = 0
    while i < len(lines):
        line = lines[i]
        if "Rs." in line and "/" in line:
            try:
                title = lines[i - 2]
                start = lines[i - 1]
                duration = lines[i + 1]

                parts = line.split(" ")
                price_current = parts[0]
                price_original = parts[1] if len(parts) > 1 else ""
                discount = parts[-1] if len(parts) > 2 else ""

                courses.append({
                    "course_name": title,
                    "start_date": start,
                    "duration": duration,
                    "price_current": price_current,
                    "price_original": price_original,
                    "discount": discount
                })
            except IndexError:
                pass
        i += 1
    return courses

if __name__ == "__main__":
    courses = extract_codeit()

    with open("codeit_upcoming_classes.json", "w", encoding="utf-8") as f:
        json.dump(courses, f, indent=4, ensure_ascii=False)

    print("code_it.json")
