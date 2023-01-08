const InvoiceFormData = [
    {
        label : "Invoice Number",
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
        label : "Customer",
        name: 'customerId',
        type: 'select',
        inputType: 'text',
        list: "customers"
    },
    {
        label : "Division - Company",
        name: 'companyId',
        type: 'select',
        inputType: 'text',
        list: "divisions"
    }
];

export default InvoiceFormData;