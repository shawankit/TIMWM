const InvoiceData = [
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
        inputType: 'date'
    },
    {
        label : "Customer Code",
        name: 'customerCode',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Customer Name",
        name: 'customerName',
        type: 'input',
        inputType: 'text'
    },
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
        label : "Taxable Amount",
        name: 'taxableAmount',
        inputType: 'number',
        list: "customerType"
    },
    {
        label : "Total Amount",
        name: 'totalValue',
        inputType: 'number',
        list: "customerType"
    }
];

export default InvoiceData;