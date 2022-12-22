import { usePapaParse } from 'react-papaparse';
import Button from '../../atoms/Button';

const ProcessCsvStructure = ({
    acceptedFile, onValidate, resetUploadedCsv, setCsvArray, onCancel, setCsvErrors, setHasErrors, dataKeysMap, validateButtonRef
}) => {
    const { readString } = usePapaParse();

    const keysMap = dataKeysMap;

    const emptyUploadedCsv = (onSuccess) => {
        if (acceptedFile === null) {
            alert('Error !! Empty Csv file upload!');
            resetUploadedCsv();
            return [];
        }
        onSuccess();
    };

    const renameKeys = (keysMap, readCsvData) => (readCsvData.map((item) => (Object.keys(item).reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: item[key] }
    }), {}))));

    const validateFieldNames = (readCsvData) => {
        if (readCsvData.length === 0 || (readCsvData.length > 0 && Object.keys(readCsvData[0]).length === 0)) {
            alert('Error!! Empty Csv file upload!');
            return null;
        }

        const invalidHeaders = [];
        let newCsv = [];
        Object.keys(readCsvData[0]).forEach((item) => {
            if (!keysMap[item]) invalidHeaders.push({ invalidColumn: item });
        });

        if (invalidHeaders.length) {
            console.log('invalidHeaders', invalidHeaders)
            // alert('Error!! Invalid Headers in Csv file!');
        } else {
            newCsv = renameKeys(keysMap, readCsvData);
            setCsvArray(newCsv);
        }

        return ({ newCsv, invalidHeaders });
    };

    const handleReadString = () => {
        setCsvArray(null);
        setCsvErrors([]);
        setHasErrors(false);

        emptyUploadedCsv(() => {
            console.log('acceptedFile', acceptedFile)
            readString(acceptedFile, {
                worker: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const handleCsvEmpty = validateFieldNames(results.data);
                    console.log('results.data', results.data);
                    if (handleCsvEmpty) {
                        const { newCsv, invalidHeaders } = { ...handleCsvEmpty };
                        onValidate({ newCsv, invalidHeaders });
                    } else {
                        onCancel();
                    }
                }
            });
        });
    };
    
    return (
        <>
            <div className="flex justify-end items-center mt-5">
                <Button
                    type="button"
                    variant="outlineBtn"
                    btnClass="text-sm font-normal py-3 px-6"
                    onClick={() => onCancel()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primaryBtn"
                    btnClass="text-sm font-normal ml-2 py-3 px-8"
                    onClick={() => handleReadString()}
                >
                    Save
                </Button>
            </div>
        </>
    );
};
export default ProcessCsvStructure;
