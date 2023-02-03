import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import { Column, useTable } from "react-table";
// import { productsSeeds } from "../../../helpers/productsSeeds";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ProductsOnTable } from "../../../types/Products/productsOnTable";
import { Listar_productos } from "../../../services/productos/listar_productos";
import { Link, useNavigate } from "react-router-dom";
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
      
      {/* <Link to={`/productos/editar/${producto.id}`} className="button is-danger">
        <FontAwesomeIcon icon={faTrash} />
      </Link> */}
      {/* <Link to={`/productos/eliminar/${props.producto.id}`} className="button is-danger">Eliminar</Link> */}
      

      <Button variant="primary">
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>{" "}

    </>
  );
  const isNotInStock = (
    <>
      <Button variant="success">
        <FontAwesomeIcon icon={faPowerOff} />
      </Button>{" "}

      {/* <Button variant="primary">
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>{" "} */}
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

  
  const HandleDelete = (e:any) => {

    setProductos(productos.filter(producto => producto.id !== e.target.value));
    // fetch(`http://localhost:80/react-bodega-app/src/php/eliminar_producto.php?id=${e.target.value}`)
    // .then((response) => { 
    //   if(response.ok){
    //   }
    //   throw response;
    // })
    
  };
  
  const [DolarDia, setvalorDolarDia] = useState();
  const [productos, setProductos] = useState<ProductsOnTable[]>([]);
  
      useEffect(() => {

        let fetchRes2 = fetch(
          "http://localhost:80/react-bodega-app/src/php/obtener_dolar_dia.php");
          fetchRes2.then(res =>
            res.json()).then(d => {
              return setvalorDolarDia(d);
            });
        
        let fetchRes = fetch(
          "http://localhost:80/react-bodega-app/src/php/obtener_productos.php");
          fetchRes.then(res =>
            res.json()).then(d => {
              return setProductos(d);
              
            });
          },[]);
  const data = React.useMemo((): ProductsOnTable[] => productos, [productos]);
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
                <Button variant="danger" value={props.row.original.id} onClick={HandleDelete}>
                 Borrar
                </Button>{" "}
            </>
          );
        },
      },
      {
        Header: "$",
        accessor: "costodolar",
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
        accessor: (row) => (row.ganancia * 100),
        Cell: ({ value: precio }: { value: any }) => {
          return <p className="text-start fw-bold">{precio}</p>;
        },
      },
      {
        Header: "Dolar",
        accessor: (row) => (row.ganancia * 100),
        Cell: ({ value: precio }: { value: any }) => {
          return <p className="text-start fw-bold">{precio}</p>;
        },
      },
      {
        Header: "Total",
        accessor: (row) => (row.ganancia * 100),
        Cell: ({ value: precio }: { value: any }) => {
          return <p className="text-start fw-bold">{precio}</p>;
        },
      },
    ],
    []
  );


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });



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
