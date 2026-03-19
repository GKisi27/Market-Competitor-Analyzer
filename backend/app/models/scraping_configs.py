from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class ScrapingConfig(Base):
    __tablename__ = "scraping_configs"
   
    config_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    competitor_id = Column(Integer, ForeignKey("competitors.competitor_id", ondelete="CASCADE"), nullable=False)
    data_type = Column(String(50), nullable=False) # price, curriculum, etc.
    css_selector = Column(String(255))
    attribute = Column(String(50))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
   
    # Relationships
    competitor = relationship("Competitor", back_populates="configs")
    raw_data = relationship("RawData", back_populates="config")