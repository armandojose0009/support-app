import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SupportDetailModal = ({ show, onHide, support }) => {
  if (!support) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Support Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Support Code:</strong> {support.supportCode}</p>
        <p><strong>Title:</strong> {support.title}</p>
        <p><strong>Client:</strong> {support.client ? `${support.client.firstName} ${support.client.lastName}` : 'N/A'}</p>
        <p><strong>Client Email:</strong> {support.client ? support.client.email : 'N/A'}</p>
        <p><strong>Employee:</strong> {support.employee ? `${support.employee.firstName} ${support.employee.lastName}` : 'Not Assigned'}</p>
        <p><strong>Employee Email:</strong> {support.employee ? support.employee.email : 'Not Assigned'}</p>
        <p><strong>Status:</strong> {support.isActive ? 'Active' : 'Inactive'}</p>
        <p><strong>Completed:</strong> {support.isCompleted ? 'Yes' : 'No'}</p>
        <p><strong>Date:</strong> {new Date(support.DateTime).toLocaleString()}</p>
        <p><strong>Client Description:</strong> {support.clientDescription}</p>
        <p><strong>Employee Description:</strong> {support.employeeDescription ? support.employeeDescription : 'Not comment'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SupportDetailModal;
