from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.database.session import Base

class Competitor(Base):
    __tablename__ = "competitors"
   
    competitor_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    website_url = Column(String(255), unique=True)
    industry = Column(String(50))
    country = Column(String(50))
    status = Column(Boolean, default=True)
    last_crawled_at = Column(DateTime(timezone=True))
   
    # Relationships
    configs = relationship("ScrapingConfig", back_populates="competitor", cascade="all, delete-orphan")
    price_data = relationship("PriceData", back_populates="competitor")
    curriculum_data = relationship("CurriculumData", back_populates="competitor")
    metrics = relationship("CompetitorMetric", back_populates="competitor")