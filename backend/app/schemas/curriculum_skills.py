from pydantic import BaseModel

class CurriculumSkillBase(BaseModel):
    curriculum_id: int
    skill_id: int

class CurriculumSkillCreate(CurriculumSkillBase):
    pass

class CurriculumSkill(CurriculumSkillBase):
    id: int

    class Config:
        from_attributes = True