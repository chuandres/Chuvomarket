export const Listar_productos = () => {
    let productos:any = [];
    let fetchRes = fetch(
        "http://localhost:9081/react-bodega-app/src/php/obtener_productos.php");
        fetchRes.then(res =>
            res.json()).then(d => {
                 productos.push(d);
            })
       return productos;

}
