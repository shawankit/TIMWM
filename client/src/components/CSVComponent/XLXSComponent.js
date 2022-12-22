import React, { useRef, useState } from 'react';
import { read, utils } from 'xlsx'
import { useForm } from 'react-hook-form';
import Button from '../atoms/Button';


const XLSXComponent = ({
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
    customAttributeConfig,
    bulkUploadFor
}) => {
    const {
        getValues,
        setValue,
        unregister,
        register,
        watch,
        setError,
        formState: { errors },
    } = useForm();
    const buttonRefCancel = React.useRef();

    const [csvFileData, setCsvFileData] = useState(null);

    const onValidate = async ({ newCsv, invalidHeaders }) => {
        setRecord(false);
        setInvalidHeader(invalidHeaders);

        if (!newCsv) {
            resetUploadedCsv();
        }

        validateBulkCreation(newCsv, invalidHeaders);
    };

    const resetUploadedCsv = () => {
        onCancel();
        buttonRefCancel.current?.click();
    };

    const dataKeysMap = bulkUploadFor === 'candidates' ? {
        'Candidate Name': 'name',
        'Gender': 'gender',
        'Email': 'emailId',
        'Mobile Number': 'mobileNumber',
        'Whatsapp Number': 'whatsappNumber',
        'Position ID': 'positionId',
        'Estimated Joining Date': 'estimatedJoiningDate',
        'Address': 'address',
        'City': 'city',
        'Country': 'country',
        'Notice Period': 'noticePeriod',
        'Experience Level': 'experienceLevel',
        'Resume Url': 'resumeUrl'
    } : {
        'Position Title': 'title',
        'Position ID': 'positionId',
        'Position Code': 'positionCode',
        'Recruiter': 'recruiterManager',
        'Hiring Manager': 'hiringManager',
        'Campaign Template Name': 'campaignTemplateName',
        'Designation': 'designationName',
        'Min Year Of Experience': 'minimumExperience',
        'Max Year Of Experience': 'maximumExperience',
        'Department': 'department',
        'Location': 'location'
    };

    const customAttributeConfigMap = {};
    if (customAttributeConfig?.length > 0) {
        customAttributeConfig.forEach(config => {
            dataKeysMap[config.label] = config.id;
            customAttributeConfigMap[config.id] = config
        });
    }

    const renameKeys = (keysMap, readCsvData) => (readCsvData.map((item) => (Object.keys(item).reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: item[key] }
    }), {}))));

    const validateFieldNames = (data) => {
        if (data.length === 0 || (data.length > 0 && Object.keys(data[0]).length === 0)) {
            return null;
        }
        const invalidHeaders = [];
        let newData = [];
        Object.keys(data[0]).forEach((item) => {
            if (!dataKeysMap[item]) invalidHeaders.push({ invalidColumn: item });
        });
        if (invalidHeaders.length) {

        } else {
            newData = renameKeys(dataKeysMap, data);
            setCsvArray(newData);
        }
        return ({ newData, invalidHeaders });
    };
    const parseData = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const wb = read(arrayBuffer, { type: "buffer" })
                const wsName = wb.SheetNames[0];
                const ws = wb.Sheets[wsName]
                const data = utils.sheet_to_json(ws)
                resolve(data)
            }
            reader.onerror = (err) => {
                reject(err)
            }
        })
    }
    const handleFileRead = async () => {
        setCsvArray(null);
        setCsvErrors([]);
        setHasErrors(false);
        const file = getValues()['bulkUploadFile']
        if (!file) return setError('bulkUploadFile', { type: 'required', message: "File is required" })
        if (file[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file[0].type !== "application/vnd.ms-excel") return setError('bulkUploadFile', { type: 'format', message: "Invalid file format. Accepted format is .xlsx" })
        const data = await parseData(file[0])
        const validatedData = validateFieldNames(data)
        const res = await onValidate({ newCsv: validatedData.newData, invalidHeaders: validatedData.invalidHeaders })
    }

    return (
        <>
            <div className=' w-fit  flex flex-col' >
                <FileInput
                    fileInputWidth="w-53.5"
                    fileInputHeight="h-25 "
                    setValue={setValue}
                    error={errors.bulkUploadFile}
                    unregister={unregister}
                    onDelete={onCancel}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    name="bulkUploadFile"
                    register={register}
                    watch={watch}
                />
                <Button
                    variant="primaryBtn"
                    btnClass="text-sm font-normal  py-3 px-8 mt-5"
                    onClick={() => handleFileRead()}
                    buttonRef={validateButtonRef}
                >
                    Validate
                </Button>
                <div className=' pb-5'>
                    {(csvArray) && (
                        (hasErrors
                            ? (<label className="font text-md text-red-800 ">
                                {record} records need correction. </label>)
                            : (<label className="font text-md "> All records are valid. </label>)
                        ))}
                </div>



            </div>
        </>
    );
};

export default XLSXComponent;
