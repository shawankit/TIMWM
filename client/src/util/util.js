import moment from 'moment';
import swal from 'sweetalert';
import { 
    _create_, _delete_, _get_, _update_, createCompany, createCustomer, createItem, createJournalsInBulk, createReceipt, createReceiptsInBulk, createSalesInBulk, deleteCompany, deleteCustomer, deleteInvoice, deleteItem,
    deleteReceipt, getAllInvoices, getAllReceipts, getCompanies, getCustomers, getItems, updateCompany, updateCustomer, updateItem, updateReceipt } from '../api';
import ReceiptData from '../data/ReceiptData';
import InvoiceData from '../data/InvoiceData';
import CustomerData from '../data/CustomerData';
import ItemData from '../data/ItemData';
import CompanyData from '../data/CompanyData';
import GroupData from '../data/GroupData';
import LedgerData from '../data/LedgerData';
import JournalData from '../data/JournalData';
import ReceiptFormData from '../data/ReceiptFormData';

export function sweetalertValidate(message) {
    swal({
        text: message,
        icon: "error",
        buttons:
        {
            cancel: {
                text: "Cancel",
                value: null,
                visible: false,
                className: "btn-sm btn-default",
                closeModal: true,
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn-sm btn-primary",
                closeModal: true
            }
        }
    });
}

export function sweetalertMessage(message) {
    swal({
        text: message,
        icon: "info",
        buttons:
        {
            cancel: {
                text: "Cancel",
                value: null,
                visible: false,
                className: "btn-sm btn-default",
                closeModal: true,
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn-sm btn-info",
                closeModal: true
            }
        }
    });
}

export function sweetalertSuccess(message) {
    swal({
		text: "test message",
		icon: "success",
		buttons:
		{
			cancel: {
				text: "Cancel",
				value: null,
				visible: false,
				className: "btn-sm btn-default",
				closeModal: true,
			},
			confirm: {
				text: "OK",
				value: true,
				visible: true,
				className: "btn-sm btn-info",
				closeModal: true
			}
		}
	});
}

export function sweetalertOkCancel(message, confirmFunction, cancelFunction) {
    swal(
        {
            text: message,
            icon: "warning",
            buttons:
            {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "btn-sm btn-default",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn-sm btn-danger",
                    closeModal: true
                }
            }
        }
    ).then(
        function (isConfirm) {
            if (isConfirm) {
                confirmFunction();
            } else {
                cancelFunction();
            }
        }

    );
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getDateWithTime = (date, [h, m, s]) => {
    const mo = moment(date);
    mo.set("hour", h);
    mo.set("minute", m);
    mo.set("second", s);
    return mo.toDate();
  };

export const getTitle = (column, page) => {
    if((page == 'purchase' || page == 'payments') && (column.name == 'customerName' || column.name == 'customerCode')){
       return column.label.replace('Customer','Vendor');
    }
    if(page == 'payments' && (column.name == 'receiptDate' || column.name == 'via')){
        return column.label.replace('Receipt','Payment');
    }

    if((page == 'vendor') && (column.name == 'name' || column.name == 'code')){
        return column.label.replace('Customer','Vendor');
     }

    return  column.label;
}

export const getPageName = (page) => {
    if(page === 'sales') return 'Sale Invoices';
    if(page === 'purchase') return 'Purchase Invoices';
    if(page === 'receipts') return 'Receipts';
    if(page === 'payments') return 'Payments';
    if(page === 'customer') return 'Customers';
    if(page === 'vendor') return 'Vendors';
    if(page === 'company') return 'Divisions';
    if(page === 'item') return 'Items';
    if(page === 'groups') return 'Groups';
    if(page === 'ledgers') return 'Ledgers';
    if(page === 'journals') return 'Journals';
}

export const mappingData = (page, data) => {
    const invoicePage = ['sales', 'purchase', 'receipts', 'payments']
    if(invoicePage.includes(page)){
        return  {
            ...data,
            invoiceNumber:  page == 'receipts' || page == 'payments' ? data.invoice?.invoiceNumber : data.invoiceNumber,
            customerName: data.customer?.name,
            customerCode: data.customer?.code,
            companyName: data.company.name,
            division: data.company.division
        }
    }
    else if(page === 'journals'){
        return {
            ...data,
            ledgerNames: data.journalLedgers.map((l) => l.ledger.name).toString()
        }
    }
    else{
        return { ...data };
    }
} 

export const getApiFn = (page) => {
    if(page == 'receipts' || page == 'payments'){ 
        return getAllReceipts;
    }
    if(page == 'purchase' || page == 'sales'){
        return getAllInvoices;
    }
    if(page == 'customer' || page == 'vendor'){
        return getCustomers;
    }
    if(page == 'company'){
        return (page, search, offset, limit, filters) => getCompanies(search, offset, limit);
    }

    if(page == 'item'){
        return (page, search, offset, limit, filters) => getItems(search, offset, limit);
    }
    return (page, search, offset, limit, filters) => _get_(page)(search, offset, limit);
}

export const getFieldData = (page, type) => {
    if(page == 'receipts' || page == 'payments'){ 
        return type == 'form_data' ? ReceiptFormData : ReceiptData;
    }
    if(page == 'purchase' || page == 'sales'){
        return InvoiceData;
    }
    if(page == 'customer' || page == 'vendor'){
        return CustomerData;
    }

    if(page == 'company'){
        return CompanyData;
    }

    if(page == 'item'){
        return ItemData;
    }

    if(page == 'groups'){
        return GroupData;
    }

    if(page == 'ledgers'){
        return LedgerData;
    }

    if(page == 'journals'){
        return JournalData;
    }
} 

export const isUploadButton = (page) => {
    if(page == 'receipts' || page == 'payments'){ 
        return true;
    }
    if(page == 'purchase' || page == 'sales' || page == 'journals'){
        return true;
    }
    return false;
}

export const deleteApiFn = (page) => {
    if(page == 'receipts' || page == 'payments'){ 
        return deleteReceipt;
    }
    if(page == 'purchase' || page == 'sales'){
        return deleteInvoice;
    }
    if(page == 'customer' || page == 'vendor'){
        return deleteCustomer;
    }

    if(page == 'company'){
        return deleteCompany;
    }

    if(page == 'item'){
        return deleteItem;
    }
    return _delete_(page);
}

export const createApiFn = (page) => {
    if(page == 'customer' || page == 'vendor'){
        return createCustomer;
    }

    if(page == 'receipts' || page == 'payments'){
        return createReceipt;
    }

    if(page == 'company'){
        return createCompany;
    }

    if(page == 'item'){
        return createItem;
    }
    return _create_(page);
}

export const updateApiFn = (page) => {
    if(page == 'customer' || page == 'vendor'){
        return updateCustomer;
    }

    if(page == 'receipts' || page == 'payments'){
        return updateReceipt;
    }

    if(page == 'company'){
        return updateCompany;
    }

    if(page == 'item'){
        return updateItem;
    }
    return _update_(page);
}

export const createBulkApiFn = (page) => {
    if(page == 'receipts' || page == 'payments'){
        return createReceiptsInBulk;
    }
    if(page == 'purchase' || page == 'sales'){
        return createSalesInBulk;
    }
    if(page == 'journals'){
        return createJournalsInBulk;
    }
}
