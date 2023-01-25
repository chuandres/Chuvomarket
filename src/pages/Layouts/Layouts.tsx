import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { clock } from "../../helpers/Clock";
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/Navbar";
import { Products } from "../Products/Products";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ProductsTable } from "../Products/ProductsTable/ProductsTable";
import { Form } from "react-bootstrap";

export const Layouts = () => {

  let clockDigit: string = clock();
  return (
    <>
    {/* NAVBAR */}

      <Navbar bg="dark" variant="dark" expand={false} className="mb-3">
        <Container fluid>
          <div className="text-white fs-1">
              {clockDigit}
          </div>
          <Navbar.Brand href="#" className="navbar-logo">
              Inversiones Guaragua Center C.A
            </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                Opciones
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ul>
                  <li>
                    <Link to={`contacts/1`}>Your Name</Link>
                  </li>
                  <li>
                    <Link to={`products`}>Productos</Link>
                  </li>
                  <li>
                    <Link to={`tickets`}>Tickets</Link>
                  </li>
                </ul>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-false`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div id="detail">
        <Products />
        <Outlet />
      {/* TABLA PRODUCTOS */}
      <Container fluid>
        <h1 className="display-2 text-center py-2">Productos</h1>
        <ProductsTable></ProductsTable>
      </Container>
      </div>
    </>
  );
};

export default Layouts;
