import json
from pathlib import Path
from typing import Dict, Any
from .schemas import NormalizedData, Course
from ..config import COMPETITORS, STANDARD_FIELDS
from ..utils.helpers import save_json, load_json

def normalize_site(raw_data: Dict[str, Any], competitor_key: str) -> Dict:
    """Convert raw JSON to standard format for ONE site."""
    competitor = COMPETITORS[competitor_key]
    
    # Assume raw_data has a 'courses' key (adjust per your JSONs)
    raw_courses = raw_data.get("courses", raw_data.get("results", []))
    
    normalized_courses = []
    for raw_course in raw_courses:
        # Smart mapping: try multiple possible keys
        course_data = {}
        for std_field, possible_keys in STANDARD_FIELDS.items():
            for key in possible_keys:
                if key in raw_course:
                    course_data[std_field] = raw_course[key]
                    break
            else:
                course_data[std_field] = None  # default
        
        # Special fixes (e.g. price as string → float)
        if course_data["price"]:
            try:
                course_data["price"] = float(course_data["price"].replace("$", "").replace(",", ""))
            except:
                course_data["price"] = 0.0
        
        normalized_courses.append(Course(**course_data).dict())
    
    return {
        "competitor": competitor["name"],
        "courses": normalized_courses,
        "scraped_at": raw_data.get("scraped_at", "2025-02-17T08:59:00")
    }

def normalize_all():
    """Run for ALL 5 sites → save merged JSONs."""
    all_normalized = []
    
    for key, info in COMPETITORS.items():
        raw_path = Path("crawler") / info["raw_file"]
        if raw_path.exists():
            raw_data = load_json(raw_path)
            normalized = normalize_site(raw_data, key)
            all_normalized.append(normalized)
            
            # Save per-competitor too
            save_json(normalized, f"data/normalized/{key}_normalized.json")
            print(f"Normalized: {key}")
    
    # Merge all into one big file
    merged = {"all_courses": [c for n in all_normalized for c in n["courses"]]}
    save_json(merged, "data/normalized/courses.json")
    print("All JSONs normalized and merged!")
    
    return all_normalized