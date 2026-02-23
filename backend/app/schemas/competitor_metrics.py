from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class CompetitorMetricBase(BaseModel):
    competitor_id: int
    metric_id: int
    metric_value: Decimal

class CompetitorMetricCreate(CompetitorMetricBase):
    pass

class CompetitorMetric(CompetitorMetricBase):
    id: int
    calculated_at: datetime

    class Config:
        from_attributes = True