from sqlalchemy import Integer, Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship 
from sqlalchemy.dialects.postgresql import JSONB
from app.database.session import Base
from sqlalchemy.sql import func 

class Report(Base):
    __tablename__ = "reports"
   
    report_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    dashboard_id = Column(Integer, ForeignKey("dashboards.dashboard_id", ondelete="CASCADE"), nullable=False)
    filters_applied = Column(JSONB, nullable=True)
    export_format = Column(String(20), default="pdf")
    generated_by = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
   
    # Relationships
    dashboard = relationship("Dashboard", back_populates="reports")
    generator = relationship("User", back_populates="reports")