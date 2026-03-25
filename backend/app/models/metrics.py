from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.database.session import Base

class Metric(Base):
    __tablename__ = "metrics"
   
    metric_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    metric_name = Column(String(100), nullable=False)
    description = Column(Text)
   
    # Relationships
    competitor_metrics = relationship("CompetitorMetric", back_populates="metric")