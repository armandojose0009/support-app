import React, { useState, useCallback, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import EmployeeModal from './EmployeeModal';
import DataTable from './DataTable';
import { getEmployees, deleteEmployee, assignSupport, sendEmail, createEmployee, updateEmployee } from './../api';
import { useAlert } from './AlertContext';

const EmployeesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [tableData, setTableData] = useState({
    data: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    sortField: 'lastName',
    sortOrder: 'asc'
  });
  const { addAlert } = useAlert();

  const fetchEmployees = useCallback(async (
    page = tableData.page, 
    sizePerPage = tableData.sizePerPage, 
    sortField = tableData.sortField, 
    sortOrder = tableData.sortOrder, 
    searchText = ''
  ) => {
    try {
      const response = await getEmployees(page, sizePerPage, sortField, sortOrder, searchText, addAlert);
      setTableData(prevState => ({
        ...prevState,
        data: response.data.employees,
        page: response.data.page,
        totalSize: response.data.totalSize,
        sizePerPage: response.data.sizePerPage,
        sortField,
        sortOrder
      }));
    } catch (error) {
      console.error('Error fetching employees:', error);
      setTableData(prevState => ({ ...prevState, data: [], page: 1, totalSize: 0, sizePerPage: 10 }));
    }
}, [tableData.page, tableData.sizePerPage, tableData.sortField, tableData.sortOrder, addAlert]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refreshKey]);

  const refreshTable = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleDelete = async (employee) => {
    try {
      await deleteEmployee(employee._id, addAlert);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleActivateToggle = async (employee) => {
    try {
      employee.isActive = !employee.isActive;
      await updateEmployee(employee._id, employee,addAlert);
      fetchEmployees();
      refreshTable();
    } catch (error) {
      console.error('Error toggling employee status:', error);
    }
  };

  const handleAssignSupport = async (employee) => {
    try {
      await assignSupport(employee._id, addAlert);
      fetchEmployees();
    } catch (error) {
      console.error('Error assigning support:', error);
    }
  };

  const handleSendEmail = async (employee) => {
    try {
      await sendEmail(employee._id, addAlert);
      addAlert('Email sent successfully', 'success');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleShowModal = (employee = null) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  const handleSave = async (employee, setFormData) => {
    try {
      let response;
      if (employee._id) {
        response = await updateEmployee(employee._id, employee,addAlert);
      } else {
        response = await createEmployee(employee,addAlert);
      } handleHideModal();

    if( !response.code ) {
      fetchEmployees();
      handleHideModal();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      });
    }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const StatusFormatter = (cell, row) => {
    if (cell) {
      return <span className="badge bg-success">Active</span>;
    } else {
      return <span className="badge bg-danger">Inactive</span>;
    }
  };

  const columns = [
    { dataField: 'firstName', text: 'First Name', sort: true },
    { dataField: 'lastName', text: 'Last Name', sort: true },
    { dataField: 'email', text: 'Email', sort: true },
    { dataField: 'phoneNumber', text: 'Phone Number', sort: true },
    { 
      dataField: 'isActive', 
      text: 'Status', 
      formatter: StatusFormatter,
    },
  ];

  const actionButtons = [
    { 
      className: 'btn-info', 
      icon: 'bi-pencil',
      onClick: (row) => handleShowModal(row) 
    },
    { 
      className: (row) => row.isActive ? 'btn-danger' : 'btn-success',
      icon: (row) => row.isActive ? 'bi bi-x-circle' : 'bi bi-check-circle',
      onClick: handleActivateToggle
    },
    { 
      className: 'btn-warning', 
      icon: 'bi-person-plus',
      onClick: handleAssignSupport 
    },
    { 
      className: 'btn-primary', 
      icon: 'bi-envelope',
      onClick: handleSendEmail 
    },
    { 
      className: 'btn-danger', 
      icon: 'bi-trash',
      onClick: handleDelete 
    }
  ];

  return (
    <Container className="mt-4">
      <h2>Employees<Button variant="primary" onClick={() => handleShowModal()}><i class="bi bi-person-fill-add"></i></Button></h2>
      <DataTable
        keyField="_id"
        columns={columns}
        data={tableData.data}
        page={tableData.page}
        sizePerPage={tableData.sizePerPage}
        totalSize={tableData.totalSize}
        defaultSorted={[{ dataField: 'lastName', order: 'asc' }]}
        fetchData={fetchEmployees}
        actionButtons={actionButtons}
        filterOptions={{ searchPlaceholder: '' }}
      />
      <EmployeeModal show={showModal} onHide={handleHideModal} onSave={handleSave} employee={selectedEmployee} />
    </Container>
  );
};

export default EmployeesPage;
