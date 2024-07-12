import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../css/MenuComponent.css';

const MenuComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#">Mi Aplicación</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          <Nav.Link as={Link} to="/support">Support</Nav.Link>
          <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
          <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
          <Nav.Link as={Link} to="/logs">Logs</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuComponent;
