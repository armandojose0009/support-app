import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AssignModal = ({ show, onHide, onAssign, employees, support }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  useEffect(() => {
    if (support && support.worker) {
      setSelectedEmployee(support.worker);
    } else {
      setSelectedEmployee('');
    }
    if (support && support.DateTime) {
      setSelectedDateTime(new Date(support.DateTime));
    } else {
      setSelectedDateTime(new Date());
    }
  }, [support]);

  const handleAssign = () => {
    onAssign(selectedEmployee, selectedDateTime);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Support</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {support && (
          <p>
            <strong>Assigning support:</strong> {support.title}
            <br/>
            <br/>
            <strong>Client description:</strong> {support.clientDescription}
          </p>
        )}
        <Form>
          <Form.Group controlId="formEmployee">
            <Form.Label>Select Employee</Form.Label>
            <Form.Control
              as="select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              required
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} - {employee.email}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDateTime">
            <Form.Label>Select Date and Time</Form.Label>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAssign}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignModal;
