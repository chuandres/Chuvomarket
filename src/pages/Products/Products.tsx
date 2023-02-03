import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import {Navigate} from 'react-router-dom';
import {
  faMagnifyingGlass,
  faCartPlus,
  faRetweet,
  faList,
  faChartLine,
  faTicket,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
export const Products = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState(false);

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    costodolar: "",
    estado: 1,
    ganancia: "",
    almacen: "SIN ASIGNAR",
  });

  function handleChange(e:any) {
    const { name, value } = e.target;
    setProducto({...producto, [name]: value});
  };

  function handleSubmit(e:any) {
    e.preventDefault();
    const datosJSON = JSON.stringify(producto);
    const exitoso = fetch(`http://localhost:80/react-bodega-app/src/php/agregar_producto.php`, {
        method: "POST",
        body: datosJSON,
      }).then((response) => {
        // console.log("ESTOY PASANDO", response.json());
        if(response.ok){
          setState(true);
          handleClose();
          return <Navigate to="/" />
        }
      });
  }

  return (
    <>
      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                autoFocus
                onChange={handleChange}
                name='nombre'
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="costodolar"
            >
              <Form.Label>Valor del Dolar Hoy:</Form.Label>
              <Form.Control
                type="text"
                placeholder=".."
                autoFocus
                onChange={handleChange}
                name='costodolar'
              />
              {/* <Form.Control as="textarea" rows={3} /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="precio">
              <Form.Label>Precio del Producto en Bs</Form.Label>
              <Form.Control
                type="text"
                placeholder=".."
                autoFocus
                onChange={handleChange}
                name='precio'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ganancia">
              <Form.Label>Ganancia del producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="%"
                autoFocus
                onChange={handleChange}
                name='ganancia'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Agregar Producto
          </Button>
        </Modal.Footer>
      </Modal>
      {/* PANEL PRINCIPAL */}
      <Container fluid>
        <div className="ActionPanel">
          <div className="ActionPanelContent">
            <Row>
              <Col className="">
                <div className="reportsContainer">
                  <Button variant="warning fs-3">
                    <FontAwesomeIcon icon={faDollar} /> Dolar Hoy:
                  </Button>{" "}
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder=".." style={{height: 56}}/>
                  </Form.Group>
                  <Button variant="secondary fs-3" disabled>
                    <FontAwesomeIcon icon={faList} /> Agotados
                  </Button>{" "}
                  <Button variant="secondary fs-3" disabled>
                    <FontAwesomeIcon icon={faChartLine} /> Reportes
                  </Button>{" "}
                  <Button variant="warning fs-3" disabled>
                    <FontAwesomeIcon icon={faTicket} /> Agotados
                  </Button>{" "}
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder=".." style={{height: 56}} disabled />
                  </Form.Group>
                </div>
              </Col>
              <Col className="bg-danger">2 of 2</Col>
            </Row>
            <Row>
              <Col className="ActionBtnsContainer">
                <Button variant="success fs-3" onClick={handleShow}>
                  <FontAwesomeIcon icon={faCartPlus} /> Añadir
                </Button>{" "}
                <Button variant="primary fs-3">
                  <FontAwesomeIcon icon={faMagnifyingGlass} /> Buscar
                </Button>{" "}
                <Button variant="info fs-3">
                  <FontAwesomeIcon icon={faRetweet} /> Actualizar
                </Button>{" "}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};
