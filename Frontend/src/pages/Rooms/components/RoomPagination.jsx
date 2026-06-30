//src/pages/Rooms/components/RoomPagination.jsx
import React from "react";
import "./RoomStyles.css";

const RoomPagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPages = () => {
        const pages = [];

        for (let page =  1; page <= totalPages; page++) {
            pages.push(
                <button
                    key={page}
                    className={`pagination-btn ${
                    currentPage === page ? "active" : ""
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="room-pagination">
            <button 
                className="pagination-btn"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <div className="pagination-pages">
                {renderPages()}
            </div>

            <button 
                className="pagination=btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default RoomPagination;

