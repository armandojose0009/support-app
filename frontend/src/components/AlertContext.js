import React, { createContext, useState, useContext } from 'react';
import AlertComponent from './AlertComponent';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, variant = 'danger') => {
    const id = Date.now();
    setAlerts(prevAlerts => [...prevAlerts, { id, message, variant }]);
  };

  const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
        {alerts.map(alert => (
          <AlertComponent
            key={alert.id}
            message={alert.message}
            variant={alert.variant}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
