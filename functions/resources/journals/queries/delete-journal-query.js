const { Journal } = require('models');

module.exports = class DeleteJournalQuery {
    constructor(itemId) {
        this.details = {
            itemId
        };
    }

    get() {
        return Journal.destroy({
            where: {
                id: this.details.itemId
            }
        });
    }
};
