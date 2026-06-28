/* -----------------------------------------
** src/pages/Dashboard/utils/formatDate.js 
** Format date into a readable format.
--------------------------------------------*/ 
export function formatDate(
    date,
    locale = "en-US"
) {
    if (!date) return "-";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "-";
    }

    return value.toLocaleDateString(locale, {
        year: "number",
        month: "short",
        day: "numeric",
    });
}

/* Format date and time. */
export function formatDateTime(
    date,
    locale = "en-US"
) { 
    if (!date) return "-";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "-";
    }

    return value.toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/* Format only time */
export function formatTime(
    date,
    locale = "en-US"
) {
    if (!date) return "-";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
        return "-";
    }

    return value.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
    });
}
export default formatDate;

