# parsers/schemas.py
"""
Pydantic v2 validation schema for normalized course records.

Used in TWO places:
  1. crawler/parsers/normalize.py  — validates extractor output before saving
  2. seed.py                       — re-validates before inserting into DB

Extractors already output canonical field names, so this schema
only handles type coercion and value validation (no key renaming).
"""

from __future__ import annotations
import re
from typing import Optional
from pydantic import BaseModel, field_validator

_BAD_DURATION = re.compile(
    r"(professional|lifetime|guidance|support|real outcomes)",
    re.IGNORECASE,
)
_BAD_TITLE = re.compile(r"(\d+/-|\|.*\d+:\d+)")


class NormalizedCourse(BaseModel):
    # ── Required ───────────────────────────────────────────────────────────────
    course_name: str
    duration:    str
    price:       float
    currency:    str
    url:         str

    # ── Optional ───────────────────────────────────────────────────────────────
    level:    Optional[str]   = None
    discount: Optional[float] = None

    # ── Validators ─────────────────────────────────────────────────────────────

    @field_validator("course_name", mode="before")
    @classmethod
    def validate_course_name(cls, v: object) -> str:
        s = str(v).strip()
        if not s:
            raise ValueError("course_name cannot be empty")
        if _BAD_TITLE.search(s):
            raise ValueError(f"course_name looks like schedule/price text: {s!r}")
        return s

    @field_validator("duration", mode="before")
    @classmethod
    def validate_duration(cls, v: object) -> str:
        s = str(v).strip()
        if not s:
            raise ValueError("duration cannot be empty")
        if _BAD_DURATION.search(s):
            raise ValueError(f"duration contains description text: {s!r}")
        return s

    @field_validator("price", mode="before")
    @classmethod
    def parse_price(cls, v: object) -> float:
        """
        Handles all real formats found across 5 competitors:
          "Rs. 4000", "Rs.8,500", "Rs  6000"  → NPR values
          "₹999", "₹1,499"                    → INR values
          "15000", 15000, 15000.0             → plain numbers
          "NRP. 15,000 /-"                    → LetsLearn format
        """
        if isinstance(v, (int, float)):
            return float(v)
        cleaned = re.sub(
            r'(?i)(rs\.?|nrp\.?|npr|inr|usd|₹|\$|,|/-|\s)', '', str(v)
        ).strip()
        if not cleaned:
            raise ValueError(f"Cannot extract price from: {v!r}")
        try:
            return float(cleaned)
        except ValueError:
            raise ValueError(f"Cannot parse price from: {v!r}")

    @field_validator("currency", mode="before")
    @classmethod
    def normalise_currency(cls, v: object) -> str:
        """Uppercase and strip. 'npr' → 'NPR', 'inr' → 'INR'"""
        return str(v).strip().upper()

    @field_validator("url", mode="before")
    @classmethod
    def validate_url(cls, v: object) -> str:
        s = str(v).strip()
        if not s.startswith("http"):
            raise ValueError(f"URL must start with http: {s!r}")
        return s

    @field_validator("discount", mode="before")
    @classmethod
    def parse_discount(cls, v: object) -> Optional[float]:
        if v is None or str(v).strip() == "":
            return None
        cleaned = re.sub(r'[%\s,]', '', str(v))
        try:
            return float(cleaned)
        except ValueError:
            return None  # silently drop unparseable discounts

    @field_validator("level", mode="before")
    @classmethod
    def clean_level(cls, v: object) -> Optional[str]:
        if v is None or str(v).strip() == "":
            return None
        return str(v).strip()

    class Config:
        extra = "ignore"  # silently drop any extra fields