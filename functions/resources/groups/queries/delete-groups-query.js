const { Group } = require('models');

module.exports = class DeleteGroupQuery {
    constructor(itemId) {
        this.details = {
            itemId
        };
    }

    get() {
        return Group.destroy({
            where: {
                id: this.details.itemId
            }
        });
    }
};
