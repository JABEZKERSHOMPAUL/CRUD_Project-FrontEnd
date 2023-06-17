import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useCallback } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import swal from 'sweetalert'
import UsersContext from '../UserContext'
import Pagination from 'react-js-pagination'

function TabelMovie() {
    const user = useContext(UsersContext)
    const [aggregate,setAggregate]=useState({
        search:"",
        limit:4,
        skip:0
    })
    const[pages,setPages]=useState()
    const[activepage,setActivepage]=useState(1)
    const[currentpage,setCurrentpage]=useState(1)
    const [movieData, setMovieData] = useState([])
    const [viewmodal, setviewmodal] = useState(false)
    const [view, setview] = useState({})
    const [id, setid] = useState('')
    const [editmodal, seteditmodal] = useState(false)
    const [editdata, seteditdata] = useState({})
    // -------- S for get data from api----->
    const fetchMoiveDetail = async () => {
        const res = await axios.get('https://schoolmangement.onrender.com/get/all/movie', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

        setMovieData(res.data)
    }

    const paginate =(data)=>{
        console.log(data)
        const limit =aggregate.limit

        if(data){
            setActivepage(data)
            setCurrentpage(limit)
            setAggregate((state)=>{
                return{
                    ...state,
                    skip:data*limit-limit
                }
            })
        }
    }


    const aggregateApi =async()=>{
        const res = await  axios.post('https://schoolmangement.onrender.com/movie/aggregation',aggregate,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })

        console.log(res)

        setMovieData(res.data.response.result)
        setPages(res.data.response.fullcount)
    }


    //------to run above function fast
    useEffect(() => {
        aggregateApi()
    }, [aggregate])
    // ------------ E for api data ----------->
    //============ S for view modal =========>
    const viewtoggle = (id) => {
        if(checktoken){
            setviewmodal(!viewmodal);

        }else{
            toast.error("Kindly Login")
        }



    }
    //-----------geting single data to show in one id vieww---
    const fetchsingleMovie = async () => {
        const res = await axios.get(`https://schoolmangement.onrender.com/get/movie/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        setview(res.data)

    }

    console.log(id)


    //=========show data in single view------------------
    useEffect(() => {
        if (id !== "") {
            fetchsingleMovie()
        }
    }, [id])

    //================delete============

    const handledelete = async (id) => {
        if (checktoken) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this Student Details!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.delete(`https://schoolmangement.onrender.com/delete/movie/${id}`, {
                            headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        })
                            .then(() => {
                                fetchMoiveDetail()
                            })
                        swal("Sucessfully deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });

        } else {
            toast.error("Kindly Login")

        }

    }

    //=============editmodal to toggle so we create=======
    const edittoggle = (id) => {
       if(checktoken){
        seteditmodal(!editmodal)
        setid(id)
       }else{
        toast.error('Kindly Login')
       }
    }


    //=======save data in popup====
    const handleEdit = async () => {
        const res = await axios.get(`https://schoolmangement.onrender.com/get/movie/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        seteditdata(res.data)
        console.log(res)


    }

    useEffect(() => {
        if (id !== "") {
            handleEdit()
        }
    }, [id])

    //==================in edit for changing data===========

    const handleEditChange = (e) => {
        seteditdata((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    const handleEditSubmit = async (id) => {
        const res = await axios.put(`https://schoolmangement.onrender.com/update/movie/${id}`, editdata, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        if (res.status === 200) {
            toast.success('Updated Successfully')
            closeEditToggle()
            fetchMoiveDetail()
        }

    }
    //=====automaticaly closing PopUp====
    const closeEditToggle = () => {
        seteditmodal(!editmodal)
    }
    //=======TOken check=======
    const checktoken = localStorage.getItem('token')


    return (
        <>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Table  <span>{user.name}</span></h1>
                <Link to='/movie'><a class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas  fa-sm text-white-50"></i> + Create User</a></Link>
            </div>
            <div>
                <div className='row'>
                    <div className='col-4'>
                        <input type='text' placeholder='search' />
                    </div>
                </div>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary"> Movie DataTables Example</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Movie Name</th>
                                    <th>Relese Date</th>
                                    <th>Director Name</th>
                                    <th>Produced</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movieData.map((obj, i) => {
                                        return <tr>
                                            <td>{i + 1}</td>
                                            <td>{obj.moviename}</td>
                                            <td>{obj.relesedate}</td>
                                            <td>{obj.directedby}</td>
                                            <td>{obj.produced}</td>
                                            <td>
                                                <button className='btn btn-sm btn-primary' onClick={() => { viewtoggle(obj._id) }}>View</button>
                                                <button className='btn btn-sm btn-warning' onClick={() => { edittoggle(obj._id) }}>Edit</button>
                                                <button className='btn btn-sm btn-danger' onClick={() => { handledelete(obj._id) }}>Delete</button>
                                            </td>

                                        </tr>
                                    })

                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='d-flex justify-content-end'>
                    <Pagination
                        prevPageText={<i class="fa fa-chevron-left" aria-hidden="true"></i>}
                        nextPageText={<i class="fa fa-chevron-right" aria-hidden="true"></i>}
                        firstPageText={<i class="fa fa-angle-double-left" aria-hidden="true"></i>}
                        lastPageText={<i class="fa fa-angle-double-right" aria-hidden="true"></i>}
                    activePage={activepage}
                    itemsCountPerPage={currentpage}
                    totalItemsCount={pages}
                    onChange={paginate}
                    itemClass='page-item'
                    linkClass='page-link'
                />
                    </div>
                
                </div>
            </div>

            <Modal isOpen={viewmodal} toggle={viewtoggle}>
                <ModalHeader> View Details</ModalHeader>
                <ModalBody>
                    <div>
                        <div className='row'>
                            <p className='col-6'>{view.moviename}</p>
                            <p className='col-6'>{view.relesedate}</p>
                            <p className='col-6'>{view.directedby}</p>
                            <p className='col-6'>{view.produced}</p>
                        </div>


                    </div>
                </ModalBody>
            </Modal>



            <Modal isOpen={editmodal} toggle={closeEditToggle}>
                <ModalHeader>
                    Edit Details
                </ModalHeader>

                <ModalBody>
                    <div class="row gy-2 gx-3 align-items-center">
                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInput">Movie Name:</label>
                            <input value={editdata.moviename} type="text" class="form-control" name='moviename' id="autoSizingInput" placeholder="Enter Movie Name..." onChange={(e) => handleEditChange(e)} />
                        </div>

                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInput">Relese Date:</label>
                            <input value={editdata.relesedate} type="number" class="form-control" name='relesedate' id="autoSizingInput" placeholder="Enter Relese Date..." onChange={(e) => handleEditChange(e)} />
                        </div>

                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInput">Directed by:</label>
                            <input value={editdata.directedby} type="text" class="form-control" name='directedby' id="autoSizingInput" placeholder="Enter the Director Name... " onChange={(e) => handleEditChange(e)} />
                        </div>

                        <div class="col-auto">
                            <label class="visually-hidden" for="autoSizingInput">Produced By:</label>
                            <input value={editdata.produced} type="text" class="form-control" name='produced' id="autoSizingInput" placeholder="Enter Producer Name" onChange={(e) => handleEditChange(e)} />
                        </div>
                        <hr />
                        <div>
                            <button class='btn btn-info' onClick={() => handleEditSubmit(id)}>SUMBIT</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>




            <Toaster />
        </>
    )
}

export default TabelMovie