from pydantic import BaseModel
from datetime import datetime
from typing import Any, Dict

class RawDataBase(BaseModel):
    job_id: int
    config_id: int
    data_type: str | None = None
    raw_payload: Dict[str, Any]

class RawDataCreate(RawDataBase):
    pass

class RawData(RawDataBase):
    raw_data_id: int
    fetched_at: datetime

    class Config:
        from_attributes = True