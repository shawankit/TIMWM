import { _get_ } from "../api";

const LedgerData = [
    {
        label : "Ledger Code",
        name: 'code',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Ledger Name",
        name: 'name',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Group",
        name: 'groupId',
        type: 'select',
        inputType: 'text',
        list: "groups",
        getData: async () => {
            const res = await _get_('groups')();
            return res.data.entity?.rows.map((group) => ({
                value: group.id,
                label: `${group.name}`
            }))
        }
    },
    {
        label : "Balance As On",
        name: 'balanceDate',
        type: 'input',
        inputType: 'date',
    },
    {
        label : "Balance",
        name: 'balance',
        type: 'input',
        inputType: 'number'
    },
];

export default LedgerData;