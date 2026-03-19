from pydantic import BaseModel
from datetime import datetime
from typing import Any, Dict

class ProcessedDataBase(BaseModel):
    raw_data_id: int
    validated: bool = False
    cleaned_payload: Dict[str, Any] | None = None

class ProcessedDataCreate(ProcessedDataBase):
    pass

class ProcessedData(ProcessedDataBase):
    processed_id: int
    processed_at: datetime

    class Config:
        from_attributes = True