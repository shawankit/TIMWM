const { sequelize } = require('models');

module.exports = class GetSalesReportQuery {
    constructor(type) {
        this.details = {type};
    }

    async get() {
        const [result, metadata] = await sequelize.query(
            `SELECT c.name, c.division, EXTRACT(YEAR FROM i.invoice_date) as year, EXTRACT(MONTH FROM i.invoice_date) as month, SUM(i.taxable_amount) as taxable_amount
            FROM invoices i
            JOIN companies c ON i.company_id = c.id where i.type = :type
            GROUP BY c.name, c.division, EXTRACT(YEAR FROM i.invoice_date), EXTRACT(MONTH FROM i.invoice_date)`, {
            replacements: {
                type: this.details.type
            }
        });

        return result;
    }
};
