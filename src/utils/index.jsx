export const API_URL = "https://servicios.campus.pe/";

export const agregarCarrito = (item, cantidadProducto) => {
  item.cantidad = cantidadProducto;
  console.log(item);
  let carrito = [];
  if (sessionStorage.getItem("carritocompras")) {
    carrito = JSON.parse(sessionStorage.getItem("carritocompras")); //parse convierte un string a objeto
    let index = -1;
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].idproducto === item.idproducto) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      carrito.push(item);
    } else {
      carrito[index].cantidad += cantidadProducto;
    }
  } else {
    carrito.push(item);
  }

  sessionStorage.setItem("carritocompras", JSON.stringify(carrito)); //stringify convierte un objeto a string
  //setitem guarda datos en el sessionStorage
};

export const agregarProveedor = (item) => {
  console.log(item);
  let proveedores = [];
  if (sessionStorage.getItem("listaProveedores")) {
    proveedores = JSON.parse(sessionStorage.getItem("listaProveedores")); //parse convierte un string a objeto
  }
  proveedores.push(item);
  sessionStorage.setItem("listaProveedores", JSON.stringify(proveedores));
}
