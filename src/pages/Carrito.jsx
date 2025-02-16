import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import "./Carrito.css";

function Carrito() {
  const [listaItems, setListaItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    leerDatosCarrito();
  }, []);

  const leerDatosCarrito = () => {
    const datosCarritos = JSON.parse(sessionStorage.getItem("carritocompras"));
    //parse convierte un string a objeto
    setListaItems(datosCarritos);
    if (datosCarritos !== null && datosCarritos.length > 0) {
      calcularTotal(datosCarritos);
    }
  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Cantidad</th>
            <th className="text-end">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaItems !== null && listaItems.length > 0 ? (
            listaItems.map((item) => (
              <tr key={item.idproducto}>
                <td>{item.idproducto}</td>
                <td>{item.nombre}</td>
                <td className="text-end">{Number(item.precio).toFixed(2)}</td>
                <td className="text-end">
                  <input type="number" min="1" className="form-control text-end caja-cantidad" value={item.cantidad} onChange={(event)=> actualizarCantidad(item.idproducto, Number(event.target.value))}/>
                  </td>
                <td className="text-end">
                  {(item.precio * item.cantidad).toFixed(2)}
                </td>
                <td>
                  <i
                    className="bi bi-x-lg icono-eliminar"
                    title="Eliminar"
                    onClick={() => eliminarItem(item)}
                  />
                </td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay productos en el carrito</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  const actualizarCantidad = (id, cantidad) =>{
    const listaActualizada = listaItems.map(item => {
      if(item.idproducto === id){
        item.cantidad = cantidad
      }
      return item
    })
    setListaItems(listaActualizada);
    sessionStorage.setItem("carritocompras", JSON.stringify(listaActualizada));
    calcularTotal(listaActualizada)
  }
  const eliminarItem = (item) => {
    const listaActualizada = listaItems.filter(
      (i) => i.idproducto !== item.idproducto
    );
    setListaItems(listaActualizada);
    sessionStorage.setItem("carritocompras", JSON.stringify(listaActualizada));
    calcularTotal(listaActualizada)
  };
  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras");
    setListaItems([]);
    setTotal(0)
  };

  const calcularTotal = (datosC) => {
    let sumaTotal = datosC.reduce(
      (acumulador, item) => acumulador + (item.precio * item.cantidad),
      0
    );
    setTotal(sumaTotal);
  };

  return (
    <>
      <PageHeader titulo="Carrito" />
      <section className="padded">
        <div className="container">
          <div className="row">
            <div className="col-10">
              {drawTable()}
              <button
                className="btn btn-danger"
                onClick={() => vaciarCarrito()}
              >
                Vaciar Carrito
              </button>
            </div>
            <div className="col-lg-2">
              <div
                className="card border-dark mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">Total del Carrito</div>
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Total</th>
                        <td className="text-end">S/. {total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Carrito;
