import React,{useState,useEffect} from 'react'
import { endpoint } from '../utility/endpoint';
import {toast} from "react-toastify";
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UpdateProducts = () => {
    const params=useParams();
  let auth=JSON.parse(localStorage.getItem("userdata"));
  const initial = {
    name: '',
    category: '',
    brand: '',
    price:'',
    description:'',
    userId:auth._id
   
  }
  const initialerror = {
    name: false,
    category: false,
    brand: false,
    price:false,
    description:false
}
const [data,setData]=useState(initial)
const [error,setError]=useState(initialerror);
const [productdata, setProductdata]=useState([]);
const getProductbyid=async()=>{
    try{
    const data= await axios({
        url:`${endpoint.baseUrl}/getproductbyid/${params.id}`,
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        }
    })
 
    if(data.status==200){
        setData(data.data)
    }
    }
    catch(error){

    }
}
const inputHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
    console.log(data);
}
const errorHandler=(e)=>{
  if(e.target.value){
    setError({...error,[e.target.name]:"valid"})
  }
  else{
    setError({...error,[e.target.name]:true})
  }
}

const submit=async()=>{
  try{
  const {
    name,
    category,
    brand,
    price,
    description
  }=data;
  
  if(name!== '' && category!== '' && brand!== '' && price!== '' && description!==''){
    const result=await axios({
      url:`${endpoint.baseUrl}/updateProduct/${params.id}`,
      method:"PUT",
      data:data,
      header:{
        'Content-Type':"application/json"
      }
    })
    console.log(result)
    if(result.status==200){
      toast.success("Product updated successfully")
    }
    else{
      toast.error("Product not updated")
    }
  }
  else{
    Object.keys(data).forEach((fieldname)=>{
        if(data[fieldname].trim()===''){
          setError((error)=>({
            ...error,[fieldname]:true
          }))
        }
    })

    toast.error("Please fill all the required fields")
  }
  }
  catch(error){
    toast.error("Product not added")
  }

}
useEffect(()=>{
    getProductbyid();
},[])



  return (
    <div className='w-[100%] m-auto block h-[50vw]'>
      <h1 className='font-bold size-[20px] text-center p-3'>Update Product</h1>
      <div className='w-[50%] m-auto bg-[#000] p-3  main'>
        <label className='text-white px-10'>Product Name<span className="text-[#FF0000]" > * </span>
        {(error.name!=="valid" && error.name==true)?<span className='text-[#FF0000]'>name is mandatory</span>:null}
        </label>
          <input type='text' name='name' placeholder='Enter product name' value={data.name} onChange={(e)=>inputHandler(e)} onBlur={(e)=>errorHandler(e)} className='border border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block rounded-xl'/>
        
        <label className='text-white  px-10'>Product Category<span className="text-[#FF0000]" > * </span>
        {(error.category!=="valid" && error.category==true)?<span className='text-[#FF0000]'>category is mandatory</span>:null}
        </label>
          <input type='text' name='category' placeholder='Enter your catgeory' value={data.category}  onChange={(e)=>inputHandler(e)}  onBlur={(e)=>errorHandler(e)} className='border  border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block  rounded-xl'/>
        
        <label className='text-white  px-10'>Product Brand<span className="text-[#FF0000]" > * </span>
        {(error.brand!=="valid" && error.brand==true)?<span className='text-[#FF0000]'>brand is mandatory</span>:null}
        </label>
          <input type='text' name='brand' placeholder='Enter your brand'  value={data.brand} onChange={(e)=>inputHandler(e)}  onBlur={(e)=>errorHandler(e)} className='border  border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block  rounded-xl'/>
        
        <label className='text-white  px-10'>Product Price<span className="text-[#FF0000]" > * </span>
        {(error.price!=="valid" && error.price==true)?<span className='text-[#FF0000]'>price is mandatory</span>:null}
        </label>
          <input type='text' name='price' placeholder='Enter your price' value={data.price}  onChange={(e)=>inputHandler(e)}  onBlur={(e)=>errorHandler(e)} className='border  border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block  rounded-xl'/>
          <label className='text-white  px-10'>Product Description<span className="text-[#FF0000]" > * </span>
        {(error.description!=="valid" && error.description==true)?<span className='text-[#FF0000]'>description is mandatory</span>:null}
        </label>
        <textarea  name='description' value={data.description} placeholder='Enter your description'  onChange={(e)=>inputHandler(e)}  onBlur={(e)=>errorHandler(e)} className='border  border-[#fff] bg-[#fffbfbe8] py-2 mb-2 w-[90%] m-auto block  rounded-xl'/>

        <button className='bg-[#700199] text-white p-2 mt-4  w-[30%] m-auto block' onClick={submit}>Update</button>
        </div>
        
      
    </div>
  )
}

export default UpdateProducts
