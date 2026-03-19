from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.session import Base

class Skill(Base):
    __tablename__ = "skills"
   
    skill_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    skill_name = Column(String(100), unique=True, nullable=False)
   
    # Relationships
    curriculum_skills = relationship("CurriculumSkill", back_populates="skill")