import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const UpdateStatusModal = ({ show, onHide, onUpdate }) => {
  const [leadId, setLeadId] = useState('');
  const [status, setStatus] = useState('Contactado');
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:3001/update-status', {
        leadId,
        newStatus: status,
      });
      onUpdate();
      onHide(); 
      setLeadId('');
      setStatus('Contactado'); 
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        const errorMessage = error.response.data.map(err => err.message).join(', ');
        setError(errorMessage);
      } else {
        setError(error.response.data);
      }

      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Estado del Lead</Modal.Title>
      </Modal.Header>
      <Form onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formLeadId">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={leadId}
              onChange={e => setLeadId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Contactado">Contactado</option>
              <option value="Esperando respuesta">Esperando respuesta</option>
              <option value="En llamada">En llamada</option>
              <option value="Win">Win</option>
              <option value="Lose">Lose</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" block>
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateStatusModal;
