import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";
import "./Directores.css";

function Directores() {
  //Hooks: useState, useEffect
  const [listaDirectores, setListaDirectores] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);
  const leerServicio = () => {
    const rutaServicio = API_URL + "directores.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaDirectores(data); //se actualiza el estado de proveedores
      });
  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Director</th>
            <th scope="col">Peliculas</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listaDirectores.map((item) => (
            <tr key={item.iddirector}>
              <td>{item.iddirector}</td>
              <td>{item.nombres}</td>
              <td>{item.peliculas}</td>
              <td>
                <i className="bi bi-pencil" title="Editar"/>
              </td>
              <td>
                <i className="bi bi-x-lg" title="Eliminar"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <PageHeader titulo="Directores" />
      <section className="padded" id="directores">
        <div className="container">
          <button className="btn btn-primary">Nuevo Director</button>
          {drawTable()}
        </div>
      </section>
    </>
  );
}

export default Directores;
