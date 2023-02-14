const { JournalLedger } = require('models');

module.exports = class DeleteJournalLedgersQuery {
    constructor(ids) {
        this.details = { ids };
    }

    get() {
        return JournalLedger.destroy({
            where: {
                id: this.details.ids
            }
        });
    }
};
