import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import swal from 'sweetalert'
import UsersContext from '../UserContext'

function Tabels() {
    const user = useContext(UsersContext)
    const [studentList, setStudentList] = useState([])
    const [model, setmodel] = useState(false)
    const [id, setid] = useState('')
    const [view, setview] = useState({})
    const [editmodel, setEditmodel] = useState(false)
    const [editData,seteditData] = useState({})

    const fetchsingleStudent = async () => {
        const res = await axios.get(`http://localhost:8000/get/student/${id}`,{
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        setview(res.data)

    }
    const toggle = (id) => {
        if(checktoken){
            setmodel(!model);
            setid(id)
        }
        else{
            toast.error('Kindly Login')
        }
       
    }

    const fetchStudentList = async () => {
        const res = await axios.get("http://localhost:8000/get/all/student",{
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        setStudentList(res.data)
    }
    // console.log(studentList)


    useEffect(() => {

        fetchStudentList()

    }, [])

    useEffect(() => {
        if (id !== "") {
            fetchsingleStudent()
        }
    }, [id])

    useEffect(() => {
        if (id !== "") {
           handleEdit()
        }
    }, [id])

    const handleDelet = async (id) => {
        if(checktoken){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this Student Details!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
                .then((willDelete) => {
                  if (willDelete) {
                    axios.delete(`http://localhost:8000/delete/student/${id}`,{
                        headers: {
                            Authorization:localStorage.getItem('token')
                        }
                    })
                      .then(() => {
                        fetchStudentList()
                      })
                    swal("Sucessfully deleted!", {
                      icon: "success",
                    });
                  } else {
                    swal("Your imaginary file is safe!");
                  }
                });
        }else{
            toast.error('Kindly Login')
        }
    }

    // console.log(view)

    const edittoggle = (id) => {
        if(checktoken){
            setEditmodel(!editmodel)
            setid(id)
        }else{
            toast.error('Kindly Login')
        }
        
    }

    const closeEditToggle=()=>{
        setEditmodel(!editmodel)
    }

    const handleEdit=async()=>{
        const res=await axios.get(`http://localhost:8000/get/student/${id}`,{
            headers: {
                Authorization:localStorage.getItem('token')
            }
        })
        // console.log(res)
        seteditData(res.data)
    }
// console.log(editData)

const handleEditSubmit = async(id)=>{
    // console.log(editData)
    const res = await axios.put(`http://localhost:8000/update/student/${id}`,editData,{
        headers: {
            Authorization:localStorage.getItem('token')
        }
    })
    if(res.status===200){
        toast.success("Updated")
        closeEditToggle()
        fetchStudentList()
    }
    console.log(res)
}

const handleEditChange=(e)=>{
    seteditData((data)=>({...data,[e.target.name]:e.target.value}))
}
 //=======TOken check=======
 const checktoken = localStorage.getItem('token')

    return (
        <>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Table   <span>  {user.name}</span></h1>
                <Link to='/allform/form'><a class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas  fa-sm text-white-50"></i> + Create User</a></Link>
            </div>
            

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Email ID</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    studentList.map((obj,i) => {
                                        return <tr>
                                            <td>{i+1}</td>
                                            <td>{obj.firstname}</td>
                                            <td>{obj.lastname}</td>
                                            <td>{obj.age}</td>
                                            <td>{obj.email}</td>
                                            <td>{obj.place}</td>
                                            <td>
                                                <button className='btn btn-sm btn-primary' onClick={() => { toggle(obj._id) }} >View</button>
                                                <button className='btn btn-sm btn-warning' onClick={()=>{ edittoggle(obj._id)}}>Edit</button>
                                                <button className='btn btn-sm btn-danger' onClick={() => { handleDelet(obj._id) }}>Delete</button>
                                            </td>

                                        </tr>
                                    })
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal isOpen={model} toggle={toggle}>
                <ModalHeader >
                    View User
                </ModalHeader>
                <ModalBody>
                    <div>
                        <img src={view.image} width="90px" height={"90px"} />
                        <div className='row'>
                            <p class='col-4'>{view.firstname}</p>
                            <p class='col-4'>{view.lastname}</p>
                            <p class='col-4'>{view.age}</p>
                        </div>
                        <div className='row'>
                            <p class='col-6'>{view.email}</p>
                            <p class='col-6'>{view.place}</p></div>

                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={editmodel} toggle={closeEditToggle} size="lg">
                <ModalHeader>
                    EDIT
                </ModalHeader>
                <ModalBody >
                    <>
                        <div >
                            <div class="row">
                                <div className='col-4'>
                                    <label>First Name:</label><br />
                                    <input type={"text"} value={editData.firstname} placeholder={"Enter Your Name...."} name='firstname' onChange={(e)=>handleEditChange(e)}/>
                                </div>

                                <div className='col-4'>
                                    <label>Last Name:</label><br />
                                    <input type={"text"} value={editData.lastname} placeholder={"Enter Your Name...."} name='lastname' onChange={(e)=>handleEditChange(e)}/>
                                </div>

                                <div className='col-4'>
                                    <label>Age:</label><br />
                                    <input type={"number"} value={editData.age} placeholder={"Enter Your Age"} name="age" onChange={(e)=>handleEditChange(e)}></input>
                                </div>
                            </div>
                            <div class="row">
                                <div className='col-4'>
                                    <label>Email Id:</label><br />
                                    <input type={"email"} value={editData.email} placeholder={"Enter Your Mail Address...."} name='email' onChange={(e)=>handleEditChange(e)}/>
                                </div>

                                <div className='col-4'>
                                    <label>Password:</label><br />
                                    <input type={"password"} placeholder={"Enter Your Password...."} name='password' ></input>
                                </div>

                                <div className='col-4'>
                                    <label> Confirm Password:</label><br />
                                    <input type={"password"} placeholder={"Enter Your Confirm Password..."} name='confirmPassword' ></input>
                                </div >

                                <div className='col-4'>
                                    <label>Place:</label><br />
                                    <select name='place' onChange={(e)=>handleEditChange(e)}>
                                        <option value="Enter Your Place....">Enter Your Place....</option>
                                        <option value="CHHENNAI">CHENNAI</option>
                                        <option value="MADURAI">MADURAI</option>
                                        <option value="SELAM">SELAM</option>
                                        <option value="KANYAKUMARI">KANYAKUMARI</option>
                                        <option value="THOOTHUKUDI">THOOTHUKUDI</option>
                                    </select>
                                </div>
                            </div >
                            <hr />
                            <div>
                                <button class='btn btn-info' onClick={()=>handleEditSubmit(id)}>SUMBIT</button>
                            </div>
                        </div>

                    </>

                </ModalBody >

            </Modal >




            <Toaster />

        </>


    )
}

export default Tabels

