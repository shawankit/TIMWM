const { Ledger } = require('models');

module.exports = class DeleteLedgerQuery {
    constructor(itemId) {
        this.details = {
            itemId
        };
    }

    get() {
        return Ledger.destroy({
            where: {
                id: this.details.itemId
            }
        });
    }
};
