from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class CurriculumData(Base):
    __tablename__ = "curriculum_data"
   
    curriculum_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    competitor_id = Column(Integer, ForeignKey("competitors.competitor_id", ondelete="CASCADE"), nullable=False)
    course_name = Column(String(255), nullable=False)
    duration = Column(String(50))
    level = Column(String(20))
    collected_at = Column(DateTime(timezone=True), server_default=func.now())
    job_id = Column(Integer, ForeignKey("crawler_jobs.job_id", ondelete="SET NULL"))
   
    # Relationships
    competitor = relationship("Competitor", back_populates="curriculum_data")
    job = relationship("CrawlerJob", back_populates="curriculum_data")
    skills = relationship("CurriculumSkill", back_populates="curriculum")