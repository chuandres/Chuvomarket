import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartPlus,
  faRetweet,
  faList,
  faChartLine,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
export const Products = () => {
  return (
    <>
      <Container fluid>
        <div className="ActionPanel">
          <div className="ActionPanelContent">
            <Row>
              <Col className="">
                <div className="reportsContainer">
                  <Button variant="warning fs-3">
                    <FontAwesomeIcon icon={faTicket} /> Valor T.
                  </Button>{" "}
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Ticket" style={{height: 56}}/>
                  </Form.Group>
                  <Button variant="secondary fs-3">
                    <FontAwesomeIcon icon={faList} /> Agotados
                  </Button>{" "}
                  <Button variant="secondary fs-3">
                    <FontAwesomeIcon icon={faChartLine} /> Reportes
                  </Button>{" "}
                  <Button variant="warning fs-3">
                    <FontAwesomeIcon icon={faTicket} /> Agotados
                  </Button>{" "}
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Ticket" style={{height: 56}}/>
                  </Form.Group>
                </div>
              </Col>
              <Col className="bg-danger">2 of 2</Col>
            </Row>
            <Row>
              <Col className="ActionBtnsContainer">
                <Button variant="success fs-3">
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
      <Container fluid>
        <h1 className="display-2 text-center py-2">Productos</h1>
        <ProductsTable></ProductsTable>
      </Container>
    </>
  );
};
