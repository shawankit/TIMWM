import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import InputField from '../common/InputField';
import { createCustomer, getCompanies, updateCustomer } from '../../api'; 
import swal from 'sweetalert';
import SelectField from '../common/SelectField';
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import { createApiFn, getFieldData } from '../../util/util';


const CustomerForm = ({ data , callback, setEditData, page }) => {

    const FieldData = getFieldData(page);
    const initialData = FieldData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    const [formData, setFormData] = useState(initialData);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSelectChange = (name, value) => {
        setFormData({...formData,[name]: value});
    }

    const selectFieldList = FieldData.filter((field) => field.type == 'select');
    const initialMasterData = selectFieldList.reduce((previous, field) => ({...previous,[field.list]: []}),{});
    const [masterData, setMasterData] = useState(initialMasterData);

    const fetchCompanies = async () => {
        const res = await getCompanies();
        setDivisions(
          res.data.entity?.rows.map((company) => ({
            value: company.id,
            label: `${company.division} - ${company.name}`
          }))
        )
      }

    useEffect(async () => {
        
        const newMasterData = {};
        for (let index = 0; index < selectFieldList.length; index++) {
            const field = selectFieldList[index];
            newMasterData[field.list] = await field.getData();;
        }

        setMasterData({ ...masterData, ...newMasterData });
        setFormData(data);
    },[data])


    const onSubmit = async (close) => {
        const finalData = {
            ...formData,
            type: page
        }

        console.log('finalData', finalData);
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
                swal("Succesfully added customer details", "success");
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

    return (
        <>
            <div>
                <Row>
                    { 
                        FieldData.map((field) => field.type == 'input' ?
                            <InputField
                                label={page === 'vendor'? field.label.replace('Customer', 'Vendor') : field.label}
                                type={field.inputType} 
                                name={field.name}
                                onChange={onChange}
                                key={field.name}
                                value={formData ? formData[field.name] : ''}
                            /> : 
                            <SelectField
                                label={field.label}
                                option={eval(masterData[field.list])?.map((item) => ({ value: item.value, text: item.label}))}
                                showSearch
                                optionFilterProp="children"
                                value={formData ? formData[field.name] : ''}
                                showArrow={false}
                                onChange={(value) => onSelectChange(field.name, value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                key={field.name}
                            />
                        )
                    }     
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

export default CustomerForm;
