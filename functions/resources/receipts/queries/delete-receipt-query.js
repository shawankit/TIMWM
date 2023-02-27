const { Receipt } = require('models');

module.exports = class DeleteReceiptQuery {
    constructor(itemId) {
        this.details = {
            itemId
        };
    }

    get() {
        return Receipt.destroy({
            where: {
                id: this.details.itemId
            }
        });
    }
};
