import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from './components/MenuComponent';
import SupportPage from './components/SupportPage';
import ClientsPage from './components/ClientsPage';
import EmployeesPage from './components/EmployeesPage';
import LogsPage from './components/LogsPage';
import { AlertProvider } from './components/AlertContext';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';

const App = () => {
  return (
    <Router>
      <AlertProvider>
        <div className="app-container">
          <MenuComponent />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Navigate to="/support" />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/logs" element={<LogsPage />} />
            </Routes>
          </div>
        </div>
      </AlertProvider>
    </Router>
  );
};

export default App;
