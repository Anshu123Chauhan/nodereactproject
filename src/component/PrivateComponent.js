import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
const PrivateComponent = () => {
    let auth=localStorage.getItem("userdata");
    return auth?<Outlet />:<Navigate to="/register"/>
}

export default PrivateComponent
