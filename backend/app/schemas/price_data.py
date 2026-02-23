from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class PriceDataBase(BaseModel):
    competitor_id: int
    product_name: str
    price: Decimal
    currency: str = "USD"
    source_url: str | None = None

class PriceDataCreate(PriceDataBase):
    pass

class PriceData(PriceDataBase):
    price_id: int
    collected_at: datetime
    job_id: int | None

    class Config:
        from_attributes = True