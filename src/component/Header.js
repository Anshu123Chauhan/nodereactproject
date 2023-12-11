import React from 'react'
import {Link} from "react-router-dom"
import "../style/component/Header.css";

const Header = () => {
  
  let auth=localStorage.getItem("userdata");
  const logout=()=>{
    localStorage.removeItem("userdata");
  }
  return (
    <div className='mainheader py-3'>
       <li className='py-0'><Link to="/"><img src="./logo.png" className='max-w-[100%]'/></Link></li>
      {auth?
      <ul className='header items-center flex'>
       
        <li className='text-white font-bold'><Link to="/">Products</Link></li>
        <li className='text-white  font-bold'><Link to="/add">Add Product</Link></li>
        <li className='text-white  font-bold'><Link to="/update">Update Product</Link></li>
        <li className='text-white  font-bold'><Link to="/profile">{JSON.parse(auth).name}</Link></li>
        <li className='text-white  font-bold'><Link to="/register" onClick={logout}>Logout</Link></li>
        </ul>:
        <ul className='header flex flex-row-reverse'>
           <li className='text-white  font-bold'><Link to="/register">Sign Up</Link></li><li className='text-white  font-bold'><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Header
