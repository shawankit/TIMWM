const ReceiptData = [
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
        label : "Receipt Date",
        name: 'receiptDate',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Nature",
        name: 'nature',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Receipt VIA",
        name: 'via',
        inputType: 'text',
        list: "customerType"
    },
    {
        label : "Invoice No.",
        name: 'invoiceNumber',
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
        label : "Amount",
        name: 'amount',
        inputType: 'number',
        list: "customerType"
    },
];

export default ReceiptData;