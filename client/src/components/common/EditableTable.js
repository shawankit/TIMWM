import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';

const EditableRow = ({ index, ...props }) => {
  return (
      <tr {...props} />
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  items,
  handleTaxInput,
  ...restProps
}) => {
  


  const onSave = (name, value) => {
    if(!record.taxRow){
      let newValues = {};
      if( dataIndex === 'categoryName'){
          newValues = { categoryName: items[value].name, itemId: value, rate: items[value].rate, itemCode: items[value].code };
          if(record.quantity != undefined){
            newValues.total = Math.round(parseFloat(newValues.rate) * parseFloat(record.quantity) * 10) / 10;
          }
      }

      if(dataIndex == 'quantity' && record.rate != undefined){
        newValues = { quantity: value };
        newValues.total =  Math.round(parseFloat(record.rate) * parseFloat(value) * 10) / 10;
      }

    
      handleSave({ ...record, ...newValues });
    }
    else{
      handleTaxInput({ ...record, total: value });
    }
    
  }

    let childNode = children;
    
    let edit = false;
    if(dataIndex == 'total' && record?.taxRow && editable){
      edit = true;
    }
    else if(dataIndex == 'total' && !record?.taxRow){
      edit = false;
    }
    else{
      edit = editable  && !record.taxRow;
    }
    if (edit) {
        //childNode = editing ? (
        //if(dataIndex == 'total') console.log(record, record[dataIndex]);
        childNode = record.categoryName != 'Total Amount' && record.categoryName != 'Taxable Value'?  ( 
            <>{ dataIndex !== 'categoryName' ? 
                <Input className="w-full" onChange={(e) => onSave(dataIndex, e.target.value)} value={record[dataIndex]}/> :
                <Select
                    placeholder={'Select Items'}
                    showSearch
                    optionFilterProp="children"
                    showArrow={false}
                    value={record?.itemId}
                    onChange={(value) => onSave(dataIndex, value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    key={'itemId'}
                    className="w-full"
                >
                    { Object.values(items).map((ele,index) => <Option value={ele.id} key={index}>{ ele.name}</Option>) }
                </Select>
            }
        </>) : (
        <div
            className="editable-cell-value-wrap font-bold"
            style={{
              paddingRight: 24,
              fontSize: '16px',
            }}
        >
            {children}
        </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const EditableTable = ({ setTransactions, transactions, items, notEditable, invoiceDetails, setParentTaxableRows }) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setDataSource(transactions || []);
  },[transactions])

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    // console.log('handleDelete', newData);
    setDataSource(newData);
    setTransactions(newData);
  };

  const numberRender = (number, data) => {
    return (
        <div>
            { number ? number.toLocaleString('en-IN') : number } 
        </div>
    )
}

  const defaultColumns = [
    {
      title: 'Item Name',
      dataIndex: 'categoryName',
      width: '35%',
      editable: !notEditable
    },
    {
      title: 'Item Code',
      dataIndex: 'itemCode',
      width: '15%'
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: '10%',
      render: numberRender
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '10%',
      editable: !notEditable
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '20%',
      render: numberRender,
      editable: !notEditable
    },
  ];

  if(!notEditable){
    defaultColumns.push({
      title: 'Action',
      dataIndex: 'operation',
      width: '5%',
      render: (_, record) =>
       !record.taxRow && (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ),
    })
  }

  const handleAdd = () => {
    const newData = {
      key: count,
      categoryName: `Select Item`,
      rate: '0',
      quantity: `0`,
      total: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    // setDataSource(newData);
    setTransactions(newData);
  };

  // console.log(invoiceDetails, notEditable)
  let staticRowCount = 2;
  const igstRow = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `IGST`,
    taxRow: true,
    fieldName: 'igst',
    total: invoiceDetails.igst || 0 
  }

  const cgstRow = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `CGST`,
    taxRow: true,
    fieldName: 'cgst',
    total: invoiceDetails.cgst || 0
  }

  const sgstRow = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `SGST`,
    taxRow: true,
    fieldName: 'sgst',
    total: invoiceDetails.sgst || 0
  }

  const cess = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `Cess`,
    taxRow: true,
    fieldName: 'cess',
    total: invoiceDetails.cess || 0
  }

  const roundOff = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `Round Off`,
    taxRow: true,
    fieldName: 'roundOff',
    total: invoiceDetails.roundOff || 0
  }

  const [taxaRowsData, setTaxRowsData] = useState([igstRow, cgstRow, sgstRow, cess, roundOff]);
  useEffect(()=> {
    setTaxRowsData([ ...taxaRowsData.map((_obj) => ({ ..._obj,  total: invoiceDetails[_obj.fieldName] || 0 }))]);
  }, [invoiceDetails])

  const handleTaxInput = (row) => {
    const newData = [...taxaRowsData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTaxRowsData(newData);
    setParentTaxableRows(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {

    return {
      ...col,
      onCell: (record, index) => {
        let __ = {};
        const exceptionRows = ['Total Amount', 'Taxable Value', 'IGST', 'CGST'];
        if(exceptionRows.includes(record.categoryName) && col.dataIndex == 'categoryName' ){
          __ = {
            colSpan: 4
          }
        }

        if(exceptionRows.includes(record.categoryName) &&  (col.dataIndex == 'quantity' || col.dataIndex == 'rate' || col.dataIndex == 'itemCode') ){
          __ = {
            colSpan: 0
          }
        }
        if (!col.editable) {
          return __;
        }
        
        return ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
            items,
            handleTaxInput,
            ...__
          })
        },
    };
  });

  

  const taxableAmount = dataSource.reduce((total, record) => total + record.total, 0 );
  const taxSum = taxaRowsData.reduce((total, record) => total + parseFloat(record.total || 0) , 0 );
  const taxableRow = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `Taxable Value`,
    total: notEditable ? invoiceDetails.taxableAmount : taxableAmount,
    render: numberRender,
    taxRow: true,
  }


  const totalRow = {
    key: 'taxRow' + staticRowCount++,
    categoryName: `Total Amount`,
    taxRow: true,
    total: notEditable ? invoiceDetails.totalValue  : (taxableAmount + taxSum) 
  }

  // console.log(taxaRowsData);
  return (
    <div>
      { !notEditable ? 
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        > 
        Add a item
      </Button> : null }
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={[...dataSource,taxableRow, ...taxaRowsData, totalRow]}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default EditableTable;