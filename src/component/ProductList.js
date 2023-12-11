import React,{useEffect, useState} from 'react'
import styled from "styled-components"
import { endpoint } from '../utility/endpoint';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {
    const Navigate=useNavigate();
const Card=styled.div`background: linear-gradient(180deg, #ba00ff 0%, #000000 100%);`;
const [product, setProduct]=useState([]);
const [deleted,setDeleted]=useState(false);
const [search, setSearch]=useState("");
const getProduct=async()=>{
    try{
    const data= await axios({
        url:`${endpoint.baseUrl}/getProduct`,
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    })
 
    if(data.status==200){
        setProduct(data.data)
    }
    }
    catch(error){

    }
}
const deleteProduct=async(item)=>{
    try{
        const data=await axios({
            url:`${endpoint.baseUrl}/deleteProduct/${item}`,
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        if(data.data.deletedCount>0){
            setDeleted(!deleted)
            toast.success("Product Deleted Successfully");
        }
        else{
            toast.warn("Product could not be deleted")
        }
    }
    catch(error){
        toast.error(error)
    }
}
const updateProduct=async(item)=>{
    Navigate(`/update/${item}`)
}
const searchProduct=async()=>{
    try{
    const data= await axios({
        url:`${endpoint.baseUrl}/search/${search}`,
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    })
 
    if(data.status==200){
       setProduct(data.data)
    }
    }
    catch(error){

    }
}

useEffect(()=>{
    getProduct();
},[deleted])
useEffect(()=>{
    searchProduct();
},[search])

  return (
    <div className='w-[90%] mx-auto py-5'>
        <h1 className='text-center font-bold text-[25px]'>Search Product</h1>
        <input type="text" placeholder="Secrh product here" onChange={(e)=>setSearch(e.target.value)}className="border-4  border-[#700199] bg-[#fffbfbe8] py-2 px-2 mb-2 w-[50%] m-auto block  rounded-xl"/>
        <div className="grid grid-cols-3 gap-3">
            
            {product.map((item,index)=>(
            <Card key={index} className="font_bold bg-[#43DF6C] rounded-3xl grid place-items-center text-center ">
                    <div>
                        <img src='./nophone.jpg' alt="noimage"  className='max-w-[100%] rounded-3xl'/>
                    </div>
                    <div className="flex flex-col justify-between h-full">
                        <h3 className="text-xl mb-6 text-white font-bold">{item.name}</h3>
                        <p className="text-sm text-white p-4 text-justify">{item.description}</p>
                        
                    </div>
                    <div className="flex w-full mb-5">
                        <button className='bg-[#700199] text-white p-2 mt-4  w-[30%] m-auto block'>Add To Cart</button>
                        <button className='bg-[#700199] text-white p-2 mt-4  w-[30%] m-auto block' onClick={()=>updateProduct(item._id)}>Update</button>
                        <button className='bg-[#700199] text-white p-2 mt-4  w-[30%] m-auto block' onClick={()=>deleteProduct(item._id)}>Delete</button>
                    </div>
            </Card>
            ))}
            </div>
   </div>
  )
}

export default ProductList
