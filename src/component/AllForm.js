import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'

function AllForm() {
    const navigate = useNavigate()
    return (
        <div>
            <Nav>
                <NavItem id='tendersTabs'>
                    <NavLink className='btn btn-outline-info' onClick={() => navigate('student')}>Student Form</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className='btn btn-outline-info ml-3' onClick={() => navigate('movie')}>Movie Form</NavLink>
                </NavItem>
            </Nav>
            <Outlet />
            <div className='tb-1'></div>

        </div>



    )
}

export default AllForm