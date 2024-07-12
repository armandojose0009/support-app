import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import UpdateStatusModal from './UpdateStatusModal';

const SupportPage = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    fetchLog(currentPage);
  }, [currentPage]);

  const fetchLog = async (page) => {
    try {
      const response = await axios.get('http://localhost:3001/change-log', {
        params: { page, limit: entriesPerPage }
      });

      setLogEntries(response.data.logs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error al obtener el registro de cambios:', error);
    }
  };

  const handleUpdate = () => {
    fetchLog(currentPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Registro de Cambios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Email</th>
            <th>Nuevo Estado</th>
          </tr>
        </thead>
        <tbody>
          {logEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry[0]}</td> 
              <td>{entry[1]}</td>
              <td>{entry[2]}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map(page => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>

      <UpdateStatusModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onUpdate={handleUpdate}
      />

      <Button variant="primary" onClick={() => setModalShow(true)}>Actualizar Estado</Button>
    </div>
  );
};

export default SupportPage;
