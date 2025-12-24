#app/models/shift.py

from sqlalchemy import Column, Integer, Time, String
from app.database.base import Base

class Shift(Base):
    __tablename__ = 'shifts'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    break_duration = Column(Integer, nullable=False)  # in minutes
    total_hours = Column(Integer, nullable=False)  # in minutes
    overtime_hours = Column(Integer, nullable=True)  # in minutes
    night_shift_hours = Column(Integer, nullable=True)  # in minutes
    weekend_hours = Column(Integer, nullable=True)  # in minutes
    holiday_hours = Column(Integer, nullable=True)  # in minutes
    notes = Column(String, nullable=True)

    def __repr__(self):
        return f"<Shift(name={self.name}, start_time={self.start_time}, end_time={self.end_time})>"
    
    