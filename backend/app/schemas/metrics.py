from pydantic import BaseModel

class MetricBase(BaseModel):
    metric_name: str
    description: str | None = None

class MetricCreate(MetricBase):
    pass

class Metric(MetricBase):
    metric_id: int

    class Config:
        from_attributes = True