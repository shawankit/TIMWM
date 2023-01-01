import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Pagination } from 'antd';
import { getFundsReports } from '../api';
import moment from 'moment';
import FundData from '../data/FundData';

const { Title } = Typography;

const FundReport = ({ page }) => {
    const [asOnReports, setAsOnReports] = useState(null);
    const [monthReports, setMonthReports] = useState(null);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [month, setMonth] = useState(moment().format('YYYY-MM'));

    const getData = (data, reportType) => {
        const  dataMap = {};
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            
            if(!dataMap[element.company_id]){
                dataMap[element.company_id] = {
                    id: element.company_id,
                    companyName: element.name,
                    division: element.division,
                    fundAvailable: 0
                };
            }
            const obj_ = dataMap[element.company_id];
            if(element.type == 'receipts'){
                obj_.toatalCollection = reportType == 'date' ? element.total_amount_for_date : element.total_amount_for_month_and_year;
            }
            if(element.type == 'payments'){
                obj_.toatlPayment = reportType == 'date' ? element.total_amount_for_date : element.total_amount_for_month_and_year;
            }
        }

        return Object.values(dataMap);
    }

    const fetchData = async (reportType) => {
        const response = await getFundsReports(reportType, date, month.split('-')[1], month.split('-')[0]);
        
        console.log(response)
        const data = response.data?.entity;
        if(reportType == 'date'){
            setAsOnReports(Object.values(getData(data, reportType)));
        }
        else{
            setMonthReports(Object.values(getData(data, reportType)));
        }
        
    }

    useEffect(() => {
        fetchData('date');
    },[date]);

    useEffect(() => {
        fetchData('month');
    },[month]);


    const getRender = (column) => {
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

    const fieldData = FundData;
    const columns = fieldData.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
                {column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px',
        ...getRender(column)
    }));


    return (
        <div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                    As on {<input type='date' onChange={(e) => setDate(e.target.value)} value={date}/>}
                </Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={asOnReports} 
                            columns={columns}
                            bordered
                            pagination={false}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
            </div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                    Month Report {<input type='month' onChange={(e) => setMonth(e.target.value)} value={month}/>} 
                </Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={monthReports} 
                            columns={columns}
                            bordered
                            pagination={false}
                            rowKey={(record) => record.id + (new Date().getTime() + Math.random() * 10000)}
                        />
                    </Col>
                </Row> 
            </div>
        </div>
    );
};

export default FundReport;

