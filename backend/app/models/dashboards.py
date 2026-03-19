from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship 
from sqlalchemy.sql import func 
from app.database.session import Base


class Dashboard(Base):
    __tablename__ = "dashboards"
   
    dashboard_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    created_by = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
   
    # Relationships
    creator = relationship("User", back_populates="dashboards")
    reports = relationship("Report", back_populates="dashboard", cascade="all, delete-orphan")