# crawler/parsers/normalize.py
"""
Normalizer for Market Competitor Analysis.

Reads the already-canonical dicts returned by each extractor
(extractors already output the correct field names), validates
each record via Pydantic, and writes the unified JSON output.

Output format (same for all 5 competitors):
{
  "competitor": "nepal_training",
  "source_url": "https://...",
  "scraped_at": "2026-02-25T10:00:00",
  "total_raw": 24,
  "total_normalized": 22,
  "courses": [
    {
      "course_name": "Basic PHP",
      "duration":    "50 hours or 2.5 months",
      "price":       4000.0,
      "currency":    "NPR",
      "url":         "https://...",
      "level":       null,
      "discount":    null
    },
    ...
  ]
}
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# ── Paths (relative to this file's location inside crawler/parsers/) ──────────
ROOT           = Path(__file__).resolve().parent.parent
NORMALIZED_DIR = ROOT / "data" / "normalized"
NORMALIZED_DIR.mkdir(parents=True, exist_ok=True)

# ── Validation constants ───────────────────────────────────────────────────────
REQUIRED_FIELDS = ["course_name", "duration", "price", "currency", "url"]

_BAD_DURATION = re.compile(
    r"(professional|lifetime|guidance|support|real outcomes)",
    re.IGNORECASE,
)
_BAD_TITLE = re.compile(r"(\d+/-|\|.*\d+:\d+)")


# ── Validation helpers ─────────────────────────────────────────────────────────

def _is_valid(record: dict) -> tuple[bool, str]:
    """
    Returns (True, "") if record is valid, or (False, reason) if not.
    Extractors already output canonical field names, so we only need to
    check presence, types, and known bad-value patterns.
    """
    for field in REQUIRED_FIELDS:
        val = record.get(field)
        if val is None or str(val).strip() == "":
            return False, f"missing required field: {field}"

    # Validate course_name
    cn = str(record["course_name"]).strip()
    if _BAD_TITLE.search(cn):
        return False, f"bad course_name: {cn!r}"

    # Validate duration
    dur = str(record["duration"]).strip()
    if _BAD_DURATION.search(dur):
        return False, f"duration contains description text: {dur!r}"

    # Validate price is numeric
    try:
        price = float(record["price"])
        if price <= 0:
            return False, f"price must be positive: {price}"
    except (TypeError, ValueError):
        return False, f"price not numeric: {record['price']!r}"

    # Validate URL
    url = str(record["url"]).strip()
    if not url.startswith("http"):
        return False, f"invalid url: {url!r}"

    return True, ""


def _clean_record(record: dict) -> dict:
    """Coerce types and clean whitespace on a validated record."""
    return {
        "course_name": str(record["course_name"]).strip(),
        "duration":    str(record["duration"]).strip(),
        "price":       float(record["price"]),
        "currency":    str(record["currency"]).strip().upper(),
        "url":         str(record["url"]).strip(),
        "level":       str(record["level"]).strip() if record.get("level") else None,
        "discount":    float(record["discount"]) if record.get("discount") is not None else None,
    }


# ── Main normalize function ────────────────────────────────────────────────────

def normalize(
    competitor: str,
    raw_courses: list[dict],
    source_url: str = "",
) -> dict:
    """
    Validate and clean a list of raw course dicts.
    Writes output to data/normalized/<competitor>.json.
    Returns the full output dict.
    """
    valid_courses = []
    skipped = 0

    for record in raw_courses:
        ok, reason = _is_valid(record)
        if not ok:
            skipped += 1
            continue
        valid_courses.append(_clean_record(record))

    output = {
        "competitor":        competitor,
        "source_url":        source_url,
        "scraped_at":        datetime.now(timezone.utc).isoformat(),
        "total_raw":         len(raw_courses),
        "total_normalized":  len(valid_courses),
        "courses":           valid_courses,
    }

    out_path = NORMALIZED_DIR / f"{competitor}.json"
    out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")

    print(
        f"  [{competitor:20s}]  "
        f"{len(valid_courses):>2} normalized  |  "
        f"{skipped:>2} skipped  →  {out_path.name}"
    )
    return output