import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { Column, useTable } from "react-table";
import { productsSeeds } from "../../../helpers/productsSeeds";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ProductsOnTable } from "../../../types/Products/productsOnTable";
import { Listar_productos } from "../../../services/productos/listar_productos";
import {
  faPowerOff,
  faPenToSquare,
  faTrash,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";


const ProductOperation = (inStock: boolean, id: number) => {
  
  const isInStock = (
    <>
      <Button variant="danger">
        <FontAwesomeIcon icon={faPowerOff} />
      </Button>{" "}
      <Button variant="danger">
        <FontAwesomeIcon icon={faTrash} />
      </Button>{" "}
      <Button variant="primary">
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>{" "}
      <Button variant="primary">
        <FontAwesomeIcon icon={faRetweet} />
      </Button>{" "}
    </>
  );
  const isNotInStock = (
    <>
      <Button variant="success">
        <FontAwesomeIcon icon={faPowerOff} />
      </Button>{" "}
      <Button variant="danger">
        <FontAwesomeIcon icon={faTrash} />
      </Button>{" "}
      <Button variant="primary">
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>{" "}
      <Button variant="primary">
        <FontAwesomeIcon icon={faRetweet} />
      </Button>{" "}
    </>
  );
  return inStock ? isInStock : isNotInStock;
};
const ProductState = (productState: boolean) => {

  return (
    <div>
      {productState ? (
        <p className="text-success fw-bold">Disponible</p>
      ) : (
        <p className="text-danger fw-bold">Agotado</p>
      )}
    </div>
  );
};

export const ProductsTable = () => {
  const data = React.useMemo((): ProductsOnTable[] => productsSeeds, []);
  const columns: Column<ProductsOnTable>[] = React.useMemo(
    () => [
      {
        Header: "Operaciones".toUpperCase(),
        Cell: (props: any) => {
          return (
            <>
              {ProductOperation(
                props.row.original.estado,
                props.row.original.id
              )}
            </>
          );
        },
      },
      {
        Header: "$",
        accessor: "costoDolar",
      },
      {
        Header: "Bs.",
        accessor: "precio",
      },
      {
        Header: "nombre".toUpperCase(),
        accessor: (row) => row.nombre,
        Cell: ({ value: nombre }: { value: any }) => {
          return <p className="text-start fw-bold">{nombre}</p>;
        },
      },
      {
        Header: "V.$",
        accessor: "ganancia",
      },
      {
        Header: "%.$",
      },
      {
        Header: "Dolar",
      },
      {
        Header: "Total",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const [productos, setProductos] = useState();

  useEffect(() => {
    let productos = Listar_productos();
    setProductos(Listar_productos());
  },[]);
  
  console.log(productos);  
  

  return (
    <Table
      bordered
      hover
      {...getTableProps()}
      style={{ width: "100%", textAlign: "center" }}
    >
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props

                  <th {...column.getHeaderProps()} className="fs-3">
                    {
                      // Render the header

                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    if (cell.column.Header === "ESTADO") return false;
                    // Apply the cell props
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={
                          cell.row.original.estado === 1
                            ? "fs-3"
                            : "notInStockRow fs-3"
                        }
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
