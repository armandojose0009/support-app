import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { getClients } from '../api';

const SupportModal = ({ show, onHide, onSave, support }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (support) {
      setTitle(support.title);
      setDescription(support.description);
      setClientId(support.clientId);
    } else {
      setTitle('');
      setDescription('');
      setClientId('');
    }
  }, [support]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients(1, 1000, 'lastName', 'asc', '');
        if (response.data && response.data.clients) {
          setClients(response.data.clients);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSave = () => {
    onSave({
      _id: support ? support._id : undefined,
      title,
      description,
      clientId
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{support ? 'Edit Support' : 'New Support'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClient">
            <Form.Label>Client</Form.Label>
            <Form.Control
              as="select"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.firstName} {client.lastName} - {client.email}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SupportModal;
