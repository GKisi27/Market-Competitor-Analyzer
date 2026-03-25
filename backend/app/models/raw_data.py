from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class RawData(Base):
    __tablename__ = "raw_data"
   
    raw_data_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    job_id = Column(Integer, ForeignKey("crawler_jobs.job_id", ondelete="CASCADE"), nullable=False)
    config_id = Column(Integer, ForeignKey("scraping_configs.config_id", ondelete="CASCADE"), nullable=False)
    data_type = Column(String(50))
    raw_payload = Column(JSONB, nullable=False)
    fetched_at = Column(DateTime(timezone=True), server_default=func.now())
   
    # Relationships
    job = relationship("CrawlerJob", back_populates="raw_data")
    config = relationship("ScrapingConfig", back_populates="raw_data")
    processed_data = relationship("ProcessedData", back_populates="raw_data", uselist=False)