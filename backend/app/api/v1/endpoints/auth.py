from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.auth import SignUpRequest, LoginRequest, Token
from app.models.users import User
from app.core.security import get_password_hash, verify_password

router = APIRouter()

@router.post("/signup", response_model=dict, status_code=status.HTTP_201_CREATED)
def signup(request: SignUpRequest, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    hashed_password = get_password_hash(request.password)
    
    # Create full name
    full_name_parts = [request.firstName, request.lastName]
    full_name = " ".join(full_name_parts)
    
    # Create user
    new_user = User(
        full_name=full_name,
        email=request.email,
        password_hash=hashed_password,
        status=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully", "user_id": new_user.user_id}

@router.post("/login", response_model=Token)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.userEmail).first()
    
    password_valid = False
    if user:
        try:
            password_valid = verify_password(request.userPass, user.password_hash)
        except Exception:
            # Handle cases where hash is invalid (e.g. old sha256)
            password_valid = False

    if not user or not password_valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Extract first name from full_name
    first_name = user.full_name.split()[0] if user.full_name else "User"
    
    # Return mock token with firstName
    return {
        "access_token": "mock_token_for_" + str(user.user_id),
        "token_type": "bearer",
        "firstName": first_name
    }
