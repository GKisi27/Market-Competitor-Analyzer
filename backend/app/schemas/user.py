from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    status: bool = True

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    currentPassword: Optional[str] = None
    newPassword: Optional[str] = None

class UserOut(UserBase):
    user_id: int

    class Config:
        from_attributes = True
