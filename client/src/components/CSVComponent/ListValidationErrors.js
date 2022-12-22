import { Table } from 'antd';
import { useEffect } from 'react';

const ListValidationErrors = ({
    tableData, invalidHeader, setHasErrors, setRecord, record
}) => {

    const columns = [
    {
        title:  'ROW INDEX',
        dataIndex: "index",
        key: "index",
        width: '150px',
        render: (index) => (
            <div className='flex flex-col' key={index + 2}>
                <label className='font-semibold' key={index + 2}>{index + 2}</label>
            </div>
        ),
    },
    {
        title:  'REASON',
        dataIndex: "reason",
        key: "reason",
        render: (reason, data) => {
            const convertToUl = (reason).map((item, idx) => <li key={idx}>{item}</li>);

            return (
                <ul key={data.index + 2} >{convertToUl}</ul>
            );
        }
    }];
    const processReason = () => {
        let count = 0;
        setRecord(count);
        tableData.map((item) => {
            if (item.reason.length) { count += 1; }
        });
        setRecord(count);
        if ((!count) && !invalidHeader.length) setHasErrors(false);
    };

    useEffect(() => {
        processReason();
    }, [record]);

    return (
        <div >
            <div className='flex-col pb-5'>
                <label className="font text-md">The following data is invalid. Please correct them and upload again.</label>
                <ul className='pl-2 text-red-800' >
                    {invalidHeader.length ? invalidHeader.map((item, idx) => <li key={idx}>Invalid Header : {item.invalidColumn}</li>) : ''}
                </ul>
                <label className="font text-md">Correct the errors and upload again.</label>

            </div>
            <Table
                dataSource={tableData}
                columns={columns}
                bordered
                pagination={ {}}
            />

        </div>
    );
};

export default ListValidationErrors;
