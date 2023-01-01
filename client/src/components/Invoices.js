import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Pagination } from 'antd';
import { getAllInvoices, getAllReceipts } from '../api';
import InvoiceData from '../data/InvoiceData';
import moment from 'moment';
import InvoiceDetailsModal from './Modal/InvoiceDetailModal';
import ReceiptData from '../data/ReceiptData';

const { Title } = Typography;

const Invoices = ({ page, reload }) => {

    const [invoices, setInvoices] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [visibleID, setVisibleID] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchInvoices = async () => {
        const getApi = page == 'receipts' || page == 'payments'? getAllReceipts : getAllInvoices; 
        const response = await getApi(page, '', (currentPage - 1) * pageSize, pageSize);
        console.log(response);
        
        setInvoices(response?.data?.entity.rows.map((inv) => ({
            ...inv,
            invoiceNumber:  page == 'receipts' || page == 'payments' ? inv.invoice?.invoiceNumber : inv.invoiceNumber,
            customerName: inv.customer?.name,
            customerCode: inv.customer?.code,
            invoiceDate: inv.invoiceDate? moment(inv.invoiceDate).format('DD-MM-YYYY') : null,
            companyName: inv.company.name,
            division: inv.company.division,
            receiptDate: inv.receiptDate? moment(inv.receiptDate).format('DD-MM-YYYY') : null,
        })));
        setTotal(response?.data?.entity.count);
    }

    useEffect(() => {
        fetchInvoices();
    },[page, currentPage, pageSize, reload]);

    const openInvoiceDetail = (invoiceId) => {
        setSelectedInvoiceId(invoiceId);
        setVisibleID(true);  
    }

    const getRender = (column) => {
        if(column.name == 'invoiceNumber'){
            return {
                render: (invoiceNumber, data) => {
                    const invoiceId =  page == 'receipts' || page == 'payments' ? data.invoice?.id : data.id;
                    return (
                        <div>
                            <a onClick={() => openInvoiceDetail(invoiceId)} className='underline text-blue-900'>
                            { invoiceNumber }
                            </a>
                        </div>
                    )
                }
            }
        }
        if(column.inputType === 'number'){
            return {
                render: (number, data) => {
                    return (
                        <div>
                            { number ? number.toLocaleString('en-IN') : number } 
                        </div>
                    )
                } 
            }
        }
        return {};
    }
    const getTitle = (column) => {
        if((page == 'purchase' || page == 'payments') && (column.name == 'customerName' || column.name == 'customerCode')){
           return column.label.replace('Customer','Vendor');
        }
        if(page == 'payments' && (column.name == 'receiptDate' || column.name == 'via')){
            return column.label.replace('Receipt','Payment');
        }

        return  column.label;
    }
    const fieldData = page == 'receipts' || page == 'payments'? ReceiptData : InvoiceData; 
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {getTitle(column)}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px',
        ...getRender(column)
    }));

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
      };

    
    const initpageSizeOptions = [10, 20, 50, 100];
    const pageSizeOptions = [];
    while(initpageSizeOptions.length > 0 && initpageSizeOptions[0] < total ){
        pageSizeOptions.push(initpageSizeOptions[0] + '');
        initpageSizeOptions.shift();
    }
    if(total > 10) pageSizeOptions.push( total + '');
    const getPageName = () => {
        if(page === 'sales') return 'Sale Invoices';
        if(page === 'purchases') return 'Purchase Invoices';
        if(page === 'receipts') return 'Receipts';
        if(page === 'payments') return 'Payments';
    }

    return (
        <div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                    {getPageName()}
                </Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={invoices} 
                            columns={columns}
                            bordered
                            pagination={{ 
                                position: ['bottomRight', 'topRight'], 
                                pageSizeOptions,
                                ocurrent: currentPage,
                                pageSize: pageSize,
                                onChange: handlePageChange,
                                onShowSizeChange: handlePageSizeChange,
                                total,
                                showSizeChanger: true
                             }}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                        {/* <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            onShowSizeChange={handlePageSizeChange}
                            total={total}
                        /> */}
                    </Col>
                </Row> 
                <InvoiceDetailsModal visible={visibleID} setVisible={setVisibleID} invoiceId={selectedInvoiceId} />
            </div>
        </div>
    );
};

export default Invoices;
