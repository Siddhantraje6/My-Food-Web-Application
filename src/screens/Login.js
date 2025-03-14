import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert(json.error)
        }
        else{
            localStorage.setItem("authtoken", json.authtoken);
            // console.log(localStorage.getItem("authtoken"));
            navigate("/");
        }
    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
                    <div className="form-text">password must be atleast 5 characters long</div>
                </div>

                <button type="submit" className="m-3 btn btn-primary">Login</button>
                <Link to={'/Signup'} className='m-3 btn btn-danger'>New User? Signup</Link>
            </form>
        </div>
    )
}