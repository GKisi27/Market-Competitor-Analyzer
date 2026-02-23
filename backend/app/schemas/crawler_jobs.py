from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class CrawlerJobBase(BaseModel):
    triggered_by: int
    user_role_id: int | None = None
    status: Literal["pending", "running", "completed", "failed"] = "pending"

class CrawlerJobCreate(CrawlerJobBase):
    pass

class CrawlerJob(CrawlerJobBase):
    job_id: int
    start_time: datetime | None
    end_time: datetime | None

    class Config:
        from_attributes = True