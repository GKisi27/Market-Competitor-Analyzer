from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base

class CrawlerJob(Base):
    __tablename__ = "crawler_jobs"
   
    job_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    triggered_by = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"), nullable=False)
    user_role_id = Column(Integer, ForeignKey("user_roles.user_role_id", ondelete="SET NULL"))
    status = Column(String(20), default="pending") # pending, running, completed, failed
    start_time = Column(DateTime(timezone=True))
    end_time = Column(DateTime(timezone=True))
   
    # Relationships
    triggered_by_user = relationship("User", back_populates="crawler_jobs")
    user_role = relationship("UserRole")
    raw_data = relationship("RawData", back_populates="job", cascade="all, delete-orphan")
    price_data = relationship("PriceData", back_populates="job")
    curriculum_data = relationship("CurriculumData", back_populates="job")
    