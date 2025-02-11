import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

function Proveedores() {
  //Hooks: useState, useEffect
  const [listaProveedores, setListaProveedores] = useState([]); 

  useEffect(() => {
    leerServicio();
  }, []);
  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/proveedores.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaProveedores(data); //se actualiza el estado de proveedores
      });
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
          {listaProveedores.map((item) => (
            <tr key={item.idproveedor}>
              <td>{item.idproveedor}</td>
              <td>{item.nombreempresa}</td>
              <td>{item.nombrecontacto}</td>
              <td>{item.cargocontacto}</td>
              <td>{item.ciudad}</td>
              <td>{item.pais}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <PageHeader titulo="Proveedores"/>
      <section className="padded">
        <div className="container">
          {drawTable()}
        </div>
      </section>
    </>
  );
}

export default Proveedores;
