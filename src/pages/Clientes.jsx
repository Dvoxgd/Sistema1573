import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";

function Clientes() {
  const [listaClientes, setListaClientes] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);
  const leerServicio = () => {
    const rutaServicio = API_URL + "servicioclientes.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaClientes(data); //se actualiza el estado de clientes
      });
  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Empresa</th>
            <th scope="col">Nombres</th>
            <th scope="col">Cargo</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Pais</th>
            <th scope="col">Telefono</th>
            <th scope="col">Fax</th>
          </tr>
        </thead>
        <tbody>
          {listaClientes.map((item) => (
            <tr key={item.idcliente}>
              <td>{item.idcliente}</td>
              <td>{item.empresa}</td>
              <td>{item.nombres}</td>
              <td>{item.cargo}</td>
              <td>{item.ciudad}</td>
              <td>{item.pais}</td>
              <td>{item.telefono}</td>
              <td>{item.fax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <PageHeader titulo="Clientes" />
      <section className="padded">
        <div className="container">
          {drawTable()}
        </div>
      </section>
    </>
  );
}

export default Clientes;
