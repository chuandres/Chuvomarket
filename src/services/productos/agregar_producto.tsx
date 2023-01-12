export const agregar_producto = (dataProd:any) => {
    const fecthResponse:any = fetch(`http://localhost:9081/react-bodega-app/src/php/agregar_producto.php`, {
        method: "POST",
        body: dataProd,
      }).then((response) => {
        return fecthResponse;
      });
 }
 
