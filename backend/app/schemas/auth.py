from pydantic import BaseModel, EmailStr

from typing import Optional

class SignUpRequest(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    userEmail: EmailStr
    userPass: str

class Token(BaseModel):
    access_token: str
    token_type: str
    firstName: Optional[str] = None
