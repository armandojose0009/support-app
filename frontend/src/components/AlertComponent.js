import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertComponent = ({ message, variant, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) {
    return null;
  }

  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  );
};

export default AlertComponent;
