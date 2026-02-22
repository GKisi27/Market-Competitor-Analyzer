from pydantic import BaseModel, field_validator 
from typing import List, Optional 
from datetime import datetime 


class Course(BaseModel):
    course_name: str
    price:float 
    currency:str = "NPR"
    duration: Optional[str] = None
    level: Optional[str] = None
    skills: List[str] = []
    url: Optional[str] = None

class NormalizeData(BaseModel):
    competitor: str
    courses: List[Course]
    scraped_at: datetime = datetime.utcnow()
    
