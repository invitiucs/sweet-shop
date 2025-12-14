from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from app.schemas import UserCreate, UserLogin
from app.models import User
from app.database import SessionLocal
from app.auth_utils import hash_password, verify_password, create_token

router = APIRouter()

@router.post("/register")
def register(user: UserCreate):
    db: Session = SessionLocal()

    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="User already exists")

    is_admin = True if user.username == "admin" else False

    new_user = User(
        username=user.username,
        password_hash=hash_password(user.password),
        is_admin=is_admin
    )
    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: UserLogin):
    db: Session = SessionLocal()
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(db_user.username)
    return {"access_token": token, "token_type": "bearer"}
