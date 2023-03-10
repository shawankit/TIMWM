import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Table, Typography } from 'antd';
import { getAllMilkCategories, getInvoiceById } from '../../api'; 
import moment from 'moment';
import EditableTable from '../common/EditableTable';

const { Title } = Typography;


const InvoiceDetailsModal = ({ visible , setVisible , invoiceId }) => {
    const [invoiceDetails, setInvoiceDetails] = useState({
        transactions: []
    });
    const [milk, setMilks] = useState({});

    const fetchInvoicesDetails = async (invoiceId) => {
        const response = await getInvoiceById(invoiceId);
        console.log(response);

        const transactions = response?.data?.entity.transactions.map((element) => {
            const total  = element.rate * element.quantity;
            return ({
                itemCode: element.item.code,
                categoryName: element.item.name,
                rate: element.rate,
                quantity: element.quantity,
                total: element.total
            })
        })

        setInvoiceDetails({ ...response?.data?.entity, transactions});
    }

    useEffect(async () => {
        console.log('calling', invoiceId);
        if(invoiceId){
            await fetchInvoicesDetails(invoiceId);
        }
    }, [invoiceId]);

    return (
        <>
        <Modal
            title={`Invoice Details`}
            visible={visible}
            width={"50%"}
            style={{ top: 75 }}
            keyboard={false}
            onCancel={() => setVisible(false)}
            footer={[]}
        >
            <div className="site-layout-background p-5 mt-1">
                <Row>
                    <Col span={18}>
                        <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                            Customer Name : {invoiceDetails?.customer?.name}
                        </Title>
                    </Col>
                    <Col span={6}>
                        <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                            Dated : { moment(invoiceDetails?.invoiceDate).format('DD-MM-YYYY') }
                        </Title>
                    </Col>
                    <Col span={12}>
                        <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                            Invoice Number : {invoiceDetails?.invoiceNumber}
                        </Title>
                    </Col>
                </Row>
                <Row>
                    <Col  span={24}>
                        <EditableTable
                            customerData={invoiceDetails && invoiceDetails.customerId && invoiceDetails?.customer}
                            transactions={invoiceDetails && invoiceDetails?.transactions }
                            milk={{}}
                            notEditable={true}
                            invoiceDetails={invoiceDetails}
                        />
                    </Col>
                </Row>
            </div>
                   
        </Modal>
        </>
    );
};

export default InvoiceDetailsModal;