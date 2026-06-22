//src/features/utils/dashboardHelpers.js 
export const calculateOccupancy = 
(
    occupied,
    total
) => {
    return (
        (occupied / total) * 100
    ).toFixed(2);
};
