import ListValidationErrors from "./CSVComponent/ListValidationErrors";
import Card from "../atoms/Card";
import InputLabel from "../atoms/InputLabel";
import Text from "../atoms/Text";
import CSVComponent from "./CSVComponent/CSVComponent";
import DownloadCsv from "./CSVComponent/DownloadCsv";
import IconWithHeading from "../molecules/IconWithHeading";
import { GlobalOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { createBulkApiFn, sweetalertMessage, sweetalertValidate } from "../util/util";

const BulkUploadForm = ({ page, setReload }) => {

    const [csvArray, setCsvArray] = useState(null);
    const [csvErrors, setCsvErrors] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [invalidHeader, setInvalidHeader] = useState([]);
    const [record, setRecord] = useState(null);

    const [validatedData, setValidatedData] = useState(false);

    const validateButtonRef = useRef(null);

    useEffect(() => {
      onCancel();
  }, [page]);
  
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
        const createApi = createBulkApiFn(page);
        const res = await createApi(csvData, page);
        console.log(res, 'res')
        if (res.data.status) {
           if(res.data.entity.csvErrorArray){
            setCsvErrors(res.data.entity.csvErrorArray);
           }
           else{
            setCsvErrors([]);
            setReload(true);
            sweetalertMessage('Succesfully Uploaded')
           }
        } else {
          sweetalertValidate('OOPS!! Something went wrong')
        }
           
    };

    const validateBulkCreation = async (csvData, invalidHeaders) => {
        if (invalidHeaders.length > 0) {
            setInvalidHeader(invalidHeaders);
        } else {
            handleBulkCreation(csvData)
        }
    };

    const dataKeysMap = getDataKeysMap(page);
   
  return (
    <div className="scr">
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

      {/* <Invoices page={page} reload={reload}/> */}
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
      "ITEM VALUE": 'itemValue',
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
      "ITEM VALUE": 'itemValue',
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

  if(page == 'receipts'){
    return {
      'COMPANY': 'companyName',
      'DIVISION': 'division',
      'CUSTOMER NAME': 'customerName',
      'CUSTOMER CODE': 'customerCode',
      'INVOICE NUMBER': 'invoiceNumber',
      'NATURE': 'nature',
      'RECEIPT VIA': 'via',
      'AMOUNT': "amount",
      'RECEIPT DATE': "receiptDate"
    }
  }
  if(page == 'payments'){
    return {
      'COMPANY': 'companyName',
      'DIVISION': 'division',
      'VENDOR NAME': 'customerName',
      'VENDOR CODE': 'customerCode',
      'INVOICE NUMBER': 'invoiceNumber',
      'NATURE': 'nature',
      'PAID VIA': 'via',
      'AMOUNT': "amount",
      'PAYMENT DATE': "receiptDate"
    }
  }

    if(page == 'journals'){
      return {
        'LEDGER CODE': 'ledgerCode',
        'LEDGER NAME': 'ledgerName',
        'DATE': 'dated',
        'DR': 'dr',
        'CR': 'cr',
        'DESCRIPTION': 'description'
      }
  }
}
