import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

function Empleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/empleados.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListaEmpleados(data); //se actualiza el estado de empleados
      });
  };

  const drawGrid = () => {
    return (
      <div className="row row-cols-1 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 g-4">
            {listaEmpleados.map((item) => (
            <div className="col" key={item.idempleado}>
              <div className="card h-100">
                <img src={"https://servicios.campus.pe/fotos/" + item.foto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                  <p className="card-text">
                    {item.cargo}
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>
    )
  }

  return (
    <>
      <PageHeader titulo="Empleados"/>
      <section className="padded">
        <div className="container">
          {drawGrid()}
        </div>
      </section>
    </>
  );
}

export default Empleados;
