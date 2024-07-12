import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import DataTable from './DataTable';
import { getClients, updateClient, createClient, assignSupport, sendEmail } from './../api';
import ClientModal from './ClientModal';
import { textFilter } from 'react-bootstrap-table2-filter';
import { useAlert } from './AlertContext';

const ClientsPage = () => {
  const { addAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tableData, setTableData] = useState({
    data: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    sortField: 'lastName',
    sortOrder: 'asc'
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchClients = useCallback(async (
    page = tableData.page, 
    sizePerPage = tableData.sizePerPage, 
    sortField = tableData.sortField, 
    sortOrder = tableData.sortOrder, 
    searchText = ''
  ) => {
    try {
      const response = await getClients(page, sizePerPage, sortField, sortOrder, searchText, addAlert);
      setTableData(prevState => ({
        ...prevState,
        data: response.data.clients,
        page: response.data.page,
        totalSize: response.data.totalSize,
        sizePerPage: response.data.sizePerPage,
        sortField,
        sortOrder
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
      setTableData(prevState => ({ ...prevState, data: [], page: 1, totalSize: 0, sizePerPage: 10 }));
    }
  }, [tableData.page, tableData.sizePerPage, tableData.sortField, tableData.sortOrder, addAlert]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients, refreshKey]);

  const refreshTable = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleToggleStatus = async (clientId, client) => {
    client.isActive = !client.isActive;
    try {
      await updateClient(clientId, client,useAlert);
      refreshTable();
    } catch (error) {
      console.error('Error toggling client status:', error);
    }
  };

  const handleAssignSupport = async (clientId) => {
    try {
      await assignSupport(clientId,useAlert);
      refreshTable();
    } catch (error) {
      console.error('Error assigning support:', error);
    }
  };

  const handleSendEmail = async (clientId) => {
    try {
      await sendEmail(clientId, addAlert);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleShowModal = (client = null) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setSelectedClient(null);
    setShowModal(false);
  };

  const handleSave = async (client, setFormData) => {
    try {
      let response;
      if (client._id) {
        response = await updateClient(client._id, client,addAlert);
      } else {
        response = await createClient(client,addAlert);
      }

      if( !response.code ) {
        setFormData( {
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          email: ''
        })
        handleHideModal();
        refreshTable();
      }
    } catch (error) {
      console.error('Error saving client:', error);
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
    { dataField: '_id', text: 'ID', hidden: true },
    { dataField: 'firstName', text: 'First Name', sort: true, filter: textFilter({ placeholder: '' }) },
    { dataField: 'lastName', text: 'Last Name', sort: true, filter: textFilter({ placeholder: '' }) },
    { dataField: 'address', text: 'Address', sort: true, filter: textFilter({ placeholder: '' }) },
    { dataField: 'phoneNumber', text: 'Phone Number', sort: true, filter: textFilter({ placeholder: '' }) },
    { 
      dataField: 'isActive', 
      text: 'Status', 
      formatter: StatusFormatter,
    },
  ];

  const actionButtons = [
    { 
      icon: 'bi bi-pencil-fill', 
      className: 'btn-info', 
      onClick: (row) => handleShowModal(row) 
    },
    { 
      className: (row) => row.isActive ? 'btn-danger' : 'btn-success',
      onClick: (row) => handleToggleStatus(row._id, row),
      icon: (row) => row.isActive ? 'bi bi-x-circle' : 'bi bi-check-circle'
    },
    { 
      icon: 'bi bi-briefcase', 
      className: 'btn-warning', 
      onClick: (row) => handleAssignSupport(row._id) 
    },
    { 
      icon: 'bi bi-envelope',
      className: 'btn-primary ', 
      onClick: (row) => handleSendEmail(row._id),
    }

  ];

  return (
    <Container className="mt-4">
      <h2>Clients <Button variant="primary" onClick={() => handleShowModal()}><i class="bi bi-person-fill-add"></i></Button></h2>
      
      <DataTable
        key={refreshKey}
        keyField="_id"
        columns={columns}
        data={tableData.data}
        page={tableData.page}
        sizePerPage={tableData.sizePerPage}
        totalSize={tableData.totalSize}
        defaultSorted={[{ dataField: 'lastName', order: 'asc' }]}
        fetchData={fetchClients}
        filterOptions={{ searchPlaceholder: '' }}
        actionButtons={actionButtons}
      />
      <ClientModal show={showModal} onHide={handleHideModal} onSave={handleSave} client={selectedClient} />
    </Container>
  );
};

export default ClientsPage;
