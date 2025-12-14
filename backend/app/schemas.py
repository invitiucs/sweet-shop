from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str


class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetUpdate(SweetCreate):
    pass
