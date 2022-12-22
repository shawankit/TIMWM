const InvoiceData = [
    {
        label : "Company",
        name: 'companyName',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Division",
        name: 'division',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Customer Code",
        name: 'customerCode',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Customer",
        name: 'customerName',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Invoice No.",
        name: 'invoiceNumber',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Invoice Date",
        name: 'invoiceDate',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Taxable Amount",
        name: 'taxableAmount',
        inputType: 'text',
        list: "customerType"
    },
    {
        label : "Total Amount",
        name: 'totalValue',
        inputType: 'text',
        list: "customerType"
    }
];

export default InvoiceData;