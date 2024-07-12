import React, { useState, useCallback, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import DataTable from './DataTable';
import { getSupports, getEmployees, createSupport, updateSupport } from './../api';
import { useAlert } from './AlertContext';
import DeactivateModal from './DeactivateModal';
import AssignModal from './AssignModal';
import SupportModal from './SupportModal';
import SupportDetailModal from './SupportDetailModal';

const SupportPage = () => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSupportDetailModal, setShowSupportDetailModal] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { addAlert } = useAlert();

  const [tableData, setTableData] = useState({
    data: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    sortField: 'DateTime',
    sortOrder: 'desc'
  });

  const fetchSupports = useCallback(async (
    page = tableData.page, 
    sizePerPage = tableData.sizePerPage, 
    sortField = tableData.sortField, 
    sortOrder = tableData.sortOrder, 
    searchText = ''
  ) => {
    try {
      const response = await getSupports(page, sizePerPage, sortField, sortOrder, searchText, addAlert);
      setTableData(prevState => ({
        ...prevState,
        data: response.data.supports,
        page: response.data.page,
        totalSize: response.data.totalSize,
        sizePerPage: response.data.sizePerPage,
        sortField,
        sortOrder
      }));
    } catch (error) {
      console.error('Error fetching supports:', error);
      setTableData(prevState => ({ ...prevState, data: [], page: 1, totalSize: 0, sizePerPage: 10 }));
    }
  }, [tableData.page, tableData.sizePerPage, tableData.sortField, tableData.sortOrder, addAlert]);

  useEffect(() => {
    fetchSupports();
  }, [fetchSupports, refreshKey]);

  const refreshTable = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(1, 1000, 'lastName', 'asc', '', addAlert);
      setEmployees(response.data.employees.filter(employee => employee.isActive));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeactivate = async (comment) => {
    try {
      await updateSupport(selectedSupport._id, { ...selectedSupport, isActive: false, comment }, addAlert);
      setShowDeactivateModal(false);
      refreshTable();
    } catch (error) {
      console.error('Error deactivating support:', error);
    }
  };

  const handleAssign = async (employeeId, dateTime) => {
    try {
      selectedSupport.client = selectedSupport.client._id;
      await updateSupport(selectedSupport._id, { ...selectedSupport, employee: employeeId, DateTime: dateTime }, addAlert);
      setShowAssignModal(false);
      refreshTable();
    } catch (error) {
      console.error('Error assigning support:', error);
    }
  };

  const handleSaveSupport = async (supportData) => {
    try {
      if (supportData._id) {
        await updateSupport(supportData._id, supportData, addAlert);
      } else {
        await createSupport(supportData, addAlert);
      }
      setShowSupportModal(false);
      refreshTable();
    } catch (error) {
      console.error('Error saving support:', error);
    }
  };

  const StatusFormatter = (cell, row) => {
    if (cell) {
      return <div className='text-center'><span className="badge bg-success">Active</span></div>;
    } else {
      return <div className='text-center'><span className="badge bg-danger">Inactive</span></div>;
    }
  };

  const ClientFormatter = (cell, row) => {
    if (row.client) {
      return `${row.client.firstName} ${row.client.lastName}`;
    }
    return 'N/A';
  };
  const ClientEmailFormatter = (cell, row) => {
    if (row.client) {
      return row.client.email;
    }
    return 'N/A';
  };

  const EmployeeFormatter = (cell, row) => {
    if (row.employee) {
      return `${row.employee.firstName} ${row.employee.lastName}`;
    }
    return 'Not Assigned';
  };

  const EmployeeEmailFormatter = (cell, row) => {
    if (row.employee) {
      return row.employee.email;
    }
    return 'Not Assigned';
  };

  const columns = [
    { dataField: 'supportCode', text: 'Support Code', sort: true },
    { dataField: 'title', text: 'Title', sort: true },
    { 
      dataField: 'client',
      text: 'Client',
      formatter: ClientFormatter,
      sort: true,
      sortValue: (cell, row) => row.client ? `${row.client.lastName} ${row.client.firstName}` : ''
    },
    { 
      dataField: 'client',
      text: 'Client Email',
      formatter: ClientEmailFormatter,
      sort: true,
      sortValue: (cell, row) => row.client ? `${row.client.email}` : ''
    },
    { 
      dataField: 'employee',
      text: 'Employee',
      formatter: EmployeeFormatter,
      sort: true,
      sortValue: (cell, row) => row.employee ? `${row.employee.lastName} ${row.employee.firstName}` : ''
    },
    { 
      dataField: 'employee',
      text: 'Employee',
      formatter: EmployeeEmailFormatter,
      sort: true,
      sortValue: (cell, row) => row.employee ? `${row.employee.email}` : ''
    },
    { 
      dataField: 'isActive', 
      text: 'Status', 
      formatter: StatusFormatter,
      headerStyle: () => ({ width: '8%' }),
      sort: true
    },
    { 
      dataField: 'isCompleted', 
      text: 'Completed', 
      formatter: StatusFormatter, 
      sort: true,
      headerStyle: () => ({ width: '8%' }),
    },
    { 
      dataField: 'DateTime', 
      text: 'Date', 
      formatter: (cell) => new Date(cell).toLocaleString(),
      sort: true 
    }
  ];

  const actionButtons = [
    { 
      className: 'btn-info', 
      icon: 'bi-pencil',
      onClick: (row) => {
        setSelectedSupport(row);
        setShowSupportModal(true);
      }
    },
    { 
      className: 'btn-danger', 
      icon: 'bi-x-circle',
      onClick: (row) => { 
        setSelectedSupport(row);
        setShowDeactivateModal(true);
      }
    },
    { 
      className: 'btn-primary', 
      icon: 'bi-person-plus',
      onClick: (row) => { 
        setSelectedSupport(row);
        fetchEmployees();
        setShowAssignModal(true);
      }
    },
    { 
      className: 'btn-secondary', 
      icon: 'bi-eye',
      onClick: (row) => { 
        setSelectedSupport(row);
        setShowSupportDetailModal(true);
      }
    }
  ];

  return (
    <Container className="mt-12">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Supports</h2>
        <Button variant="primary" onClick={() => {
          setSelectedSupport(null);
          setShowSupportModal(true);
        }}>
          <i className="bi bi-plus-circle me-2"></i>New Support
        </Button>
      </div>
      <DataTable
        keyField="_id"
        columns={columns}
        data={tableData.data}
        page={tableData.page}
        sizePerPage={tableData.sizePerPage}
        totalSize={tableData.totalSize}
        defaultSorted={[{ dataField: 'DateTime', order: 'desc' }]}
        fetchData={fetchSupports}
        actionButtons={actionButtons}
        filterOptions={{ searchPlaceholder: '' }}
      />

      <DeactivateModal 
        show={showDeactivateModal}
        onHide={() => setShowDeactivateModal(false)}
        onDeactivate={handleDeactivate}
        support={selectedSupport}
      />

      <AssignModal 
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        onAssign={handleAssign}
        employees={employees}
        support={selectedSupport}
      />

      <SupportModal
        show={showSupportModal}
        onHide={() => setShowSupportModal(false)}
        onSave={handleSaveSupport}
        support={selectedSupport}
      />

      <SupportDetailModal
        show={showSupportDetailModal}
        onHide={() => setShowSupportDetailModal(false)}
        support={selectedSupport}
      />
    </Container>
  );
};

export default SupportPage;
