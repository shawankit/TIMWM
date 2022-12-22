import ListValidationErrors from "./CSVComponent/ListValidationErrors";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import InputLabel from "../atoms/InputLabel";
import Text from "../atoms/Text";
import CSVComponent from "./CSVComponent/CSVComponent";
import DownloadCsv from "./CSVComponent/DownloadCsv";
import IconWithHeading from "../molecules/IconWithHeading";
import { GlobalOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "antd";
import { createSalesInBulk } from "../api";
import Invoices from "./Invoices";

const BulkUploadForm = ({ page }) => {

    const [csvArray, setCsvArray] = useState(null);
    const [csvErrors, setCsvErrors] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [invalidHeader, setInvalidHeader] = useState([]);
    const [record, setRecord] = useState(null);
    const [toaster, setToaster] = useState({
        show: false,
        message: '',
        success: true 
    });

    const [validatedData, setValidatedData] = useState(false);

    const validateButtonRef = useRef(null);

    useEffect(() => {
        setHasErrors(true);
    }, [csvErrors]);

    const onCancel = () => {
        setValidatedData(false)
        setCsvArray(null);
        setCsvErrors([]);
        setHasErrors(false);
        setInvalidHeader([]);
        setRecord(null);
    };

    const handleBulkCreation = async (csvData) => {
      console.log(csvData, 'csvData')
        const res = await createSalesInBulk(csvData, page);
        console.log(res, 'res')
        if (res.data.status) {
           if(res.data.entity.csvErrorArray){
            setCsvErrors(res.data.entity.csvErrorArray);
           }
           else{
            setCsvErrors([]);
           }
        } else {
           
        }
           
    };

    const validateBulkCreation = async (csvData, invalidHeaders) => {
        if (invalidHeaders.length > 0) {
            return false;
        } else {
            handleBulkCreation(csvData)
        }
    };

    const dataKeysMap = getDataKeysMap(page);
   
  return (
    <div className="scr">
      <Breadcrumb style={{ margin: '16px 0'}} className="text-4xl font-bold">
        <Breadcrumb.Item>{page.toUpperCase()}</Breadcrumb.Item>
      </Breadcrumb>
      <Card cardClass="mt-6 mb-4 flex" cardPadding="px-6">
        <div className="w-2/5 py-8">
          <IconWithHeading
            getIcon={() => <GlobalOutlined style={{ fontSize: '450%'}} />}
            headingChildren="Bulk Upload"
            textChildren="Upload the required file"
          />
          <Text className="pl-14 pt-4">
            To download a sample <b>{page}</b> file{" "}
            <DownloadCsv
              page={page}
              sampleData={[dataKeysMap]}
              fileName={'sample-file'}
              children={
                <div
                  variant="Link"
                  className="text-primary-500 font-semibold text-sm mt-2"
                >
                  Click here
                </div>
              }
            />
          </Text>
        </div>
        <div className="w-3/5 pl-25 py-8 mt-12">
          <div>
            <InputLabel fontWeight="font-normal">Upload File</InputLabel>
            <CSVComponent
              validateBulkCreation={validateBulkCreation}
              handleBulkCreation={handleBulkCreation}
              hasErrors={hasErrors}
              setHasErrors={setHasErrors}
              csvErrors={csvErrors}
              setCsvErrors={setCsvErrors}
              csvArray={csvArray}
              setCsvArray={setCsvArray}
              onCancel={onCancel}
              validateButtonRef={validateButtonRef}
              invalidHeader={invalidHeader}
              setInvalidHeader={setInvalidHeader}
              record={record}
              setRecord={setRecord}
              dataKeysMap={dataKeysMap}
            />
          </div>
        </div>
      </Card>

      {hasErrors && (
        <Card cardClass="mt-6 mb-4 flex" cardPadding="px-6">
          <div className="w-full">
            <ListValidationErrors
              tableData={csvErrors}
              invalidHeader={invalidHeader}
              setHasErrors={setHasErrors}
              hasErrors={hasErrors}
              setRecord={setRecord}
              record={record}
            />
          </div>
        </Card>
      )}

      { (page === 'sales' || page === 'purchase') && <Invoices page={page}/> }
    </div>
  );
};

export default BulkUploadForm;

const getDataKeysMap = (page) => {
  if(page == 'sales'){
    return {
      'COMPANY': 'companyName',
      'DIVISION': 'division',
      'CUSTOMER NAME': 'customerName',
      'CUSTOMER CODE': 'customerCode',
      'GST NUMBER': 'gstNumber',
      'DATE': 'invoiceDate',
      'INVOICE NUMBER': 'invoiceNumber',
      'QUANTITY': 'quantity',
      'UOM': 'uom',
      'ITEM CODE': 'itemCode',
      'ITEM NAME': 'itemName',
      "ITEM VALUE": 'rate',
      "LABOUR CHARGES": "labourCharges",
      "CLAIM AMOUNT": "claimAmount",
      "TAXABLE VALUE": "taxableAmount",
      "IGST": "igst",
      "CGST": "cgst",
      "SGST": "sgst",
      "CESS": "cess",
      "ROUND OFF": "roundOff",
      "TCS": "tcs",
      "TOTAL VALUE": "totalValue"
    }
  }

  if(page == 'purchase'){
    return {
      'COMPANY': 'companyName',
      'DIVISION': 'division',
      'VENDOR NAME': 'customerName',
      'VENDOR CODE': 'customerCode',
      'GST NUMBER': 'gstNumber',
      'DATE': 'invoiceDate',
      'INVOICE NUMBER': 'invoiceNumber',
      'QUANTITY': 'quantity',
      'UOM': 'uom',
      'ITEM CODE': 'itemCode',
      'ITEM NAME': 'itemName',
      "ITEM VALUE": 'rate',
      "LABOUR CHARGES": "labourCharges",
      "CLAIM AMOUNT": "claimAmount",
      "TAXABLE VALUE": "taxableAmount",
      "IGST": "igst",
      "CGST": "cgst",
      "SGST": "sgst",
      "CESS": "cess",
      "ROUND OFF": "roundOff",
      "TCS": "tcs",
      "TOTAL VALUE": "totalValue"
    }
  }
}
