from pydantic import BaseModel

class RoleBase(BaseModel):
    role_name: str
    description: str | None = None

class RoleCreate(RoleBase):
    pass

class Role(RoleBase):
    role_id: int

    class Config:
        from_attributes = True