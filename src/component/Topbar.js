import React, { useContext, useEffect, useState } from 'react'
import UsersContext from '../UserContext'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Toaster, toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import open from "../image/open.png"
import close from "../image/icons8-invisible-48.png"
import bg from '../image/photo-1611700596000-6317fca6e63f.jpeg'

function Topbar() {
    const [userData, setUserData] = useState('')
    const [isAuthenticated, setisAuthenticated] = useState(false)

    let token = localStorage.getItem('token')
    const verifyUser = async () => {
        const res = await axios.post('http://localhost:8000/verify/user', { token: token })


        if (res.data.status === 1) {
            setisAuthenticated(true)
        }
    }

    useEffect(() => {
        if (token !== null) {
            verifyUser()
        }
    }, [token])

    const verify = async () => {
        const res = await axios.post('http://localhost:8000/verify/user', { token: token })
        if (res.data.status === 1) {
            setUserData(res.data.user)
        }
    }

    useEffect(() => {
        if (token !== null) {
            verify()
        }
    }, [token])

    //========================login===========================
    const [loginmodal, setloginmodal] = useState(false)
    const logintoggle = () => {
        setloginmodal(!loginmodal)
    }

    const [showpassword, setshowpassword] = useState(false)
    const password = () => {
        setshowpassword(!showpassword)
    }
    const navigate = useNavigate()

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [isAgree, setIsAgree] = useState(false)

    const handleSubmit = async () => {


        if (userLogin.email === "") {
            toast.error("Email Required")
            return;
        }
        if (userLogin.password === "") {
            toast.error("Password Required")
            return;
        }
        if (isAgree === false) {
            toast.error("Check Required")
            return;
        }


        const res = await axios.post("http://localhost:8000/user/signin", userLogin)
        console.log(res)
        if (res.data.status === 1) {
            toast.success(res.data.message)
            const logedIn = localStorage.setItem('token', res.data.token)
            setTimeout(() => {
                if (logedIn) {
                    toast.success('LogedIn Successfully')

                }
                logintoggle()


                navigate('/')
            }, 1000);


        } else {
            toast.error(res.data.message)

        }

    }
    //==================signin page==============================================
    const [signmodal, setsignmodal] = useState(false)
    const closesign = () => {
        setsignmodal(!signmodal)
    }

    const [signup, setsignup] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const handlesignChange = (e) => {
        setsignup((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlesignSubmit = async () => {
        if (signup.email === "") {
            toast.error("Email Required")
            return;
        }
        if (signup.password === "") {
            toast.error("Password Required")
            return;
        }
        if (signup.username === "") {
            toast.error("Username Required")
            return;
        }
        if (signup.confirmpassword === "") {
            if (signup.password == signup.confirmpassword) {
                toast.error('Password did not match')
                return;
            }
        }

        const res = await axios.post('http://localhost:8000/create/register', signup)

        if (res.data.status === 1) {
            toast.success(res.data.message)
            // setTimeout(() => {

            //     navigate
            // }, 3000)
            reschange()
        } else {
            toast.error(res.data.message)
        }
    }
    const change = () => {
        setloginmodal(!loginmodal)
        setsignmodal(!signmodal)
    }
    const reschange=()=>{
        setloginmodal(!loginmodal)
        setsignmodal(!signmodal)
    }


    return (
        <> <nav class="navbar navbar-expand navbar-light bg-info topbar mb-4 static-top shadow">


            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>

            <form
                class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div class="input-group">
                    <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                        aria-label="Search" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                            <i class="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form>


            <ul class="navbar-nav ml-auto">


                <li class="nav-item dropdown no-arrow d-sm-none">
                    <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-search fa-fw"></i>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form class="form-inline mr-auto w-100 navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>


                <li class="nav-item dropdown no-arrow mx-1">
                    <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-bell fa-fw"></i>

                        <span class="badge badge-danger badge-counter">3+</span>
                    </a>

                    <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="alertsDropdown">
                        <h6 class="dropdown-header">
                            Alerts Center
                        </h6>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="mr-3">
                                <div class="icon-circle bg-primary">
                                    <i class="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div class="small text-gray-500">December 12, 2019</div>
                                <span class="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="mr-3">
                                <div class="icon-circle bg-success">
                                    <i class="fas fa-donate text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div class="small text-gray-500">December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="mr-3">
                                <div class="icon-circle bg-warning">
                                    <i class="fas fa-exclamation-triangle text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div class="small text-gray-500">December 2, 2019</div>
                                Spending Alert: We've noticed unusually high spending for your account.
                            </div>
                        </a>
                        <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                </li>


                <li class="nav-item dropdown no-arrow mx-1">
                    <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-envelope fa-fw"></i>

                        <span class="badge badge-danger badge-counter">7</span>
                    </a>

                    <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="messagesDropdown">
                        <h6 class="dropdown-header">
                            Message Center
                        </h6>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="img/undraw_profile_1.svg"
                                    alt="..." />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold">
                                <div class="text-truncate">Hi there! I am wondering if you can help me with a
                                    problem I've been having.</div>
                                <div class="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="img/undraw_profile_2.svg"
                                    alt="..." />
                                <div class="status-indicator"></div>
                            </div>
                            <div>
                                <div class="text-truncate">I have the photos that you ordered last month, how
                                    would you like them sent to you?</div>
                                <div class="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="img/undraw_profile_3.svg"
                                    alt="..." />
                                <div class="status-indicator bg-warning"></div>
                            </div>
                            <div>
                                <div class="text-truncate">Last month's report looks great, I am very happy with
                                    the progress so far, keep up the good work!</div>
                                <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                    alt="..." />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div>
                                <div class="text-truncate">Am I a good boy? The reason I ask is because someone
                                    told me that people say this to all dogs, even if they aren't good...</div>
                                <div class="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                        </a>
                        <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                </li>

                <div class="topbar-divider d-none d-sm-block"></div>


                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { logintoggle() }}>
                        <span class="mr-2 d-none d-lg-inline text-dark small">{userData}</span>
                        <img class="img-profile rounded-circle"
                            src="img/undraw_profile.svg" />
                    </a>

                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>

            </ul>
            <Modal isOpen={loginmodal} toggle={logintoggle}>

                <ModalBody>
                    <div className='position-relative'>
                        <img src={bg} width={'100%'} height={'500px'} />
                        <div className='container m-auto   p-3 align-content-center position-absolute text-light ' style={{ top: "0%" }}>
                            <h2 className='text-center '>SignIn</h2>


                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => handleChange(e)} />
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <div className='position-relative'>
                                    <input type={showpassword ? "text" : "password"} class="form-control bg-dark text-light" id="exampleInputPassword1" name='password' onChange={(e) => handleChange(e)} />
                                    {
                                        showpassword ? <img src={open} className="position-absolute top-0 end-0 mt-2 me-2 colour-white"
                                            style={{ cursor: 'pointer' }}
                                            width={'20px'}
                                            height={'20px'}
                                            onClick={password} /> : <img src={close} className="position-absolute top-0 end-0 mt-2 me-2 colour-white"
                                                style={{ cursor: 'pointer' }}
                                                width={'20px'}
                                                height={'20px'}
                                                onClick={password} />
                                    }

                                </div>
                            </div>
                            <div class="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    checked={isAgree}
                                    class="form-check-input"
                                    id="exampleCheck1"
                                    onClick={() => setIsAgree(!isAgree)}
                                />


                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>

                            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>



                            <div className='mt-3' style={{cursor:'pointer'}}  onClick={change}>
                                Create New Account
                            </div>



                            <div className=' text-center me-4 mt-4 ms-4'>
                                <span className='ms-5 mx--5'>Sign In with Social Network</span>  <br />
                                <button type="button" class="btn btn-link btn-floating  ms-5 ">
                                    <i class="fa fa-facebook"></i>
                                </button>


                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-google"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-twitter"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-github"></i>
                                </button>
                            </div>



                        </div>
                        <Toaster />

                    </div >
                </ModalBody>
            </Modal>

            <Modal isOpen={signmodal} toggle={closesign} >
                <ModalBody>
                    <div className='position-relative'>
                        <img src={bg} width={'100%'} height={'590px'} />
                        <div className='container  m-auto  align-content-center  position-absolute text-light ' style={{ top: "0" }}>
                            <h2 className='text-center '>Sign Up</h2>


                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">User Name</label>
                                <input type="text" class="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' onChange={(e) => handlesignChange(e)} />

                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control bg-dark text-light" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => handlesignChange(e)} />
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <div className='position-relative'>
                                    <input type="password" class="form-control bg-dark text-light" id="exampleInputPassword1" name='password' onChange={(e) => handlesignChange(e)} />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                                <div className='position-relative'>
                                    <input type="password" class="form-control bg-dark text-light" id="exampleInputPassword1" name='confirmpassword' />
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary" onClick={handlesignSubmit}>Sign Up</button>


                            <div className='mt-3' style={{cursor:'pointer'}} onClick={reschange}>
                                Already Have An Account
                            </div>

                            <div className=' text-center me-4 mt-4 ms-4'>
                                <span className='ms-5 mx--5'>Sign In with Social Network</span>  <br />
                                <button type="button" class="btn btn-link btn-floating  ms-5 ">
                                    <i class="fa fa-facebook"></i>
                                </button>


                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-google"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-twitter"></i>
                                </button>

                                <button type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-github"></i>
                                </button>
                            </div>


                        </div>
                        <Toaster />
                    </div>

                </ModalBody>
            </Modal>

        </nav>




        </>
    )
}

export default Topbar