from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class PriceData(Base):
    __tablename__ = "price_data"
   
    price_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    competitor_id = Column(Integer, ForeignKey("competitors.competitor_id", ondelete="CASCADE"), nullable=False)
    product_name = Column(String(255), nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    currency = Column(String(10), default="USD")
    collected_at = Column(DateTime(timezone=True), server_default=func.now())
    source_url = Column(String(255))
    job_id = Column(Integer, ForeignKey("crawler_jobs.job_id", ondelete="SET NULL"))
   
    # Relationships
    competitor = relationship("Competitor", back_populates="price_data")
    job = relationship("CrawlerJob", back_populates="price_data")