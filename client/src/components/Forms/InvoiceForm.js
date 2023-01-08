import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography, Result } from 'antd';
import InputField from '../common/InputField';
import { createInvoice, getAllMilkCategories, getCompanies, getCustomers, getItems, updateInvoice } from '../../api'; 
import swal from 'sweetalert';
import SelectField from '../common/SelectField';
import { EditOutlined, PlusOutlined, RestOutlined } from '@ant-design/icons';
import EditableTable from '../common/EditableTable';
import moment from 'moment';
import { sweetalertValidate } from '../../util/util';
import InvoiceFormData from '../../data/InvoiceFormData';


const InvoiceForm = ({ data , callback, setEditData, page}) => {
    const initialData = InvoiceFormData.reduce((previous, field) => ({...previous,[field.name]: ''}),{});
    

    const [formData, setFormData] = useState({
        ...initialData,
        invoiceDate: moment().format('YYYY-MM-DD'),
        transactions: [],
        labourCharges: 0,
        claimAmount: 0,
        taxableAmount: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
        roundOff: 0,
        tcs: 0,
        totalValue: 0
    });

    const [customers, setCustomers] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [items, setItems] = useState({});

    const fetchData = async () => {
        const customerType = page == 'sales' || page == 'receipts' ? 'customer' : 'vendor';
        const res = await getCustomers(customerType);
        // console.log('getCustomers', res);
        setCustomers(
            res.data.entity?.rows.map((customer) => ({
                value: customer.id,
                label: `${customer.code} - ${customer.name}`,
                companyId: customer.companyId
            }))
        );

        const resC = await getCompanies();
        // console.log('getCompanies', res);
        setDivisions(
            resC.data.entity?.rows.map((company) => ({
            value: company.id,
            label: `${company.division} - ${company.name}`
          }))
        )

        const response = await getItems();
        // console.log('getItems', response);
        setItems(response.data.entity?.rows.reduce((result, data) => ({ ...result, [data.id]: data }), {}));
    }

    useEffect(async () => {
        await fetchData();
        // console.log('data', data);
        if(data){
            const transactions =  data.transactions.map((element, index) => {
                const total  = element.rate * element.quantity;
                return ({
                    id: element.id,
                    key: index,
                    itemId: element.item.id,
                    itemCode: element.item.code,
                    categoryName: element.item.name,
                    rate: element.rate,
                    quantity: element.quantity,
                    total
                })
            });
    
            setFormData({ ...data, invoiceDate: moment(data.invoiceDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), transactions});
        }
       
    }, [data]);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const onSelectChange = (name, value) => {
        // console.log('cust', value);
        if(name == 'customerId'){
            const found = customers.find((c) => c.value == value);
            formData.companyId = found ? found.companyId : null;
        }
        setFormData({...formData,[name]: value});
    }

    const onSubmit = async (close) => {
        // console.log('onSubmit', formData);
        if(!formData.transactions || formData.transactions?.length == 0){
            sweetalertValidate('Please insert atleast one item');
            return;
        }
        if(formData.customerId == ''){
            sweetalertValidate('Please select customer');
            return;
        }
        formData.taxableAmount = formData.transactions.reduce((total,t) => total + (t.total), 0);
        const additinalField = ["igst","cgst","sgst","cess","roundOff","tcs"]
        formData.totalValue = formData.taxableAmount +  additinalField.reduce((total, fN) => total + parseFloat(formData[fN]) , 0 );;
        formData.type = page;
        // console.log('formData', formData);
        if(data){
            let response = await updateInvoice(data.id, formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully updated invoice details", "success");
                reset();    
                callback();
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        else{
            let response = await createInvoice(formData);
            console.log(response);
            if(response?.data?.status == true){
                swal("Succesfully generated invoice details", "success");
                reset();    
                callback();
            }
            else{
                swal("OOPS Something Went wrong", "error");
            }
        }
        
        
    }

    const reset = () => {
        setFormData(initialData);
    }

    const setTransactions = (transactions) => {
        setFormData({...formData,'transactions': transactions});
    }

    const setTaxableRows = (taxableRows) => {
        const data = taxableRows.reduce((result, record) => ({ ...result, [record.fieldName]: record.total }), {})
        setFormData({...formData, ...data });
    }

    return (
        <>
            <div>
                <Row>
                { 
                        InvoiceFormData.map((field) => field.type == 'input' ?
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
                                option={eval(field.list).map((item) => ({ value: item.value, text: item.label}))}
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
                    <Col  span={24}>
                        <EditableTable 
                            setTransactions={setTransactions}
                            transactions={formData && formData.transactions}
                            items={items}
                            notEditable={false}
                            invoiceDetails={formData}
                            setParentTaxableRows={setTaxableRows}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='text-right mt-5'>
                        <Button onClick={() => reset()} className='mr-4' icon={ <RestOutlined />}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={() => onSubmit()} icon={ data ? <EditOutlined /> : <PlusOutlined />} >
                            { data ? 'Update Invoice' : 'Generate Invoice' } 
                        </Button>
                    </Col>
                
                </Row>
            </div>
        </>
    );
};

export default InvoiceForm;
