const getWrappedContent = (list) => list.map((value) => `'${value}'`).toString();

const executQueries = async (queryInterface, enumValues) => {
    await queryInterface.sequelize.query(
        'ALTER TYPE enum_invoices_type RENAME TO enum_invoices_type_old'
    );

    await queryInterface.sequelize.query(
        `CREATE TYPE enum_invoices_type AS ENUM(${getWrappedContent(enumValues)});`
    );

    await queryInterface.sequelize.query(
        `ALTER TABLE invoices ALTER COLUMN type TYPE 
        enum_invoices_type USING type::text::enum_invoices_type;`
    );

    await queryInterface.sequelize.query(
        'DROP TYPE enum_invoices_type_old;'
    );
};

module.exports = {
    async up(queryInterface) {
        await executQueries(queryInterface, ['sales', 'purchase', 'debit_note', 'credit_note']);
    },

    async down(queryInterface) {
        await executQueries(queryInterface, ['sales', 'purchase']);
    }
};
