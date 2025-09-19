#app/services/payroll/payroll_service.py 

from sqlalchemy.orm import Session
from typing import List, Optional

from models.payroll.payroll import Payroll 
from schemas.payroll.payroll import PayrollCreate, PayrollUpdate 

def get_all_payrolls(db: Session, skip: int = 0, limit: int = 10) -> List[Payroll]:
    return db.query(Payroll).offset(skip).all()

def get_payroll_by_id(db: Session, payroll_id: int) -> Optional[Payroll]:
    return db.get(Payroll, payroll_id)

def create_payroll(db: Session, payroll_data: PayrollCreate ) -> Payroll:
    new_payroll = Payroll(**payroll_data.dict)
    db.add(new_payroll)
    db.commit()
    db.refresh(new_payroll)
    return new_payroll

def update_payroll(db: Session, payroll_id: int, updated_payroll: PayrollUpdate) -> Payroll:
    payroll = db.get(Payroll, payroll_id)
    if not payroll:
        return None 
    for key, value in updated_payroll.dict(exclude_unset=True).items():
        setattr(payroll, key, value)
    db.commit()
    db.refresh(payroll)
    return payroll 

def delete_payroll(db: Session, payroll_id: int) -> bool:
    payroll = db.get(Payroll, payroll_id)
    if not payroll:
        return False 
    db.delete()
    db.commit()
    return True 



