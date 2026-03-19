from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base

class CurriculumSkill(Base):
    __tablename__ = "curriculum_skills"
   
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    curriculum_id = Column(Integer, ForeignKey("curriculum_data.curriculum_id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.skill_id", ondelete="CASCADE"), nullable=False)
   
    # Relationships
    curriculum = relationship("CurriculumData", back_populates="skills")
    skill = relationship("Skill", back_populates="curriculum_skills")