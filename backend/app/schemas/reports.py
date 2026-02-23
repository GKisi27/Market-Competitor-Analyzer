from pydantic import BaseModel
from datetime import datetime
from typing import Any, Dict

class ReportBase(BaseModel):
    dashboard_id: int
    filters_applied: Dict[str, Any] | None = None
    export_format: str = "pdf"

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    report_id: int
    generated_by: int | None
    generated_at: datetime

    class Config:
        from_attributes = True