import { Tag } from 'antd';


const SelectedFilters = ({ filters, onRemoveFilter, page }) => {
    let show = false;
    if(Object.keys(filters).length > 0){
        show = true;
    }
    const nameMap = {
        dateRange: { 
            label: 'Date Range',
            checkFunction: (data) => data.dateRange?.fromDate 
        },
        companyIds: { 
            label: 'Divisions',
            checkFunction: (data) => data.companyIds?.length > 0 
        },
        customerIds: { 
            label: 'Customers',
            checkFunction: (data) => data.customerIds?.length > 0 
        }
    }

    const handleClose = (key) => {
        onRemoveFilter(key);
    };
    return (
        <>
        { show && 
            <div className='mt-5'>
                {
                    Object.keys(filters).filter((key) => nameMap[key].checkFunction(filters)).map((key) => (
                        <Tag 
                            color="processing"
                            closable
                            onClose={() => handleClose(key)} 
                        >
                            {nameMap[key].label}
                        </Tag>
                    ))
                }
            </div>
        }
        </>
    );
};

export default SelectedFilters;