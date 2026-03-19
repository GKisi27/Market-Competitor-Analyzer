from pydantic import BaseModel
from datetime import datetime

class DashboardBase(BaseModel):
    name: str

class DashboardCreate(DashboardBase):
    pass

class Dashboard(DashboardBase):
    dashboard_id: int
    created_by: int | None
    created_at: datetime

    class Config:
        from_attributes = True