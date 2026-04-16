from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    filename: str

class DocumentOut(DocumentBase):
    id: int
    user_id: int
    file_url: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
