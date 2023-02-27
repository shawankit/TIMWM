import { getAllInvoices, getCompanies, getCustomers } from "../api";

const ReceiptFormData = [
    {
        label : "Date",
        name: 'receiptDate',
        type: 'input',
        inputType: 'date'
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
                label: `${company.division} (${company.name})`
            }))
        },
        filterDependentMaster: [
            'customers',
            async (page, value) => {
                const filter = { companyIds : [value] }
                const res = await getCustomers(page === 'receipts' ? 'customer' : 'vendor', '', 0, undefined, JSON.stringify(filter));
                console.log(res);
                return res.data.entity?.rows.map((customer) => ({
                    value: customer.id,
                    label: `${customer.name} (${customer.code})`,
                    companyId: customer.companyId
                }))
            },
            'customerId'
        ],
    },
    {
        label : "Customer",
        name: 'customerId',
        type: 'select',
        inputType: 'text',
        list: 'customers',
        getData: async (page, search = '') => {
            const res = await getCustomers(page === 'receipts' ? 'customer' : 'vendor', search, 0);
            return res.data.entity?.rows.map((customer) => ({
                value: customer.id,
                label: `${customer.name} (${customer.code})`,
                companyId: customer.companyId
            }))
        },
        filterDependentMaster: [
            'invoices',
            async (page, value) => {
                const filter = { customerIds : [value] }
                const res = await getAllInvoices(page === 'receipts' ? 'sales' : 'purchase', '', 0, undefined, JSON.stringify(filter));
                console.log(res);
                return res.data.entity?.rows.map((invoice) => ({
                    value: invoice.id,
                    label: invoice.invoiceNumber,
                    companyId: invoice.companyId,
                    customerId: invoice.customerId
                }))
            },
            'invoiceId'
        ],
        populateParentMaster: (masterData, value) => {
            const data = masterData.customers.find((cust) => cust.value === value);
            return {
                companyId: data?.companyId
            }
        }
    },
    {
        label : "Nature",
        name: 'nature',
        type: 'select',
        inputType: 'text',
        list: "natures",
        getData: async () => {
            return ['advance', 'adjust'].map((nature) => ({
                value: nature,
                label: nature[0].toUpperCase() + nature.slice(1)
            }))
        },
        populateParentMaster: (masterData, value) => {
            if(value === 'advance')
            return { invoiceId: '' };
            else return {};
        }
    },
    {
        label : "Invoice Number",
        name: 'invoiceId',
        type: 'select',
        inputType: 'text',
        list: "invoices",
        getData: async (page, search = '') => {
            const res = await getAllInvoices(page === 'receipts' ? 'sales' : 'purchase', search, 0);
            return res.data.entity?.rows.map((invoice) => ({
                value: invoice.id,
                label: invoice.invoiceNumber,
                companyId: invoice.companyId,
                customerId: invoice.customerId
            }))
        },
        populateParentMaster: (masterData, value) => {
            const data = masterData.invoices.find((invoice) => invoice.value === value);
            return {
                companyId: data?.companyId,
                customerId: data?.customerId
            }
        }
    },
    {
        label : "Amount",
        name: 'amount',
        type: 'input',
        inputType: 'number',
    },
    {
        label : "VIA",
        name: 'via',
        type: 'input',
        inputType: 'text',
    }
];

export default ReceiptFormData;