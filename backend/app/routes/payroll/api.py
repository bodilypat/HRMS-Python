# Backend/app/routes/payroll/api.py 

from flask import Blueprint, request, jsonify
from app.models.payroll.payroll import Payroll
from app.models import db
from datetime import datetime

payroll_bp = Blueprint('payroll', __name__)

# GET: Retrieve all payroll records

@payroll_bp.route('/', methods=['GET'])
	def get_all_payroll():
		payrolls = Payroll.query.all()
		result = [
            {
                "id": p.payroll_id,
                "pay_period": p.pay_period.isoformart() if p.pay.period else None,
                "base_salary": float(p.base_salary),
                "deductions": float(p.deductions),
                "bonuses": float(p.bonuses),
                "net_pay": float(p.net_pay)
            }
            for p in payrolls
       ]
       return jsonify(result), 200

# POST: Create a new payroll record 
@payroll_bp.route('/', methods=['POST'])
    def create_payroll():
        data = request.get_json()
        try:
            new_record = Payroll(
                employee_id=data.get('employee_id'),
                pay_period=datetime.fromisoformat(data.get('pay_period')),
                base_salary=data.get('base_salary'),
                deductions=data.get('deductions', 0.0),
                bonuses=data.get('bonuses', 0.0),
                net_pay=data.get('net_pay')
           )
           
           db.session.add(new_record)
           db.session.commit()
           
           return jsonify({
                "message": "Payroll record created",
                "id": new_record.payroll_id
            }), 201
       except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

# GET: Retrieve payroll by ID
@payroll_bp.route('/<int:payroll_id>', methods=['GET'])
    def get_payroll(payroll_id):
        record = Payroll.query.get_or_404(payroll_id)
        return jsonify({
            "id": record.payroll_id,
            "employee_id": record.employee_id,
            "pay_period": record.pay_period.isoformart() if record.pay_period else None,
            "base_salary": float(record.base_salary),
            "deduction": float(record.deductions),
            "bonuses": float(record.bonuses),
            "net_pay": float(record.net_pay)
       }), 200
       

#PUT: Update payroll record by ID
@payroll_bp.route('/<int:payroll_id', methods=['PUT'])
def update_payroll(payroll_id):
    record = Payroll.query.get_or_404(payroll_id)
    data = request.get_json()
    
    try: 
        for key, value in data.items():
            if hasattr(record, key):
                # Convert date string to datetime for pay_period 
                if key == 'pay_period' and isinstance(value, str):
                    value = datetime.fromisoformat(value)
                setattr(record, key, value)
                
        db.session.commit()
        return jsonify({"message": "Payroll record updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
# DELETE: Remove a payroll record by ID
@payroll_bp.route('/int:payroll_id>', methods=['DELETE'])
def delete_payroll(peyroll_id):
    record = Payroll.query.get_or_404(payroll_id)
    
    try:
        db.session.delete(record)
        db.session.commit()
        return jsonify({"message": "Payroll record deleted"}), 200 
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
        
        