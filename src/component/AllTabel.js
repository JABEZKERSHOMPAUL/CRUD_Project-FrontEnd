import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';



function AllTabel() {
    const [isAuthenticated, setisAuthenticated] = useState(false)

    let token = localStorage.getItem('token')

    const verifyUser = async () => {
        const res = await axios.post('https://schoolmangement.onrender.com/verify/user', { token: token })


        if (res.data.status === 1) {
            setisAuthenticated(true)
        }
    }

    useEffect(() => {
        if (token !== null) {
            verifyUser()
        }
    }, [token])
    let navigate = useNavigate()
    return (
        <>
            <div>
                {isAuthenticated ?
                <><Nav  id='tendersTabs' >
                <NavItem >
                    <NavLink className='btn btn-outline-info'  onClick={()=>navigate('student')}>
                        students
                    </NavLink>
                </NavItem>
                <NavItem  tabs>
                    <NavLink className='btn btn-outline-info ml-3' onClick={()=>navigate('tablemovie')}>
                        movies
                    </NavLink>
                </NavItem>
                </Nav>
                 <span className='tb-1'></span> </>: " "
              }
            </div>
            <Outlet/>
        </>
    )
}

export default AllTabel;