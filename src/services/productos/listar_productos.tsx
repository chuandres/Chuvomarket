export const Listar_productos = () => {
    let productos:any = [];
    let fetchRes = fetch(
        "http://localhost:9081/react-bodega-app/src/php/obtener_productos.php");
        fetchRes.then(res =>
            res.json()).then(d => {
                // console.log(d, "SOY LA DATA")
                 productos.push(d);
                productos = d;
            })
            //  console.table(productos)
       return productos;
}
