import React from 'react'
import { isLoggedIn } from '../auth'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    
  return isLoggedIn() ? <Outlet/> : <Navigate to={"/login"}/>
}

export default PrivateRoutes