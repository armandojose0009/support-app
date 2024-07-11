import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import UpdateStatusModal from './components/UpdateStatusModal';
import ChangeLog from './components/ChangeLog';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <h1>Interfaz para Actualizar Estados de Leads</h1>
      <br/>
      <UpdateStatusModal show={showModal} onHide={handleCloseModal} />

      <ChangeLog />
    </Container>
  );
}

export default App;
