import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

function Seleccionados() {
  const [listaProveedores, setListaProveedores] = useState([]);
  useEffect(() => {
    leerDatosProveedores();
  }, []);
  const leerDatosProveedores = () => {
    const datosProveedores = JSON.parse(
      sessionStorage.getItem("listaProveedores")
    );
    //parse convierte un string a objeto
    setListaProveedores(datosProveedores);
    console.log(datosProveedores);
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
          </tr>
        </thead>
        <tbody>
          {listaProveedores !== null && listaProveedores.length > 0 ? (
            listaProveedores.map((item) => (
              <tr key={item.idproveedor}>
                <td>{item.idproveedor}</td>
                <td>{item.nombreempresa}</td>
                <td>{item.nombrecontacto}</td>
                <td>{item.cargocontacto}</td>
                <td>{item.ciudad}</td>
                <td>{item.pais}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay proveedores en la lista</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const vaciarLista = () => {
    sessionStorage.removeItem("listaProveedores");
    setListaProveedores([]);
  };
  return (
    <>
      <PageHeader titulo="Seleccionados" />
      <section className="padded">
        <div className="container">
          {drawTable()}
          <button
                className="btn btn-danger"
                onClick={() => vaciarLista()}
              >
                Vaciar Lista
              </button>
        </div>
      </section>
    </>
  );
}

export default Seleccionados;
