# Backend/app/controllers/payroll/payroll_controller.py

from app.models import db, Payroll
from app.controllers.base_controller import BaseController 
from sqlalchemy.exc import SQLAlchemyError

class PayrollController(BaseController):
	"""
		Handles business logic for manging payroll records.
	"""
	
	def get_all_payrolls(self):
		payrolls=Payroll.query.all()
		result = [
			{
				"id": p.payroll_id,
				"employee_id": p.employee_id,
				"pay_period": p.pay_period.isoformat() if p.pay_period else None,
				"base_salary": float(p.base_salary),
				"deductions": float(p.deductions or 0),
				"bonuses": float(p.bonuses or 0)
				"net_pay": float(p.net_pay)
			}
			for p in payrolls 
		]
		return self.success_reponse(result)
		
	def get_payroll_by_id(self, payroll_id):
		payroll=Payroll.query.get(payroll_id)
		if not payroll:
			return self.error_response("Payroll record not found", 404)
			
		return self.success_reponse({
			"id": payroll.payroll_id,
			"employee_id": payroll.employee_id,
			"pay_period": payroll.pay_period.isoformat() if payroll.pay_period else None,
			"base_salary": float(payroll.base_salary),
			"deductions": float(payroll.deductions or 0)
            "bonuses": float(payroll.bonuses or 0)
            "net_paty": float(payroll.net_pay)
        })
        
    def create_payroll(self, data):
        required_fields=["employee_id", "pay_period", "base_salary"]
        if not all(data.get(field) for field in required_fields):
            return self.error_response("Missing required payroll fields", 400)
            
            base_salary=float(data["base_salary"]
            deductions=float(data.get("deductions", 0))
            bonuses=float(data.get("bunuses", 0))
            net_pay=base_salary - deductions + bonuses
            
            new_payroll=Payroll(
                employee_id=data["employee_id"],
                pay_period=data["pay_period"],
                base_salary=base_salary,
                deductions=deductions,
                bonuses=bonuses,
                net_pay=net_pay
            )
            
            try:
                db.session.add(new_payroll)
                db.session.commit()
                return self.success_reponse(
                    {"id": new_payroll.payroll_id},
                    message="Payroll record created",
                    status_code=201
                )
            except SQLAlchemyError as e:
                db.session.rollback()
                return self.error_response("Database error: " + str(e), 500)
                
    def update_payroll(self, payroll_id, data):
        payroll = Payroll.query.get(payroll_id)
        if not payroll:
            return self.error_response("Payroll record not found", 404)
            
            for field in["employee_id", "pay_period", "base_salary", "deductions", "bonuses"]:
                if field in data:
                   setattr(payroll, field, data[field])
            
            # Recalculate net pay_period
            payroll.net_pay = float(payroll.base_salry) - float(payroll.deductions or 0) + float(payroll.bonuses or 0)
            
            try:
                db.session.commit()
                return self.success_response(message="Payroll record updated")
                
            except SQLAlchemyError as e:
                db.session.rollback()
                return self.error_response("Database error: " + str(e), 500)
                
    def delete_payroll(self, payroll_id):
        payroll = Payroll.query.get(payroll_id)
        if not payroll:
            return self.error_response("Payroll record found", 404)
            
        try:
            db.session.delete(payroll)
            db.session.commit()
            return self.success_response("Payroll record deleted")
        
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response("Database error: " + str(e), 500)
            
              