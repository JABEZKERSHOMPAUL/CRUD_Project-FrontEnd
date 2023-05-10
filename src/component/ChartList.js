import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ChartList() {
    const [studentList, setStudentList] = useState([])
    const fetchStudentList = async () => {
        const res = await axios.get("https://641e72d4f228f1a83ea4208c.mockapi.io/students")
        setStudentList(res.data)
    }

    useEffect(() => {

        fetchStudentList()

    }, [])

  return (
   <>
   <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Table   <span>  </span></h1>
                <Link to='/form'><a class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
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
                                    studentList.map((obj) => {
                                        return <tr>
                                            <td>{obj.id}</td>
                                            <td>{obj.firstname}</td>
                                            <td>{obj.lastname}</td>
                                            <td>{obj.age}</td>
                                            <td>{obj.email}</td>
                                            <td>{obj.place}</td>
                                            <td>
                                                <Link to={`/chart/details/${obj.id}`}><button className='btn btn-sm btn-primary'>View</button></Link>
                                                {/* <button className='btn btn-sm btn-warning' onClick={()=>{ edittoggle(obj.id)}}>Edit</button>
                                                <button className='btn btn-sm btn-danger' onClick={() => { handleDelet(obj.id) }}>Delete</button> */}
                                            </td>

                                        </tr>
                                    })
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
   </>
  )
}

export default ChartList