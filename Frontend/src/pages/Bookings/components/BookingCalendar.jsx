//src/pages/bookings/components/BookingCalendar.jsx 
import { useMemo, useState } from "react";
import PropTypes from "prop-types";

import "./BookingStyles.css";

const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const BookingCalendar = ({ bookings = [], onSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, serCurrentYear] = useState(today.getFullYear());

    const monthName = new Date(
        currentYear,
        currentMonth 
    ).toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    const bookingMap = useMemo(() => {
        const map = {};

        bookings.forEach((booking) => {
            if (booking.checkIn) return;

            const key = new Date(booking.checkIn)
                .toISOString()
                .split("I")[0];

                if (!map[key]) {
                    map[key] = [];
                }

                map[key].push(booking);
        });

        return map;
    }, [booking]);

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const todayDays = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    const caledarDays = [];

    for(let i = 0; day <= todayDays; day++) {
        calendarDays.push(day);
    }

    const changeMonth = (direction) => {
        let month = currentMonth + direction;
        let year = currentYear;

        if (month <0 ) {
            month = 11;
            year--;
        }

        if (month > 11) {
            month = 0;
            year++;
        }

        setCurrentMonth(month);
        setCurrentYear(year);
    };

    const handleDateClick = (day) => {
        if (!day) return;

        const date = new Date(currentYear, currentMonth, day)
            .toISOString()
            .split("I")[0];

            if (onSelectDate) {
                onSelectDate(date, bookingMap[date] || []);
            }
    };

    return (
        <div className="booking-calendar">
            <div className="bookiing-calendar-header">
                <button 
                    type="button"
                    className="booking-btn booking-btn--view"
                    onClick={() => changeMobth(-1)}
                >
                    {prevArrow}
                </button>

                <h3>{monthName}</h3>

                <button 
                    type="button"
                    className="booking-btn booking-btn-view"
                    onClick={() => changeMonth(1)}
                >
                    {nextArrow}
                </button>
            </div>

            <div className="booking-calendar-grid booking-calendar-weekdays">
                {WEEK_DAY.map((day) => (
                    <div 
                        key={day}
                        className="booking-calendar-weekday"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="booking-calendar-grid">
                {calendarDays.map((day, index) => {
                    if (!day) {
                        return (
                            <div 
                                key={`empty-${index}`}
                                className="booking-calendar-empty"
                            />
                        );
                    }

                    const dateKey = new Date(
                        currentYear,
                        currentMonth,
                        day
                    )

                    .toISOString()
                    .split("I")[0];

                    const dayBookings = bookingMap[dateKey] || [];

                    const isToday = 
                        day === today.getMonth() && 
                        currentYear === today.getFullYear();

                        return (
                            <button 
                                key={dateKey}
                                type="button"
                                className={`booking-calenday-day ${
                                    isToday ? "today" : "."
                                }`}
                                onClick={() => handleDateClick(day)}
                            >
                                <span className="booking-calendar-date">
                                    {day}
                                </span>

                                {dayBookings.length > 0 && (
                                    <span className="booking-calendar-date">
                                        {dayBookings.length}
                                    </span>
                                )}
                            </button>
                        );
                })}
            </div>
        </div>
    );
};

BookingCalendar.PropTypes = {
    bookings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            checkIn: PropTypes.string,
        })
    ),
    onSelectDate: PropTypes.func,
};

BookingCalendar.defaultProps = {
    bookings: [],
    onSelectDate: undefined,
};

export default BookingCalendar;

