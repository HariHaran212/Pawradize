import React from 'react';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    // Don't render anything if there's only one page or no pages
    if (totalPages <= 1) {
        return null;
    }

    const handlePrevious = () => {
        onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-text-medium">
                Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm bg-white border border-accent rounded-lg font-semibold hover:bg-ivory disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm bg-white border border-accent rounded-lg font-semibold hover:bg-ivory disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;