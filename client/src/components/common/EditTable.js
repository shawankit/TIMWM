import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Result, Select, Table } from 'antd';
import { uuid } from '../../util/util';

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
  ledgers,
  ...restProps
}) => {
  

  const onSave = (name, value) => {
    let newValues = {};
    if( dataIndex === 'name'){
        newValues = { name: ledgers[value].name, ledgerId: value, rate: null, ledgerCode: ledgers[value].code };
    }
    else{
        const altValues = dataIndex === 'cr' ? { dr: '' } : { cr: '' }; 
        newValues = { [dataIndex]: value, ...altValues };
    }
    handleSave({ ...record, ...newValues });
  }

    let childNode = children;
    
    if (editable) {
        childNode = record.name != 'Total Amount' ?  ( 
            <>{ dataIndex !== 'name' ? 
                <Input className="w-full" type='number' onChange={(e) => onSave(dataIndex, e.target.value)} value={record[dataIndex]}/> :
                <Select
                    placeholder={'Select Items'}
                    showSearch
                    optionFilterProp="children"
                    showArrow={false}
                    value={record?.ledgerId}
                    onChange={(value) => onSave(dataIndex, value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    key={'ledgerId'}
                    className="w-full"
                >
                    { Object.values(ledgers).map((ele,index) => <Option value={ele.id} key={index}>{ ele.name}</Option>) }
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

const EditTable = ({ columns, setDataSource, dataSource, notEditable, ledgers }) => {

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  if(!notEditable && columns.length <= 3){
    columns.push({
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
      key: uuid(),
     ...columns.reduce((result, col) => ({ ...Result, [col.dataIndex]: '' }), {})
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };


  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnData = columns.map((col) => {
    return {
      ...col,
      onCell: (record, index) => {
        let __ = {};
        if (!col.editable) {
          return __;
        }
        
        return ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
            ledgers,
            ...__
          })
        },
    };
  });

  
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
        Add a Ledger
      </Button> : null }
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={[...dataSource]}
        columns={columnData}
        pagination={false}
      />
    </div>
  );
};

export default EditTable;