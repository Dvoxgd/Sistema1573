import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { API_URL } from "../utils";
import "./Directores.css";

function Directores() {
  //Hooks: useState, useEffect
  const [listaDirectores, setListaDirectores] = useState([]);
  const [iddirector, setIddirector] = useState("");
  const [nombres, setNombres] = useState("");
  const [peliculas, setPeliculas] = useState("");
  const [director, setDirector] = useState("");

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
                <i
                  className="bi bi-pencil"
                  title="Editar"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasUpdate"
                  onClick={() => seleccionarDirector(item)}
                />
              </td>
              <td>
                <i
                  className="bi bi-x-lg"
                  title="Eliminar"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEliminar"
                  onClick={() => seleccionarDirectorEliminar(item)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const seleccionarDirector = (item) => {
    console.log(item);
    setIddirector(item.iddirector);
    setNombres(item.nombres);
    setPeliculas(item.peliculas);
  };
  const seleccionarDirectorEliminar = (item) => {
    console.log(item);
    setDirector(item.iddirector);
    setNombres(item.nombres);
  };

  const insertarDirector = (event) => {
    event.preventDefault(); //evita que se recargue la pagina
    console.log(nombres, peliculas);
    const rutaServicio = API_URL + "directoresinsert.php";
    const formData = new FormData();
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);
    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        leerServicio();
        document.querySelector("#offcanvasInsert .btn-close").click();
        setNombres("");
        setPeliculas("");
      });
  };
  const eliminarDirector = (event) => {
    event.preventDefault(); //evita que se recargue la pagina
    console.log(director);
    const rutaServicio = API_URL + "directoresdelete.php";
    const formData = new FormData();
    formData.append("iddirector", director);
    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        leerServicio();
        document.querySelector("#modalEliminar .btn-close").click();
      });
  };

  const drawEliminarModal = () => {
    return (
      <div
        className="modal fade"
        id="modalEliminar"
        tabIndex={-1}
        aria-labelledby="modalEliminarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
                ¿Está seguro que desea eliminar el director {nombres}?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={(event) => eliminarDirector(event)} className="form-control">              
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const drawInsertOffcanvas = () => {
    return (
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasInsert"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Nuevo Director
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(event) => insertarDirector(event)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombres"
                required
                minLength={2}
                value={nombres}
                onChange={(event) => setNombres(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Peliculas"
                required
                minLength={3}
                value={peliculas}
                onChange={(event) => setPeliculas(event.target.value)}
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
    );
  };

  const updateDirector = (event) => {
    event.preventDefault(); //evita que se recargue la pagina
    console.log(nombres, peliculas);
    const rutaServicio = API_URL + "directoresupdate.php";
    const formData = new FormData();
    formData.append("iddirector", iddirector);
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);
    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        leerServicio();
        document.querySelector("#offcanvasUpdate .btn-close").click();
        setIddirector("");
        setNombres("");
        setPeliculas("");
      });
  };

  const drawUpdateOffcanvas = () => {
    return (
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasUpdate"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Actualizar Director
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <form onSubmit={(event) => updateDirector(event)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                readOnly
                value={iddirector}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombres"
                required
                minLength={2}
                value={nombres}
                onChange={(event) => setNombres(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Peliculas"
                required
                minLength={3}
                value={peliculas}
                onChange={(event) => setPeliculas(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageHeader titulo="Directores" />
      <section className="padded" id="directores">
        <div className="container">
          <button
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasInsert"
          >
            Nuevo Director
          </button>
          {drawTable()}
        </div>
      </section>
      {drawInsertOffcanvas()}
      {drawUpdateOffcanvas()}
      {drawEliminarModal()}
    </>
  );
}

export default Directores;
