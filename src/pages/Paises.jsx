import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";

function Paises() {
  const [listaPaises, setListaPaises] = useState([]);
  const [codigoPais, setCodigoPais] = useState("");
  const [pais, setPais] = useState("");
  const [capital, setCapital] = useState("");
  const [area, setArea] = useState(0);
  const [poblacion, setPoblacion] = useState(0);
  const [continente, setContinente] = useState("");

  useEffect(() => {
    leerServicio();
  }, []);
  const leerServicio = () => {
    const rutaServicio = API_URL + "paises.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaPaises(data); //se actualiza el estado de clientes
      });
  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Codigo Pais</th>
            <th scope="col">Pais</th>
            <th scope="col">Capital</th>
            <th scope="col">Area</th>
            <th scope="col">Poblacion</th>
            <th scope="col">Continente</th>
          </tr>
        </thead>
        <tbody>
          {listaPaises.map((item) => (
            <tr key={item.idpais}>
              <td>{item.idpais}</td>
              <td>{item.codpais}</td>
              <td>{item.pais}</td>
              <td>{item.capital}</td>
              <td>{item.area}</td>
              <td>{item.poblacion}</td>
              <td>{item.continente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const insertarPais = (event) => {
    event.preventDefault(); //evita que se recargue la pagina
    console.log(codigoPais, pais, capital, area, poblacion, continente);
    const rutaServicio = API_URL + "paisesinsert.php";
    const formData = new FormData();
    formData.append("codpais", codigoPais);
    formData.append("pais", pais);
    formData.append("capital", capital);
    formData.append("area", area);
    formData.append("poblacion", poblacion);
    formData.append("continente", continente);
    
    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        leerServicio();
        document.querySelector("#modalInsert .btn-close").click();
        setCodigoPais("");
        setPais("");
        setCapital("");
        setArea(0);
        setPoblacion(0);
        setContinente("");
      });
  };
  const drawInsertModal= () => {
    return (
      <div
        className="modal fade"
        id="modalInsert"
        tabIndex={-1}
        aria-labelledby="modalInserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
                Nuevo Pais
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
            <form onSubmit={(event) => insertarPais(event)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Codigo Pais"
                required
                minLength={1}
                value={codigoPais}
                onChange={(event) => setCodigoPais(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pais"
                required
                minLength={2}
                value={pais}
                onChange={(event) => setPais(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Capital"
                required
                minLength={2}
                value={capital}
                onChange={(event) => setCapital(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Area"
                required
                minLength={2}
                value={area}
                onChange={(event) => setArea(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Poblacion"
                required
                minLength={2}
                value={poblacion}
                onChange={(event) => setPoblacion(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Continente"
                required
                minLength={1}
                value={continente}
                onChange={(event) => setContinente(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                Guardar
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <PageHeader titulo="Paises" />
      <section className="padded">
        <div className="container">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalInsert"
          >
            Nuevo Pais
          </button>
          {drawTable()}
          {drawInsertModal()}
        </div>
      </section>
    </>
  );
}

export default Paises;
