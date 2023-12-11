import React,{useState,useEffect} from 'react'
import { endpoint } from '../utility/endpoint'
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
const Login = () => {
    const initial = {
        email: '',
        password: ''
        
    }
    const [data,setData]=useState(initial)
    const navigate  = useNavigate();
    const inputHandler=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const loginForm=async ()=>{

        try{
            let result=await axios({
                url:`${endpoint.baseUrl}/login`,
                method:"POST",
                data:data,
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(result);
            if(result.status==200){
                localStorage.setItem("userdata",JSON.stringify(result.data))
                toast.success("Successfully Logged In");
                navigate('/'); 
            }
            else{
                toast.warn("User not found")
            }
            
        }
        catch(error){
            console.log("error in register",error)
        }
    }
    useEffect(()=>{
        let auth=localStorage.getItem("userdata");
        if(auth){
          navigate("/")
        }
    })
    return (
        <div className='w-[100%] m-auto block'>
          <h1 className='font-bold size-[20px] text-center p-3'>Login</h1>
          <div className='w-[50%] m-auto bg-[#000] p-3 h-[400px] main'>
          
            <input type='email' name='email' placeholder='Enter your email'  onChange={(e)=>inputHandler(e)} className='border  border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block  rounded-xl'/>
            <input type='password' name='password' placeholder='Enter your password'  onChange={(e)=>inputHandler(e)} className='border  border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block  rounded-xl'/>
            <button className='bg-[#700199] text-white p-2 mt-4  w-[30%] m-auto block' onClick={loginForm}>Login</button>
            </div>
            
          
        </div>
      )
}

export default Login
