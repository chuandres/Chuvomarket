import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useNavigate 
} from "react-router-dom";

export const DeleteProduct = () => {

const { id } = useParams();
const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:80/react-bodega-app/src/php/eliminar_producto.php?id=${id}`)
    .then((response) => { 
      if(response.ok){
         navigate("/");
    }
      throw response;
    })
  },[]);


  return (<></>)
}

