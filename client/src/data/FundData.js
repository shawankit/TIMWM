const FundData = [
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
        label : "Total Collection",
        name: 'toatalCollection',
        inputType: 'number',
        list: "customerType"
    },
    {
        label : "Total Payment",
        name: 'toatlPayment',
        inputType: 'number',
        list: "customerType"
    },
    {
        label : "Fund Available",
        name: 'fundAvailable',
        inputType: 'number',
        list: "customerType"
    }
];

export default FundData;