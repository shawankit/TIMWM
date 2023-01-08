const { Transaction } = require('models');

module.exports = class DeleteTransactionsQuery {
    constructor(ids) {
        this.details = { ids };
    }

    get() {
        return Transaction.destroy({
            where: {
                id: this.details.ids
            }
        });
    }
};
