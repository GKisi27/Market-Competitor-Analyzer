from pydantic import BaseModel
from datetime import datetime

class CurriculumDataBase(BaseModel):
    competitor_id: int
    course_name: str
    duration: str | None = None
    level: str | None = None

class CurriculumDataCreate(CurriculumDataBase):
    pass

class CurriculumData(CurriculumDataBase):
    curriculum_id: int
    collected_at: datetime
    job_id: int | None

    class Config:
        from_attributes = True