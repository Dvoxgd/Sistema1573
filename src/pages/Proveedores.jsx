import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { agregarProveedor, API_URL } from "../utils";
import "./Proveedores.css";

function Proveedores() {
  //Hooks: useState, useEffect
  const [listaProveedores, setListaProveedores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [filasPaginas, setFilasPaginas] = useState(5);
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState({});

  useEffect(() => {
    leerServicio();
  }, []);
  const leerServicio = async () => {
    const rutaServicio = API_URL + "proveedores.php";
    const response = await fetch(rutaServicio);
    const data = await response.json();
    console.log(data);
    setListaProveedores(data); //se actualiza el estado de proveedores
    setListaProveedoresFiltrados(data);
    setTotalPaginas(Math.ceil(data.length / filasPaginas));
  };

  const dibujarPaginacion = () => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => retroceder()}>
              Retroceder
            </a>
          </li>
          {dibujarNumeroPaginas()}
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => avanzar()}>
              Avanzar
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  const dibujarNumeroPaginas = () => {
    return (
      <>
        {[...Array(totalPaginas)].map((_, index) => (
          <li className={"page-item" + (index === paginaActual ? " active" : "")} key={index}>
            <a
              className="page-link"
              onClick={() => setPaginaActual(index)}
              href="#"
            >
              {index + 1}
            </a>
          </li>
        ))}
      </>
    );
  };

  const retroceder = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const avanzar = () => {
    if (paginaActual < totalPaginas - 1) {
      setPaginaActual(paginaActual + 1);
    }
  };
  const dibujarVistaRapidaModal = () => {
    return (
      <div
        className="modal fade"
        id="vistaRapidaModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id="exampleModalLabel">
                {proveedorSeleccionado.nombreempresa}
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                 <div className="col">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Nombre Contacto</th>
                        <td>{proveedorSeleccionado.nombrecontacto}</td>
                      </tr>
                      <tr>
                        <th>Cargo Contacto</th>
                        <td>{proveedorSeleccionado.cargocontacto}</td>
                      </tr>
                      <tr>
                        <th>Direccion</th>
                        <td>{proveedorSeleccionado.direccion}</td>
                      </tr>
                      <tr>
                        <th>Ciudad</th>
                        <td>{proveedorSeleccionado.ciudad}</td>
                      </tr>
                      <tr>
                        <th>Codigo Postal</th>
                        <td>{proveedorSeleccionado.codigopostal}</td>
                      </tr>
                      <tr>
                        <th>Pais</th>
                        <td>{proveedorSeleccionado.pais}</td>
                      </tr>
                      <tr>
                        <th>Telefono</th>
                        <td>{proveedorSeleccionado.telefono}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Empresa</th>
            <th scope="col">Contacto</th>
            <th scope="col">Cargo</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Pais</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listaProveedoresFiltrados
            .slice(
              paginaActual * filasPaginas,
              (paginaActual + 1) * filasPaginas
            )
            .map((item) => (
              <tr
                key={item.idproveedor}
                onClick={() => agregarProveedor(item)}
                id="proveedor-row"
                title="Agregar a seleccionados"
              >
                <td>{item.idproveedor}</td>
                <td>{item.nombreempresa}</td>
                <td>{item.nombrecontacto}</td>
                <td>{item.cargocontacto}</td>
                <td>{item.ciudad}</td>
                <td>{item.pais}</td>
                <td><i
                className="bi bi-eye icono-vista-rapida-proveedores"
                title="vista rapida"
                data-bs-toggle="modal"
                data-bs-target="#vistaRapidaModal"
                onClick={() => setProveedorSeleccionado(item)}
              ></i></td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const buscarTexto = (texto) => {
    setFiltro(texto);
    const listaFiltrada = listaProveedores.filter(
      (item) =>
        item.nombreempresa.toLowerCase().includes(texto.toLowerCase()) ||
        item.nombrecontacto.toLowerCase().includes(texto.toLowerCase()) ||
        item.cargocontacto.toLowerCase().includes(texto.toLowerCase()) ||
        item.ciudad.toLowerCase().includes(texto.toLowerCase()) ||
        item.pais.toLowerCase().includes(texto.toLowerCase())
    );
    setListaProveedoresFiltrados(listaFiltrada);
  };

  return (
    <>
      <PageHeader titulo="Proveedores" />
      <section className="padded">
        <div className="container">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese expresion a buscar"
              value={filtro}
              onChange={(event) => buscarTexto(event.target.value)}
            />
          </div>
          {dibujarPaginacion()}
          {drawTable()}
          {dibujarVistaRapidaModal()}
          {listaProveedoresFiltrados.length === 0
            ?<div className="alert alert-warning" >No se encontraron registros</div>
            : listaProveedoresFiltrados.length + " registros encontrados"
          }
        </div>
      </section>
    </>
  );
}

export default Proveedores;
