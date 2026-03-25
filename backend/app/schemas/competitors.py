from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import List, Optional

class CompetitorBase(BaseModel):
    name: str
    website_url: HttpUrl | None = None
    industry: str | None = None
    country: str | None = None
    status: bool = True

class CompetitorCreate(CompetitorBase):
    pass

class Competitor(CompetitorBase):
    competitor_id: int
    last_crawled_at: datetime | None

    class Config:
        from_attributes = True

class CompetitorSummary(BaseModel):
    activeCompetitors: int
    totalCoursesTracked: int
    avgMarketPrice: float

class CompetitorListItem(BaseModel):
    id: int
    name: str
    category: str
    courses: int
    avgPrice: str
    avgDuration: str
    websiteUrl: Optional[str] = None

class CourseDetail(BaseModel):
    course_name: str
    duration: Optional[str]
    level: Optional[str]
    price: Optional[float]
    currency: Optional[str]

class CompetitorDetail(BaseModel):
    id: int
    name: str
    website_url: Optional[str]
    industry: Optional[str]
    country: Optional[str]
    total_courses: int
    avg_price: str
    courses: List[CourseDetail]