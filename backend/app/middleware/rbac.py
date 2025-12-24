#app/middleware/rbac.py

from typing import Iterable
from fastapi import Depends, HTTPException, status

from app.middleware.auth import get_current_user
from app.models.user import User

#-----------------------------------------------
# Role hierarchy (Optional)
#-----------------------------------------------
ROLE_HIERARCHY = {
    "ADMIN": {"ADMIN", "MANAGER", "HR", "EMPLOYEE"},
    "HR": {"HR","MANAGER","EMPLOYEE"},
    "MANAGER": {"MANAGER","EMPLOYEE"},
    "EMPLOYEE": {"EMPLOYEE"},
}

#-----------------------------------------------
# Require role(s)
#-----------------------------------------------
def require_roles(*allowed_roles: str):
    allowed_roles = set(allowed_roles)

    def role_checker(user: User = Depends(get_current_user)) -> User:
        user_roles = user.role
        
        if not user_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User role not assigned.",
            )
        
        # Supper admin override
        if user_role == "ADMIN":
            return user
        
        # Check role hierarchy
        for role in allowed_roles:
            if role in ROLE_HIERARCHY.get(user_role, {}):
                return user
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient role privileges.",
        )
    return role_checker


        