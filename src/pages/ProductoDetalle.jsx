import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { agregarCarrito, API_URL } from "../utils";

function ProductoDetalle() {
  const params = useParams();
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio =
      API_URL + "productos.php?idproducto=" + params.idproducto;
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductoSeleccionado(data[0]);
      });
  };
  console.log(params);
  return (
    <>
      <section className="padded">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  productoSeleccionado.imagengrande === null
                    ? API_URL + "imagenes/nofoto.jpg"
                    : API_URL + productoSeleccionado.imagengrande
                }
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2>{productoSeleccionado.nombre}</h2>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Stock</th>
                    <td>{productoSeleccionado.unidadesenexistencia}</td>
                  </tr>
                  <tr>
                    <th>Detalle</th>
                    <td>{productoSeleccionado.detalle}</td>
                  </tr>
                  <tr>
                    <th>Categoria</th>
                    <td>{productoSeleccionado.categoria}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td>
                      S/.{" "}
                      {productoSeleccionado.preciorebajado == "0"
                        ? Number(productoSeleccionado.precio).toFixed(2)
                        : Number(productoSeleccionado.preciorebajado).toFixed(
                            2
                          )}
                      <span className="precio-anterior">
                        {productoSeleccionado.preciorebajado == "0"
                          ? ""
                          : "S/. " +
                            Number(productoSeleccionado.precio).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Proveedor</th>
                    <td>{productoSeleccionado.proveedor}</td>
                  </tr>
                  <tr>
                    <th>Pais</th>
                    <td>{productoSeleccionado.pais}</td>
                  </tr>
                  <tr>
                    <th>Atencion al cliente</th>
                    <td>{productoSeleccionado.telefono}</td>
                  </tr>
                  <tr>
                    <th>Cantidad</th>
                    <td>
                      <input type="number" className="form-control" defaultValue="1" min={1} value={cantidad} onChange={(event) => setCantidad(event.target.value)}/>
                      <button className="btn btn-primary mt-2" onClick={() => agregarCarrito(productoSeleccionado, cantidad)}>Agregar al carrito</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>Descripcion</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: productoSeleccionado.descripcion,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductoDetalle;
