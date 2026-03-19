from pydantic import BaseModel
from datetime import datetime

class ScrapingConfigBase(BaseModel):
    competitor_id: int
    data_type: str
    css_selector: str | None = None
    attribute: str | None = None
    is_active: bool = True

class ScrapingConfigCreate(ScrapingConfigBase):
    pass

class ScrapingConfig(ScrapingConfigBase):
    config_id: int
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True