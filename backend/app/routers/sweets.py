from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import SweetCreate, SweetUpdate
from app.models import Sweet
from app.dependencies import get_db, get_current_user, admin_only


router = APIRouter()

@router.post("/")
def add_sweet(
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_sweet = Sweet(**sweet.dict())
    db.add(new_sweet)
    db.commit()
    return {"message": "Sweet added"}

@router.get("/")
def get_sweets(db: Session = Depends(get_db)):
    return db.query(Sweet).all()

@router.put("/{id}")
def update_sweet(
    id: int,
    sweet: SweetUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    s = db.query(Sweet).get(id)
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")

    for key, value in sweet.dict().items():
        setattr(s, key, value)

    db.commit()
    return {"message": "Sweet updated"}

@router.delete("/{id}")
def delete_sweet(
    id: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):
    sweet = db.query(Sweet).get(id)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted"}

@router.post("/{id}/restock")
def restock_sweet(
    id: int,
    amount: int = 10,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):
    sweet = db.query(Sweet).get(id)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.quantity += amount
    db.commit()
    return {"message": "Sweet restocked", "quantity": sweet.quantity}


@router.post("/{id}/purchase")
def purchase_sweet(id: int, db: Session = Depends(get_db)):
    s = db.query(Sweet).get(id)
    if not s or s.quantity <= 0:
        raise HTTPException(status_code=400, detail="Out of stock")

    s.quantity -= 1
    db.commit()
    return {"message": "Purchase successful"}
@router.get("/search")
def search_sweets(
    name: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Sweet)

    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))

    if category:
        query = query.filter(Sweet.category.ilike(f"%{category}%"))

    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)

    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    return query.all()

