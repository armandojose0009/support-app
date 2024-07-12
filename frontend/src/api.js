import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const handleError = (error, addAlert) => {
  if (axios.isCancel(error)) {
    console.log('Request canceled', error.message);
    return { error: 'canceled' };
  }
  const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
  if (addAlert) {
    addAlert(errorMessage, 'danger');
  }
  return { error };
};

const makeRequest = async (requestPromise, addAlert) => {
  try {
    const response = await requestPromise;
    return { data: response.data };
  } catch (error) {
    return handleError(error, addAlert);
  }
};

export const getEmployees = (addAlert) => 
  makeRequest(axios.get(`${API_URL}/employees`), addAlert);

export const deleteEmployee = (workerId, addAlert) => 
  makeRequest(axios.delete(`${API_URL}/employees/${workerId}`), addAlert);

export const toggleEmployeeStatus = (workerId, status, addAlert) => 
  makeRequest(axios.put(`${API_URL}/employees/${workerId}/status`, { status }), addAlert);

export const assignSupport = (supportId, employeeId, addAlert) => 
  makeRequest(axios.post(`${API_URL}/supports/${supportId}/assign`, { employeeId }), addAlert);

export const sendEmail = (workerId, addAlert) => 
  makeRequest(axios.post(`${API_URL}/employees/${workerId}/sendEmail`), addAlert);

export const createEmployee = (employee, addAlert) => 
  makeRequest(axios.post(`${API_URL}/employees`, employee), addAlert);

export const updateEmployee = (employeeId, employee, addAlert) => 
  makeRequest(axios.put(`${API_URL}/employees/${employeeId}`, employee), addAlert);

export const getClients = (page, sizePerPage, sortField, sortOrder, searchText, addAlert) => 
  makeRequest(axios.get(`${API_URL}/clients`, {
    params: { page, sizePerPage, sortField, sortOrder, searchText }
  }), addAlert);

export const deleteClient = (clientId, addAlert) => 
  makeRequest(axios.delete(`${API_URL}/clients/${clientId}`), addAlert);

export const createClient = (client, addAlert) => 
  makeRequest(axios.post(`${API_URL}/clients`, client), addAlert);

export const updateClient = (clientId, client, addAlert) => 
  makeRequest(axios.put(`${API_URL}/clients/${clientId}`, client), addAlert);

export const toggleClientStatus = (clientId, status, addAlert) => 
  makeRequest(axios.put(`${API_URL}/clients/${clientId}/toggle-status`, { isActive: status }), addAlert);

export const getSupports = (page, sizePerPage, sortField, sortOrder, searchText, addAlert) => 
  makeRequest(axios.get(`${API_URL}/supports`, {
    params: { page, sizePerPage, sortField, sortOrder, searchText }
  }), addAlert);

export const createSupport = (support, addAlert) => 
  makeRequest(axios.post(`${API_URL}/supports`, support), addAlert);

export const updateSupport = (supportId, support, addAlert) => 
  makeRequest(axios.put(`${API_URL}/supports/${supportId}`, support), addAlert);

export const getSupportById = (supportId, addAlert) => 
  makeRequest(axios.get(`${API_URL}/supports/${supportId}`), addAlert);

export const deleteSupport = (supportId, addAlert) => 
  makeRequest(axios.delete(`${API_URL}/supports/${supportId}`), addAlert);

export const getLogs = (page, sizePerPage, sortField, sortOrder, searchText, addAlert, cancelToken) => 
  makeRequest(axios.get(`${API_URL}/logs`, {
    params: { page, sizePerPage, sortField, sortOrder, searchText },
    cancelToken: cancelToken
  }), addAlert);

getLogs.cancelToken = () => axios.CancelToken.source();

export const getLogById = (logId, addAlert) => 
  makeRequest(axios.get(`${API_URL}/logs/${logId}`), addAlert);

export const createLog = (log, addAlert) => 
  makeRequest(axios.post(`${API_URL}/logs`, log), addAlert);

export const updateLog = (logId, log, addAlert) => 
  makeRequest(axios.put(`${API_URL}/logs/${logId}`, log), addAlert);

export const deleteLog = (logId, addAlert) => 
  makeRequest(axios.delete(`${API_URL}/logs/${logId}`), addAlert);