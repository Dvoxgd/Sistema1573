import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Inicio from "./pages/Inicio";
import Inversiones from "./pages/Inversiones";
import Proveedores from "./pages/Proveedores";
import Empleados from "./pages/Empleados";
import Tienda from "./pages/Tienda";
import Clientes from "./pages/Clientes";
import Carrito from "./pages/Carrito";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";
import Directores from "./pages/Directores";
import Pagina404 from "./pages/Pagina404";
import Seleccionados from "./pages/Seleccionados";
import Futbol from "./pages/Futbol";
import Paises from "./pages/Paises";

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },
      {
        path: "/inversiones",
        element: <Inversiones />,
      },
      {
        path: "/proveedores",
        element: <Proveedores />,
      },
      {
        path: "/empleados",
        element: <Empleados />,
      },
      {
        path: "/tienda",
        element: <Tienda />,
      },
      {
        path: "/clientes",
        element: <Clientes />,
      },
      {
        path: "/carrito",
        element: <Carrito />,
      },
      {
        path: "/productodetalle/:idproducto",
        element: <ProductoDetalle />,
      },
      {
        path: "/seleccionados",
        element: <Seleccionados />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/directores",
        element: <Directores />,
      },
      {
        path: "/futbol",
        element: <Futbol />,
      },
      {
        path: "/paises",
        element: <Paises />,
      },
      {
        path: "*",
        element: <Pagina404 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
