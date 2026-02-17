import requests
from bs4 import BeautifulSoup
import json

url = "https://codeit.com.np/upcoming-classes"
resp = requests.get(url)
soup = BeautifulSoup(resp.text, "html.parser")

courses = []
text = soup.get_text(separator="\n").split("\n")
lines = [l.strip() for l in text if l.strip()]

# find entries
i = 0
while i < len(lines):
    line = lines[i]
    if "Rs." in line and "/" in line:
        # price line
        # look back for title 2 lines above
        title = lines[i - 2]
        # start date is just above
        start = lines[i - 1]
        # duration is the next line after start
        duration = lines[i + 1]
        # original price & discount
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
    i += 1

with open("codeit_upcoming_classes.json", "w", encoding="utf-8") as f:
    json.dump(courses, f, indent=4, ensure_ascii=False)

print("Saved codeit_upcoming_classes.json")
