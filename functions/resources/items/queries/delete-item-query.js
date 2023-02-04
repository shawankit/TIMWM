const { Item } = require('models');

module.exports = class DeleteItemQuery {
    constructor(itemId) {
        this.details = {
            itemId
        };
    }

    get() {
        return Item.destroy({
            where: {
                id: this.details.itemId
            }
        });
    }
};
