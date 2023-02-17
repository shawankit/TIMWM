import { getCompanies } from "../api";

const CustomerData = [
    {
        label : "Customer Code",
        name: 'code',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Customer Name",
        name: 'name',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Mobile",
        name: 'mobile',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Division",
        name: 'companyId',
        type: 'select',
        inputType: 'text',
        list: "divisions",
        getData: async () => {
            const res = await getCompanies();
            console.log(res);
            return res.data.entity?.rows.map((company) => ({
                value: company.id,
                label: `${company.division} - ${company.name}`
            }))
        }
    },
    {
        label : "GST Number",
        name: 'gstNumber',
        type: 'input',
        inputType: 'text',
    }
];

export default CustomerData;