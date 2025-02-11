import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import Inversiones from './pages/Inversiones'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import Clientes from './pages/Clientes'

function App() {

  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inversiones" element={<Inversiones />} />
            <Route path='/proveedores' element={<Proveedores />} />
            <Route path='/empleados' element={<Empleados />} />
            <Route path='/tienda' element={<Tienda />} />
            <Route path='/clientes' element={<Clientes/>} />
          </Routes>
        </main>
        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App
