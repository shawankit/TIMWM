import { DeleteOutlined, FileProtectOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import Text from '../../atoms/Text';
import ProcessCsvStructure from './ProcessCsvStructure';

const CSVComponent = ({
    validateBulkCreation,
    onCancel,
    hasErrors,
    setHasErrors,
    csvErrors,
    setCsvErrors,
    csvArray,
    setCsvArray,
    validateButtonRef,
    invalidHeader,
    setInvalidHeader,
    record,
    setRecord,
    dataKeysMap
}) => {
    const { CSVReader } = useCSVReader();
    const buttonRefCancel = React.useRef();
   
    const [csvFileData, setCsvFileData] = useState(null);

    const onValidate = async ({ newCsv, invalidHeaders }) => {
        setRecord(false);
        //setInvalidHeader(invalidHeaders);

        if (!newCsv) {
            resetUploadedCsv();
        }

        validateBulkCreation(newCsv, invalidHeaders);
    };

    const resetUploadedCsv = () => {
        onCancel();
        buttonRefCancel.current?.click();
    };
    return (
        <>
            <div className='' >
                <CSVReader onUploadAccepted={(results) => {
                    setCsvFileData(results);
                    setHasErrors(false);
                    setCsvArray(null);
                }} >
                    {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps
                    }) => {
                        const RemoveFile = (
                            <div className="absolute group-hover:flex hidden w-53.5 h-25  top-0 left-0 items-center justify-center before:w-full before:h-full before:left-0 before:bg-black before:opacity-70">
                              <div ref={buttonRefCancel} className="absolute cursor-pointer " {...getRemoveFileProps()}>
                                <DeleteOutlined />
                              </div>
                            </div>
                          );
                        return (
                        <>
                            <div className={`relative w-53.5 h-25 mb-2 cursor-pointer`}>
                                <div {...getRootProps()}>
                                    <input
                                    className="shadow hidden appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />

                                    <div
                                    className={`p-2 border border-dashed bg-gray-100 border-gray-300 w-53.5 h-25 flex items-center justify-center`}
                                    >
                                    {!acceptedFile && (
                                        <div className="text-center">
                                        <FileProtectOutlined />
                                        <Text>
                                            Drag the file or <span className="text-info ">Browse</span>
                                        </Text>
                                        </div>
                                    )}
                                    {acceptedFile && <div
                                            key={acceptedFile.name}
                                            className="relative w-53.5 h-25 align-middle mb-6 group flex items-center justify-center"
                                        >
                                            {acceptedFile.name}
                                            {RemoveFile}
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>
                            <ProcessCsvStructure
                                csvFileData={csvFileData}
                                acceptedFile={acceptedFile}
                                onValidate={onValidate}
                                getRemoveFileProps={getRemoveFileProps} 
                                resetUploadedCsv={resetUploadedCsv}
                                setCsvArray={setCsvArray}
                                setInvalidHeader={setInvalidHeader}
                                onCancel={onCancel}
                                setCsvErrors={setCsvErrors}
                                setHasErrors={setHasErrors}
                                dataKeysMap={dataKeysMap}
                                validateButtonRef={validateButtonRef}
                            />

                            <div className='pb-5'>
                                {(csvArray) && (
                                    (hasErrors
                                        ? (<label className="font text-md text-red-800 ">
                                            {record} records needs correction. </label>)
                                        : (<label className="font text-md "> All records are valid. </label>)
                                    ))}
                            </div>
                        </>
                    )}}
                </CSVReader>
                </div>
        </>
    );
};

export default CSVComponent;
