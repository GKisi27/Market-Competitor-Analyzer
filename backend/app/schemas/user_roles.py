from pydantic import BaseModel

class UserRoleBase(BaseModel):
    user_id: int
    role_id: int

class UserRoleCreate(UserRoleBase):
    pass

class UserRole(UserRoleBase):
    user_role_id: int

    class Config:
        from_attributes = True