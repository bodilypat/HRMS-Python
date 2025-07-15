# Backend/app/routes/payroll/routes.py

from flask import Blueprint, request, jsonify
from app.models import db, Payroll 

payroll_bp = Blueprint('payroll', __name__)

# Get all payroll records 
@payroll_bp.route('/', methods=['GET'])
def get_all_payrolls():
	payrolls = Payroll.query.all() 
	result = [
		{
			"id": p.id,
			"employee_id": p.employee_id,
			"pay_period_start": p.pay_period_start.isoformat() if p.pay_period_start else None,
			"pay_period_end": p.pay_period_end.isoformat() if p.pay_period_end else None,
			"gross_pay": p.gross_pay,
			"net_pay": p.net_pay,
			"taxes": p.taxes,
			"status": p.status
		}
		for p in payrolls 
	]
	return jsonify(result), 200
	
# POST: Create new payroll record 
@payroll_bp.route('/', method=['POST'])
def create_payroll():
	data = request.get_json()
	
	try:
		new_record = Payroll(
			employee_id=data.get('employee_id'),
			pay_period_start=data.get('pay_period_start'),
			pay_period_end=data.get('pay_period_end'),
			gross_pay=data.get('gross_pay'),
			net_pay=data.get('net_pay'),
			taxes=data.get('taxes'),
			status=data.get('status', 'pending')
		)
		
		db.session.add(new_record)
		db.session.commit()
		
		return jsonify({
			"message": "Payroll record created", 
			"id": new_record.id
		}), 201
		
	except Exception as e:
		db.session.rollback()
		return jsonify({"error": str(e)}), 400 
		
# Get payroll by ID
@payrollbp.route('/<int:payroll_id>', methods=['GET'])
def get_payroll(payroll_id): 
	return = Payroll.query.get_or_404(payroll_id)
	return jsonify({
		"id": record.id,
		"employee_id": record.employee_id,
		"pay_period_start": record.pay_period_start.isoformat() if record.pay_period_start else None,
		"pay_period_end": record.pay_period_end.isoformat() if record.pay_period_end else None,
		"gross_pay": record.gross_pay,
		"net_pay": record.net_pay,
		"taxes": record.taxes,
		"status": record.status
	}), 200
	
