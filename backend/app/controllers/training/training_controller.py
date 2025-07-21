# backend/app/controllers/training/training_controller.py

from app.models import db, TrainingRecord
from app.controllers.base_controller import BaseController
from sqlalchemy.exc import SQLAlchemyError


class TrainingController(BaseController):
    """
    Handles business logic for managing employee training records.
    """

    def get_all_training_records(self):
        records = TrainingRecord.query.all()
        result = [
            {
                "id": record.training_id,
                "employee_id": record.employee_id,
                "course_id": record.course_id,
                "training_name": record.training_name,
                "start_date": record.start_date.isoformat() if record.start_date else None,
                "end_date": record.end_date.isoformat() if record.end_date else None,
                "status": record.status,
                "score": float(record.score or 0),
                "certificate": record.certificate,
                "remarks": record.remarks
            }
            for record in records
        ]
        return self.success_response(result)

    def get_training_record_by_id(self, training_id):
        record = TrainingRecord.query.get(training_id)
        if not record:
            return self.error_response("Training record not found", 404)

        return self.success_response({
            "id": record.training_id,
            "employee_id": record.employee_id,
            "course_id": record.course_id,
            "training_name": record.training_name,
            "start_date": record.start_date.isoformat() if record.start_date else None,
            "end_date": record.end_date.isoformat() if record.end_date else None,
            "status": record.status,
            "score": float(record.score or 0),
            "certificate": record.certificate,
            "remarks": record.remarks
        })

    def create_training_record(self, data):
        required_fields = ["employee_id", "course_id", "training_name", "start_date", "end_date", "status"]
        if not all(data.get(field) for field in required_fields):
            return self.error_response("Missing required training fields", 400)

        new_record = TrainingRecord(
            employee_id=data["employee_id"],
            course_id=data["course_id"],
            training_name=data["training_name"],
            start_date=data["start_date"],
            end_date=data["end_date"],
            status=data["status"],
            score=data.get("score"),
            certificate=data.get("certificate"),
            remarks=data.get("remarks")
        )

        try:
            db.session.add(new_record)
            db.session.commit()
            return self.success_response(
                {"id": new_record.training_id},
                message="Training record created",
                status_code=201
            )
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response(f"Database error: {str(e)}", 500)

    def update_training_record(self, training_id, data):
        record = TrainingRecord.query.get(training_id)
        if not record:
            return self.error_response("Training record not found", 404)

        for field in [
            "training_name", "start_date", "end_date",
            "status", "score", "certificate", "remarks", "course_id", "employee_id"
        ]:
            if field in data:
                setattr(record, field, data[field])

        try:
            db.session.commit()
            return self.success_response(message="Training record updated")
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response(f"Database error: {str(e)}", 500)

    def delete_training_record(self, training_id):
        record = TrainingRecord.query.get(training_id)
        if not record:
            return self.error_response("Training record not found", 404)

        try:
            db.session.delete(record)
            db.session.commit()
            return self.success_response(message="Training record deleted")
        except SQLAlchemyError as e:
            db.session.rollback()
            return self.error_response(f"Database error: {str(e)}", 500)
