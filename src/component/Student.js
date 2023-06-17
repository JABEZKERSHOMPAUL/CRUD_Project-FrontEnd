import axios from 'axios'
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Form() {
    let navigate= useNavigate()

    const [loginData,setLoginData]=useState({
        
        firstname:'',
        lastname:'',
        password:'',
        confirmPassword:'',
        age:'',
        email:'',
        place:'',
    })

    const handleChange=(e)=>{
        setLoginData((data)=>({...data,[e.target.name]:e.target.value}))
    }

    const handleSumbit=async(e)=>{
        const res =await axios.post("https://schoolmangement.onrender.com/create/student",loginData,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        if(res.status===200){
            toast.success("created successfully")
            setTimeout(()=>{
                navigate("/alllist/student")
            },3000)
            
        }
        
    }

    

    // const handleChanges = (e) => {
    //     setLoginData((select)=>({...select,[e.target.name]:e.target.value}))
    //   };
     
    return (
        <>
            <div class="row">
                <div className='col-4'>
                    <label>First Name:</label><br />
                    <input type={"text"} placeholder={"Enter Your Name...."} name='firstname' onChange={(e)=>handleChange(e)}></input>
                </div>

                <div className='col-4'>
                    <label>Last Name:</label><br />
                    <input type={"text"} placeholder={"Enter Your Name...."} name='lastname' onChange={(e)=>handleChange(e)}></input>
                </div>

                <div className='col-4'>
                    <label>Age:</label><br />
                    <input type={"number"} placeholder={"Enter Your Age"} name="age" onChange={(e)=>handleChange(e)}></input>
                </div>
            </div>
            <div class="row">
                <div className='col-4'>
                    <label>Email Id:</label><br />
                    <input type={"email"} placeholder={"Enter Your Mail Address...."}  name='email' onChange={(e)=>handleChange(e)}></input>
                </div>

                <div className='col-4'>
                    <label>Password:</label><br />
                    <input type={"password"} placeholder={"Enter Your Password...."} name='password' onChange={(e)=>handleChange(e)}></input>
                </div>

                <div className='col-4'>
                    <label> Confirm Password:</label><br />
                    <input type={"password"} placeholder={"Enter Your Confirm Password..."} name='confirmPassword' onChange={(e)=>handleChange(e)}></input>
                </div>

                <div className='col-4'>
                    <label>Place:</label><br />
                    <select  name='place'  onChange={handleChange}>    {/*//value=loginData.place*/}
                        <option value="Enter Your Place....">Enter Your Place....</option>
                        <option value="CHENNAI">CHENNAI</option>
                        <option value="MADURAI">MADURAI</option>
                        <option value="SELAM">SELAM</option>
                        <option value="KANYAKUMARI">KANYAKUMARI</option>
                        <option value="THOOTHUKUDI">THOOTHUKUDI</option>
                    </select>
                </div>
            </div>
            <hr />
            <div>
                <button class='btn btn-info' onClick={handleSumbit}>SUMBIT</button>
            </div>
            <Toaster/>
        </>
    )
}

export default Form