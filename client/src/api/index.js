import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAuth = () => {
  const auth = cookies.get("AUTH");
  return auth;
};

export const setAuth = (authObject) => {
  cookies.set("AUTH", JSON.stringify(authObject), { path: "/" });
  return authObject;
};

export const removeAuth = () => {
  cookies.remove("AUTH", { path: "/" });
  return;
};

const UrlParamsReplace = (url, params = {}, queryParams = {}) => {
  let urlWithPrefix = `${url}`;
  if (params) {
    Object.keys(params).forEach(
      (key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key]))
    );
  }
  const queryParamsWithoutNull = {};
  if (queryParams) {
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] !== undefined && queryParams[key] !== null) {
        queryParamsWithoutNull[key] = queryParams[key];
      }
    });
    const urlSearchParams = new URLSearchParams(queryParamsWithoutNull);
    urlWithPrefix += `?${urlSearchParams.toString()}`;
  }
  return urlWithPrefix;
};

const url = `http://${window.location.hostname}:8000`;
const API = axios.create({ baseURL : url});
const getHeaders = () => {
  const auth = getAuth();
  const headers = {
    "content-type": "application/json",
    "x-access-token": auth.token,
  };
  return headers;
}

export const userLogin = (mobileNumber) => API.post('/auth/mobile/sendOTP', { mobileNumber });
export const userSession = (mobileNumber, otp) => API.post('/auth/mobile/user', { mobileNumber, otp });

export const createSalesInBulk = (sales, type) => API.post('/sales', { sales, type }, { headers: getHeaders() });
export const createReceiptsInBulk = (receipts, type) => API.post('/bulk/receipts', { receipts, type }, { headers: getHeaders() });
export const createJournalsInBulk = (journals, type) => API.post('/bulk/journals', { journals, type }, { headers: getHeaders() });

export const getAllInvoices = (type, search, offset, limit, filters) => API.get(UrlParamsReplace(`/invoices`, {}, { type, search, offset, limit, filters }), { headers: getHeaders() });
export const getInvoiceById = (invoiceId) => API.get(`/invoices/${invoiceId}`, { headers: getHeaders() });
export const createInvoice = (invoice) => API.post("/invoices", invoice, { headers: getHeaders() });
export const updateInvoice = (id, invoice) => API.put(`/invoices/${id}`, invoice, { headers: getHeaders() });
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`, { headers: getHeaders() });

export const getReports = (type) => API.get(`/reports?type=${type}`, { headers: getHeaders() });
export const getFundsReports = (reportType, date, month, year) => API.get(UrlParamsReplace(`/fund-reports`, {}, { reportType, date, month, year }), { headers: getHeaders() });

export const getAllReceipts = (type, search, offset, limit, filters) => API.get(UrlParamsReplace(`/receipts`, {}, { type, search, offset, limit, filters }), { headers: getHeaders() });
export const deleteReceipt = (id) => API.delete(`/receipts/${id}`, { headers: getHeaders() });
export const createReceipt = (data) => API.post("/receipts", data, { headers: getHeaders() });
export const updateReceipt = (id, data) => API.put(`/receipts/${id}`, data, { headers: getHeaders() });

export const getCompanies = (search, offset, limit) => API.get(UrlParamsReplace(`/companies`, {}, { search, offset, limit }), { headers: getHeaders() });
export const createCompany = (company) => API.post("/companies", company, { headers: getHeaders() });
export const updateCompany = (id, company) => API.put(`/companies/${id}`, company, { headers: getHeaders() });
export const deleteCompany= (id) => API.delete(`/companies/${id}`, { headers: getHeaders() });

export const getCustomers = (type, search, offset, limit, filters) => API.get(UrlParamsReplace(`/customers`, {}, { type, search, offset, limit, filters }), { headers: getHeaders() });
export const createCustomer = (customer) => API.post("/customers", customer, { headers: getHeaders() });
export const updateCustomer = (id, customer) => API.put(`/customers/${id}`, customer, { headers: getHeaders() });
export const deleteCustomer= (id) => API.delete(`/customers/${id}`, { headers: getHeaders() });

export const getItems = (search, offset, limit) => API.get(UrlParamsReplace(`/items`, {}, { search, offset, limit }), { headers: getHeaders() });
export const createItem = (item) => API.post("/items", item, { headers: getHeaders() });
export const updateItem = (id, item) => API.put(`/items/${id}`, item, { headers: getHeaders() });
export const deleteItem= (id) => API.delete(`/items/${id}`, { headers: getHeaders() });

export const _get_ = (entityName) => (search, offset, limit) => API.get(UrlParamsReplace(`/${entityName}`, {}, { search, offset, limit }), { headers: getHeaders() });
export const _create_ = (entityName) => (item) => API.post(`/${entityName}`, item, { headers: getHeaders() });
export const _update_ = (entityName) => (id, item) => API.put(`/${entityName}/${id}`, item, { headers: getHeaders() });
export const _delete_ = (entityName) => (id) => API.delete(`/${entityName}/${id}`, { headers: getHeaders() });
