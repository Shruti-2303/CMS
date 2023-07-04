import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Dashboard from './Pages/Dashboard';
import PrivateRoutes from './components/PrivateRoutes';
function App() {
  

  return (
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/private-routes' element={<PrivateRoutes/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
