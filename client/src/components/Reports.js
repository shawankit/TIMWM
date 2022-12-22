import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Button, Pagination } from 'antd';
import { getReports } from '../api';
import InvoiceData from '../data/InvoiceData';
import moment from 'moment';

const { Title } = Typography;

const Reports = ({ page }) => {
    const actualMonths = ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [divisionReports, setDivisonReports] = useState(null);
    const [companyReports, setCompanyReports] = useState(null);

    const fetchData = async () => {
        const response = await getReports(page, '');
        
        console.log('response', response);
        const data = response.data?.entity;
        const financialYearMonths = getMonthNamesForFinancialYear(2023);
        const divisionMap = {};
        const companyMap = {};
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const monthStr = `${actualMonths[element.month - 1].slice(0, 3)}-${element.year.toString().slice(-2)}`

            if(!divisionMap[element.division]){
                divisionMap[element.division] = {};
            }
            divisionMap[element.division][monthStr] = element.taxable_amount;

            if(!companyMap[element.name]){
                companyMap[element.name] = {};
            }
            if(!companyMap[element.name][monthStr]){
                companyMap[element.name][monthStr] = 0;
            }
            companyMap[element.name][monthStr] += element.taxable_amount;;
        }

        const divisionRows = [];
        for (const division in divisionMap) {
            const element = divisionMap[division];

            const columns = {};
            financialYearMonths.forEach((month) => {
                columns[month] = element[month] ? element[month] : 0;
            });
            divisionRows.push({
                division,
                ...columns
            })
        }
        setDivisonReports(divisionRows);

        const companyRows = [];
        for (const company in companyMap) {
            const element = companyMap[company];

            const columns = {};
            financialYearMonths.forEach((month) => {
                columns[month] = element[month] ? element[month] : 0;
            });
            companyRows.push({
                company,
                ...columns
            })
        }
        setCompanyReports(companyRows);
    }

    useEffect(() => {
        fetchData();
    },[]);

    
    const financialYearMonths = getMonthNamesForFinancialYear(2023);
    const monthCols = financialYearMonths.map((month) => ({ 
        label: month, name: month,
        render: (number, data) => {
            return (
                <div>
                    { number.toLocaleString('en-IN') }
                </div>
            )
        } 
    }));

    const getColums = (list) => list.map((column) => ({
        title:  ( 
            <Typography.Text ellipsis={true} title={column.label}>
               {column.label}
            </Typography.Text>
        ),
        dataIndex: column.name,
        key: column.name,
        width: '150px',
        render: column.render
    }));

    const showDataInTable = (value, data) => {
        return (
            <div>
                { value }
            </div>
        )
    } 

    const divisonData = [
        {
            label : "Division",
            name: 'division',
            render: showDataInTable
        },
        ...monthCols
    ];
    const columns = getColums(divisonData);

    const CompanyData = [
        {
            label : "Company",
            name: 'company',
            render: showDataInTable
        },
        ...monthCols
    ];
    const columnsCompany = getColums(CompanyData);


    return (
        <div>
            <div className="site-layout-background p-5 mt-1">
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >
                    Reports By Division
                </Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={divisionReports} 
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
                    Reports By Company
                </Title>
                <Row className="w-full">
                    <Col span={24}>
                        <Table
                            dataSource={companyReports} 
                            columns={columnsCompany}
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

export default Reports;

const getMonthNamesForFinancialYear = (year) => {
    const months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
    let financialYearMonths = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    for (let i = 0; i < months.length; i++) {
        let month = months[i];
        let yearSuffix = (i < 9) ? (year - 1) : year; 
        financialYearMonths.push(`${month.slice(0, 3)}-${yearSuffix.toString().slice(-2)}`);
    }
    
    if(currentYear === year && currentMonth < 3){
        financialYearMonths = financialYearMonths.slice(0, 12 - (3 - currentMonth));
    }
    
    if(currentYear === year - 1 && currentMonth >= 3){
        financialYearMonths = financialYearMonths.slice(0, currentMonth - 3);
    }
    
    return financialYearMonths;
}
