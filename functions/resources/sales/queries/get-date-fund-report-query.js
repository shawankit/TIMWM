const { sequelize } = require('models');

module.exports = class GetDateFundsReportQuery {
    constructor(date = '2022-11-30') {
        this.details = { date };
    }

    async get() {
        const [result, metadata] = await sequelize.query(
            `SELECT funds.company_id, name, division, type, total_amount_for_date
            FROM companies as c INNER JOIN 
            (
                SELECT company_id, type, SUM(amount) AS total_amount_for_date
                FROM receipts
                WHERE receipt_date::date = :date AND type = 'receipts'
                GROUP BY company_id, type
                UNION ALL
                SELECT company_id, type, SUM(amount) AS total_amount_for_date
                FROM receipts
                WHERE receipt_date::date = :date AND type = 'payments'
                GROUP BY company_id, type
            ) as funds ON c.id = funds.company_id;`, {
            replacements: {
                date: this.details.date,
            }
        });

        return result;
    }
};
