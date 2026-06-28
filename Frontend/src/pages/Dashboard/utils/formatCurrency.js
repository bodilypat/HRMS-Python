/* -------------------------------------------
** src/pages/Dashboard/utils/formatCurrency.js
** @param {number} amount
** @param {string} locale 
** @param {string} currency 
** @return {string}
---------------------------------------------- */ 
export function formatCurrency(
    amount = 0,
    locale = "en-US",
    currency = "USD"
) {
    const value = Number(amount);

    if (Number.isNaN(value)) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
        }).format(0);
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(value);
}

export default formatCurrency;
