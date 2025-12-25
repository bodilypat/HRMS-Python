#app/api/routes/employees.py

from fastapi import APIRouter, Depends, Query, status 
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse,
)
from app.services.employee_service import (
    create_employee,
    get_employee_by_id,
    list_employee,
    update_employee,
    delete_employee,
)
from app.middlewares.rbac import require_roles
from app.models.user import User 

router = APIRouter(prefix="/employees", tags=["Employees"])

#--------------------------------------------
# Create Employee(Admin, HR)
#--------------------------------------------
@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(["Admin", "HR"]))],
)
def create_employee_endpoint(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
) -> EmployeeResponse:
    return create_employee(db, employee)

#-------------------------------------------------------
# Get Employee by ID(Admin, HR, Manager, EMPLOYEE-self)
#-------------------------------------------------------
@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
    dependencies=[Depends(require_roles(["Admin", "HR", "Manager", "Employee"]))],
)
def get_employee_endpoint(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(),  # Assume current_user is injected here
) -> EmployeeResponse:
    employee = get_employee_by_id(db, employee_id)
    if current_user.role != "Admin" and current_user.role != "HR" and current_user.role != "Manager" and current_user.id != employee.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this employee")
    return employee

#--------------------------------------------
# Get All Employees(ADMIN, HR, MANAGER)
#--------------------------------------------
@router.get(
    "/",
    response_model=List[EmployeeResponse],
    dependencies=[Depends(require_roles(["Admin", "HR", "Manager"]))],
)
def list_employees_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1),
    db: Session = Depends(get_db),
) -> List[EmployeeResponse]:
    return list_employee(db, skip=skip, limit=limit)

#--------------------------------------------
# Update Employee (ADMIN, HR)
#--------------------------------------------
@router.put(
   "/{employee_id}",
   response_model=EmployeeResponse,
)
def update_employee_endpoint(
    employee_id: int,
    employee_update: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["Admin", "HR"]))
) -> EmployeeResponse:
    return update_employee(db, employee_id, employee_update)
    
#--------------------------------------------
# Delete Employee (ADMIN only)
#--------------------------------------------
@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles(["Admin"]))],
)
def delete_employee_endpoint(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("ADMIN"))
) -> None:
    delete_employee(db, employee_id)
   
   