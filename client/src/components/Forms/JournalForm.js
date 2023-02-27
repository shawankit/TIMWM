import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import swal from 'sweetalert';
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import { createApiFn, getApiFn, sweetalertValidate, uuid } from '../../util/util';
import EditTable from '../common/EditTable';
import { updateApiFn } from '../../util/util';
import moment from 'moment';
import JournalFormData from '../../data/JournalFormData';
import InputField from '../common/InputField';


const JournalForm = ({ data , callback, setEditData, page }) => {

    const initialData = { 
        dated: moment().format('YYYY-MM-DD'),
        description: '',
        ledgers : [] 
    };
    const [formData, setFormData] = useState(initialData);

    const [ledgers, setLedgers] = useState([]);
    const fetchLedgers = async () => {
        const response = await getApiFn('ledgers')('ledgers');
        setLedgers(response.data.entity?.rows.reduce((result, data) => ({ ...result, [data.id]: data }), {}));
      }


    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    useEffect(async () => {
        await fetchLedgers();
        console.log(data);
        setFormData({
            ...data,
            ledgers: data.journalLedgers.map((journalLedger) => ({
                id: uuid(),
                key: uuid(),
                ledgerId: journalLedger.ledger.id,
                name: journalLedger.ledger.name,
                dr: journalLedger.type === 'debit' ?  journalLedger.amount : '',
                cr: journalLedger.type === 'credit' ?  journalLedger.amount : '',
            }))
        });
    },[data])


    const onSubmit = async (close) => {
        const finalData = {
            dated: formData.dated,
            description: formData.description,
            jounalLedgers: formData.ledgers
        }

        finalData.jounalLedgers = finalData.jounalLedgers.filter((l) => l.ledgerId); 
        finalData.jounalLedgers = finalData.jounalLedgers.map((l) => ({
            type: l.dr ? 'debit' : 'credit',
            amount: l.dr ? l.dr  : (l.cr != '' ? l.cr : 0),
            ledgerId: l.ledgerId
        }));
        const sumData = finalData.jounalLedgers.reduce((result, l) => {
            if(l.type == 'debit'){
                result.sumDr += isNaN(parseFloat(l.amount)) ? 0 : parseFloat(l.amount);
            }
            if(l.type == 'credit'){
                result.sumCr += isNaN(parseFloat(l.amount)) ? 0 : parseFloat(l.amount);
            }
            return result;
        }, { sumDr: 0, sumCr: 0 });

        if(finalData.jounalLedgers.length == 0){
            sweetalertValidate('Please insert atleast one ledger');
            return;
        }
        if(formData.dated == ''){
            sweetalertValidate('Please select date');
            return;
        }

        if(sumData.sumCr !== sumData.sumDr){
            sweetalertValidate('Sum of Dr columm and Cr Column is not equal.');
            return;
        }
        if(data) {
            let response = await updateApiFn(page)(data.id, finalData);
            console.log(response);
            if(response?.data?.status == true){
                swal(`Succesfully updated ${page} details`, "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        else{
            let response = await createApiFn(page)(finalData);
            console.log(response);
            if(response?.data?.status == true){
                swal(`Succesfully added ${page} details`, "success");
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        reset();
        callback();
    }

    const reset = () => {
        setFormData(initialData);
        setEditData(null);
    }
    const columns = [
        {
            title: 'Ledger Name',
            dataIndex: 'name',
            width: '40%',
            editable: true
        },
        {
            title: 'Dr',
            dataIndex: 'dr',
            width: '30%',
            editable: true
        },
        {
            title: 'Cr',
            dataIndex: 'cr',
            width: '30%',
            editable: true
        },
    ];

    return (
        <>
            <div>
            <Row>
                { 
                        JournalFormData.map((field, i) => <InputField
                            label={field.label}
                            type={field.inputType} 
                            name={field.name}
                            onChange={onChange}
                            key={field.name}
                            value={formData ? formData[field.name] : ''}
                            lcol={i == 0 ? 2 : 3}
                            icol={i == 0 ? 4 : 15}
                        />
                        )
                    }      
                </Row>
                <Row>
                    <Col  span={24}>
                        <EditTable
                            columns={columns} 
                            setDataSource={(dataSource) => setFormData({ ...formData, ledgers : dataSource })}
                            dataSource={(formData && formData.ledgers) || []}
                            ledgers={ledgers}
                            notEditable={false}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='text-right'>
                        <Button onClick={() => reset()} className='mr-4' icon={ <RestOutlined />}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={() => onSubmit()} icon={ <PlusOutlined />} >
                            { data ? 'Edit' : 'Add' } 
                        </Button>
                    </Col>
                
                </Row>
            </div>
        </>
    );
};

export default JournalForm;
