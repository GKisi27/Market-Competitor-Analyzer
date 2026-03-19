from sqlalchemy import Column, Integer, DateTime, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class CompetitorMetric(Base):
    __tablename__ = "competitor_metrics"
   
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    competitor_id = Column(Integer, ForeignKey("competitors.competitor_id", ondelete="CASCADE"), nullable=False)
    metric_id = Column(Integer, ForeignKey("metrics.metric_id", ondelete="CASCADE"), nullable=False)
    metric_value = Column(DECIMAL(10, 2), nullable=False)
    calculated_at = Column(DateTime(timezone=True), server_default=func.now())
   
    # Relationships
    competitor = relationship("Competitor", back_populates="metrics")
    metric = relationship("Metric", back_populates="competitor_metrics")