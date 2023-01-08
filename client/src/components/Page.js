import { Breadcrumb, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Reports from './Reports';
import Invoices from './Invoices';
import BulkUploadForm from './UploadForm';
import { CloseCircleOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import Button from '../atoms/Button';
import { getPageName, isUploadButton } from '../util/util';
import CustomerForm from './Forms/CustomerForm';
import InvoiceForm from './Forms/InvoiceForm';
const { Title } = Typography;

const Page = ({ page }) => {

    const [reload, setReload] = useState(false);
    const [upload, setUpload] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editData, setEditData] = useState(null);
    useEffect(() => {
        setUpload(false);
        setShowAdd(false);
        setReload(false);
        setEditData(null);
    }, [page])
    return (
    <>
        <Breadcrumb style={{ margin: '16px 0'}} className="text-4xl font-bold">
            <Breadcrumb.Item>{''}</Breadcrumb.Item>
        </Breadcrumb>
        <div className='relative flex'>
            <Button 
                type="secondaryBtn"
                variant="secondaryBtn"
                btnClass="text-sm font-normal ml-2 px-3"
                onClick={() => setShowAdd(!showAdd)}
            >
                {!showAdd ? <PlusCircleOutlined className='mr-2'/> : <CloseCircleOutlined className='mr-2'/>}
                {!showAdd ? `Add ${getPageName(page)}` : 'Close Form' }
            </Button>
            { isUploadButton(page) && <Button 
                type="primaryBtn"
                variant="primaryBtn"
                btnClass="text-sm font-normal ml-2 px-2"
                onClick={() => setUpload(!upload)}
            >
                {!upload ? <UploadOutlined className='mr-2'/> : <CloseCircleOutlined className='mr-2'/>}
                { !upload ? 'Upload' : 'Close Upload'}
            </Button>
            }
        </div>
        
        
        { upload && <BulkUploadForm  page={page} setReload={setReload}/>}

        {showAdd && 
            <div className="site-layout-background p-5" id='form-div'>
                <Title level={3} style={{color: 'rgba(107, 114, 128, var(--tw-text-opacity))'}} className='border-b-2' >{editData ? 'Edit' : 'Add'} {getPageName(page)}</Title>
                { (page === 'customer' || page == 'vendor') && <CustomerForm 
                        data={editData}
                        callback={() => setReload(!reload)}
                        setEditData={setEditData}
                        page={page}
                    />
                }

                { (page === 'sales' || page == 'purchase') && <InvoiceForm 
                        data={editData}
                        callback={() => setReload(!reload)}
                        setEditData={setEditData}
                        page={page}
                    />
                }
            </div> 
        }     
        <div className='mt-5'>
            <Invoices
                page={page}
                reload={reload}
                setEditData={(value) => { 
                    setEditData(value);
                    setShowAdd(true);
                    setTimeout(() => document.getElementById('form-div').scrollIntoView(), 2);
                }}
                setReload={setReload}/>
        </div>
        
    </>   
    );
};

export default Page;