# crawler/config.py
from pathlib import Path

ROOT           = Path(__file__).resolve().parent
RAW_DIR        = ROOT / "data" / "raw"
NORMALIZED_DIR = ROOT / "data" / "normalized"

RAW_DIR.mkdir(parents=True, exist_ok=True)
NORMALIZED_DIR.mkdir(parents=True, exist_ok=True)

CRAWL_HEADLESS = True
CRAWL_VERBOSE  = False

COMPETITORS = {
    "nepal_training":   "https://www.nepaltrainingcentre.com/computer-course-fees-with-discount-and-duration/",
    "digital_pathsala": "https://digitalpathshalanepal.com/courses",
    "evolve":           "https://www.evolveithub.com/courses",
    "lets_learn":       "https://letslearn.asia/courses",
    "code_it":          "https://codeit.com.np/",
}

REQUIRED_FIELDS = ["course_name", "duration", "price", "currency", "url"]

# Competitor names only — extractor modules imported in run.py
COMPETITOR_NAMES = list(COMPETITORS.keys())