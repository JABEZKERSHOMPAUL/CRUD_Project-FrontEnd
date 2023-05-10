import axios from 'axios'
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Movies() {

    let navigate = useNavigate()

    const [detail, setDetail] = useState({
        moviename: "",
        relesedate: "",
        directedby: " ",
        produced: ""
    })

    const handleChange=(e)=>{
        setDetail((data)=>({...data,[e.target.name]:e.target.value}))
    }


    const handleSumbit = async (e) => {
        const res = await axios.post('http://localhost:8000/create/movie', detail,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        if(res.status===200){
            toast.success("created successfully")
            setTimeout(()=>{
                navigate("/alllist/tablemovie")
            },3000)
            
        }

    }
   

    return (
        <div class="row gy-2 gx-3 align-items-center">
            <div class="col-auto">
                <label class="visually-hidden" for="autoSizingInput">Movie Name:</label>
                <input type="text" class="form-control" name='moviename' id="autoSizingInput" placeholder="Enter Movie Name..." onChange={(e) => handleChange(e)} />
            </div>

            <div class="col-auto">
                <label class="visually-hidden" for="autoSizingInput">Relese Date:</label>
                <input type="number" class="form-control" name='relesedate' id="autoSizingInput" placeholder="Enter Relese Date..." onChange={(e) => handleChange(e)} />
            </div>

            <div class="col-auto">
                <label class="visually-hidden" for="autoSizingInput">Directed by:</label>
                <input type="text" class="form-control" name='directedby' id="autoSizingInput" placeholder="Enter the Director Name... " onChange={(e) => handleChange(e)} />
            </div>

            <div class="col-auto">
                <label class="visually-hidden" for="autoSizingInput">Produced By:</label>
                <input type="text" class="form-control" name='produced' id="autoSizingInput" placeholder="Enter Producer Name" onChange={(e) => handleChange(e)} />
            </div>
            <hr />
            <div>
                <button class='btn btn-info' onClick={handleSumbit}>SUMBIT</button>
            </div>
            <Toaster />
        </div>
    )
}

export default Movies