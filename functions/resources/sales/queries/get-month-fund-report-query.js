const { sequelize } = require('models');

module.exports = class GetMonthFundsReportQuery {
    constructor(month = '11', year = '2022') {
        this.details = { month, year };
    }

    async get() {
        const [result, metadata] = await sequelize.query(
            `SELECT funds.company_id, name, division, type, total_amount_for_month_and_year
            FROM companies as c INNER JOIN 
            (
                SELECT company_id, type, SUM(amount) AS total_amount_for_month_and_year
                FROM receipts
                WHERE EXTRACT(MONTH FROM receipt_date) = :month AND EXTRACT(YEAR FROM receipt_date) = :year AND type = 'receipts'
                GROUP BY company_id, type
                UNION ALL
                SELECT company_id, type, SUM(amount) AS total_amount_for_month_and_year
                FROM receipts
                WHERE EXTRACT(MONTH FROM receipt_date) = :month AND EXTRACT(YEAR FROM receipt_date) = :year AND type = 'payments'
                GROUP BY company_id, type
            ) as funds ON c.id = funds.company_id;`, {
            replacements: {
                month: this.details.month,
                year: this.details.year
            }
        });

        return result;
    }
};
