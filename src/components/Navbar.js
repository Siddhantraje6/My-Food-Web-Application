import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../modal';
import Cart from '../screens/Cart';
import {useCart, useDispatchCart} from './ContextReducer'

export default function Navbar() {
    let data = useCart()

    const [cartView, setCartView] = useState(false)

    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.removeItem("authtoken");
        navigate("/");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand fs-2" to="/">MyFood</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-item nav-link active fs-5" to="/">Home</Link>
                        {(localStorage.getItem("authtoken")) ?
                            <Link className="nav-item nav-link active fs-5" to="/">My orders</Link>
                            : ""}
                    </div>
                    {(!localStorage.getItem("authtoken")) ?
                        <div className='navbar-nav d-flex'>
                            <Link className="nav-item nav-link active fs-5" to="/Login">Login</Link>
                            <Link className="nav-item nav-link active fs-5" to="/Signup">SignUp</Link>
                        </div>
                        :
                        <div className='d-flex'>
                            <div className='btn active fs-5 text-light mx-2' onClick={() => {setCartView(true)}}>
                                Cart
                                
                                {data.length !== 0 ? <Badge pill bg='danger'>{data.length}</Badge>
                                : <div></div>
                                }
                            </div>

                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : null}

                            <div className='btn active fs-5 text-light mx-2' onClick={handelLogout}>Logout</div>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
} 