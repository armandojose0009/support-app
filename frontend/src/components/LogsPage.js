import React, { useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from './DataTable';
import { getLogs } from './../api';
import { useAlert } from './AlertContext';

const LogsPage = () => {
  const { addAlert } = useAlert();

  const [tableData, setTableData] = useState({
    data: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    sortField: 'createdAt',
    sortOrder: 'desc'
  });

  const fetchLogs = useCallback(async (
    page = tableData.page, 
    sizePerPage = tableData.sizePerPage, 
    sortField = tableData.sortField, 
    sortOrder = tableData.sortOrder, 
    searchText = ''
  ) => {
    try {
      const response = await getLogs(page, sizePerPage, sortField, sortOrder, searchText, addAlert);
      setTableData(prevState => ({
        ...prevState,
        data: response.data.logs,
        page: response.data.page,
        totalSize: response.data.totalSize,
        sizePerPage: response.data.sizePerPage,
        sortField,
        sortOrder
      }));
    } catch (error) {
      console.error('Error fetching logs:', error);
      setTableData(prevState => ({ ...prevState, data: [], page: 1, totalSize: 0, sizePerPage: 10 }));
    }
  }, [tableData.page, tableData.sizePerPage, tableData.sortField, tableData.sortOrder, addAlert]);

  const columns = [
    { 
      dataField: 'code', 
      text: 'Code', 
      sort: true 
    },
    { 
      dataField: 'title', 
      text: 'Title', 
      sort: true 
    },
    { 
      dataField: 'client_firstName', 
      text: 'Client First Name', 
      sort: true 
    },
    { 
      dataField: 'client_lastName', 
      text: 'Client Last Name', 
      sort: true 
    },
    { 
      dataField: 'employee_firstName', 
      text: 'Employee First Name', 
      sort: true 
    },
    { 
      dataField: 'employee_lastName', 
      text: 'Employee Last Name', 
      sort: true 
    },
    { 
      dataField: 'support_status', 
      text: 'Support Status', 
      sort: true 
    },
    { 
      dataField: 'support_completed', 
      text: 'Support Completed', 
      sort: true,
      formatter: (cell) => cell === 'true' ? 'Yes' : 'No'
    },
    { 
      dataField: 'date', 
      text: 'Date', 
      sort: true,
      formatter: (cell) => new Date(cell).toLocaleString()
    },
    { 
      dataField: 'clientDescription', 
      text: 'Client Description', 
      sort: true 
    },
    { 
      dataField: 'employeeDescription', 
      text: 'Employee Description', 
      sort: true 
    },
    { 
      dataField: 'createdAt', 
      text: 'Created At', 
      sort: true,
      formatter: (cell) => new Date(cell).toLocaleString()
    }
  ];
  

  return (
    <Container className="mt-4">
      <h2>Logs</h2>
      <DataTable
        keyField="_id"
        columns={columns}
        data={tableData.data}
        page={tableData.page}
        sizePerPage={tableData.sizePerPage}
        totalSize={tableData.totalSize}
        defaultSorted={[{ dataField: 'createdAt', order: 'desc' }]}
        fetchData={fetchLogs}
        actionButtons={[]}
        filterOptions={{ searchPlaceholder: 'Search logs...' }}
      />
    </Container>
  );
};

export default LogsPage;
