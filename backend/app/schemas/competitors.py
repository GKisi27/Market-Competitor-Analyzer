from pydantic import BaseModel, HttpUrl
from datetime import datetime

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