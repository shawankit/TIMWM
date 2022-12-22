import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Division",
    dataIndex: "division",
    key: "division"
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName"
  },
  {
    title: "Customer Code",
    dataIndex: "customerCode",
    key: "customerCode"
  },
  {
    title: "GST Number",
    dataIndex: "gstNumber",
    key: "gstNumber"
  },
  {
    title: "Invoice Date",
    dataIndex: "invoiceDate",
    key: "invoiceDate"
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "UoM",
    dataIndex: "uom",
    key: "uom"
  },
  {
    title: "Item Name",
    dataIndex: "itemName",
    key: "itemName"
  },
  {
    title: "Goods Value",
    dataIndex: "goodsValue",
    key: "goodsValue"
  },
  {
    title: "Labour Charges",
    dataIndex: "labourCharges",
    key: "labourCharges"
  },
  {
    title: "Claim Amount",
    dataIndex: "claimAmount",
    key: "claimAmount"
  },
  {
    title: "Taxable Amount",
    dataIndex: "taxableAmount",
    key: "taxableAmount"
  },
  {
    title: "IGST",
    dataIndex: "igst",
    key: "igst"
  },
  {
    title: "CGST",
    dataIndex: "cgst",
    key: "cgst"
  },
  {
    title: "SGST",
    dataIndex: "sgst",
    key: "sgst"
  },
  {
    title: "Cess",
    dataIndex: "cess",
    key: "cess"
  },
  {
    title: "Round Off",
    dataIndex: "roundOff",
    key: "roundOff"
  },
  {
    title: "TCS",
    dataIndex: "tcs",
    key: "tcs"
  },
  {
    title: "Total Value",
    dataIndex: "totalValue",
    key: "totalValue"
  }
];

const MyTable = () => {
  return <Table columns={columns} dataSource={[]} />;
};

export default MyTable;