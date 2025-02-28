import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

function Futbol() {
  const [listaLigasFutbol, setListaLigasFutbol] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);
  const leerServicio = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "152f218112938e5ceac0c0929029aa05");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://v3.football.api-sports.io/leagues", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        setListaLigasFutbol(data.response);
      })
      .catch((error) => console.log("error", error));
  };

  const drawTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Cod Pais</th>
            <th scope="col">Pais</th>
            <th scope="col">Bandera</th>
            <th scope="col">Liga</th>
            <th scope="col">Tipo</th>
            <th scope="col">Logo</th>
            <th scope="col">Temporadas</th>
          </tr>
        </thead>
        <tbody>
          {listaLigasFutbol.map((item, index) => (
            <tr key={index} >
              <td>{index+1}</td>
              <td>{item.country.code}</td>
              <td>{item.country.name}</td>
              <td><img className="imagen-futbol" src={item.country.flag} alt="" /></td>
              <td>{item.league.name}</td>
              <td>{item.league.type}</td>
              <td><img className="imagen-futbol" src={item.league.logo} alt="" /></td>
              <td>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.seasons.map((temporada,index) => 
                      <tr key={index}>
                        <td>{temporada.year}</td>
                        <td>{temporada.start}</td>
                        <td>{temporada.end}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <PageHeader titulo="Ligas de Futbol" />
      <section className="padded">
        <div className="container">{drawTable()}</div>
      </section>
    </>
  );
}

export default Futbol;
