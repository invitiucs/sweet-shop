from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"]
)

@router.post("/")
def create_order(
    total: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    order = Order(
        user_id=user.id,
        total=total
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return {"message": "Order placed successfully", "order_id": order.id}

@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Order).filter(Order.user_id == user.id).all()
