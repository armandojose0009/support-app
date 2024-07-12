import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const DeactivateModal = ({ show, onHide, onDeactivate }) => {
  const [comment, setComment] = useState('');

  const handleDeactivate = () => {
    onDeactivate(comment);
    setComment('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Deactivate Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={handleDeactivate}>
            Deactivate
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeactivateModal;
