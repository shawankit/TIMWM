import { Modal, Input, Select, DatePicker, Button } from 'antd';
import { useEffect, useState } from 'react';
import { getCompanies, getCustomers } from '../../api';
import { getDateWithTime } from '../../util/util';
import moment from 'moment';

const getDates = (dates) => {
  let fromDate = null;
  let toDate = null;
  if (dates.length > 0) {
    fromDate = getDateWithTime(dates[0], [0, 0, 0]);
    toDate = getDateWithTime(dates[1], [23, 59, 59]);
  }

  return {
    fromDate,
    toDate
  };
};

const { RangePicker } = DatePicker;
const FilterModal = ({ visible, onOk, onCancel, page, filters }) => {
  const [dateRange, setDateRange] = useState( filters.dateRange?.fromDate ? [moment( filters.dateRange.fromDate), moment( filters.dateRange.toDate)] : []);
  const [companyIds, setComapnyIds] = useState(filters.companyIds ? filters.companyIds : []);
  const [customerIds, setCustomerIds] = useState(filters.customerIds ? filters.customerIds : []);

  const handleOk = () => {
    onOk({ 
      dateRange: getDates(dateRange),
      companyIds,
      customerIds
    });
  };

  const [divisions, setDivisions] = useState([]);
  const [customers, setCustomers] = useState([]);

  const getOptions = (list) => list.map((option, index) => <Option key={index} value={option.value}>{option.label}</Option>);

  const fetchCompanies = async () => {
    const res = await getCompanies();
    // console.log('getCompanies', res);
    setDivisions(
      res.data.entity?.rows.map((company) => ({
        value: company.id,
        label: `${company.division} - ${company.name}`
      }))
    )
  }
  const fetchCustomers = async () => {
    const customerType = page == 'sales' || page == 'receipts' ? 'customer' : 'vendor';
    const res = await getCustomers(customerType);
    // console.log('getCustomers', res);
    setCustomers(
      res.data.entity?.rows.map((customer) => ({
        value: customer.id,
        label: `${customer.name}`
      }))
    )
  }
  useEffect(()=> {
    if(visible){
      fetchCompanies();
      fetchCustomers();
    }
    
  } , [visible]);

  const onClear = () => {
    setDateRange([]);
    setComapnyIds([]);
    setCustomerIds([]);
    // onCancel();
  }

  return (
    <Modal
      title="Filter"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={() => onClear()}>
            Clear Filter
        </Button>,
        <Button key="save" type="primary" onClick={() => handleOk()}>
            Apply Filter
        </Button>,
        ]}
    >
      <label>{page == 'receipts' ? 'Receipt' : page == 'payments' ? 'Payment' : 'Invoice'} Date Range</label>
      <RangePicker
        style={{ width: '100%'}}
        dateRender={(current) => {
            const style = {};

            if (current.date() === 1) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
            }

            return (
                <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                </div>
            );
        }}
        onChange={(value) => setDateRange(value)}
        value= {dateRange} 
        />
      <br />
      <br />
      <label>Division</label>
      <Select
        placeholder="Divisions"
        allowClear
        style={{ width: '100%'}}
        value={companyIds}
        onChange={setComapnyIds}
        mode="multiple"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
         {getOptions(divisions)}
      </Select>
      <br />
      <br />
      <label>{page == 'sales' || page == 'receipts' ? 'Customers' : 'Vendors'}</label>
      <Select
        placeholder="Customers"
        value={customerIds}
        allowClear
        style={{ width: '100%'}}
        onChange={setCustomerIds}
        mode="multiple"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
      >
        {getOptions(customers)}
      </Select>
    </Modal>
  );
};

export default FilterModal;
