from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.users import User
from app.schemas.user import UserOut, UserUpdate
from app.core.security import get_password_hash, verify_password

router = APIRouter()
security = HTTPBearer()

def get_current_user(
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Mock token logic: "mock_token_for_<user_id>"
    try:
        token_str = token.credentials
        if not token_str.startswith("mock_token_for_"):
             raise credentials_exception
        
        user_id_str = token_str.replace("mock_token_for_", "")
        user_id = int(user_id_str)
        
        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise credentials_exception
        return user
    except (ValueError, AttributeError):
        raise credentials_exception

@router.get("/me", response_model=UserOut)
def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserOut)
def update_user_me(
    obj_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if obj_in.email:
        existing_user = db.query(User).filter(User.email == obj_in.email).first()
        if existing_user and existing_user.user_id != current_user.user_id:
            raise HTTPException(status_code=400, detail="Email already registered")
        current_user.email = obj_in.email
    
    if obj_in.full_name:
        current_user.full_name = obj_in.full_name
        
    if obj_in.newPassword:
        if not obj_in.currentPassword:
            raise HTTPException(status_code=400, detail="Current password required to set new password")
        if not verify_password(obj_in.currentPassword, current_user.password_hash):
            raise HTTPException(status_code=400, detail="Invalid current password")
        current_user.password_hash = get_password_hash(obj_in.newPassword)
        
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
