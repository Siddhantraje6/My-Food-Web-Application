import React, {useState} from 'react'
import {Link} from 'react-router-dom'


export default function Signup() {

    const [credentials, setcredentials] = useState({name:"", email:"", password:"", location:""})

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/api/createuser', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name: credentials.name, email:credentials.email, password:credentials.password, location:credentials.location})
        })
        const json = await response.json()
        console.log(json);

        if(!json.success) {
            alert("enter valid credentials")
        }
    }
    const onChange = (event) => {
        setcredentials({...credentials, [event.target.name]:event.target.value})
    }


    return (
        <div className='container'>
            <form onSubmit = {handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange}/>
                    <div className="form-text">name must be atleast 5 characters long</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}/>
                    <div className="form-text">password must be atleast 5 characters long</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" name='location' value={credentials.location} id="location" onChange={onChange}/>
                </div>

                <button type="submit" className="m-3 btn btn-primary">Signup</button>
                <Link to={'/Login'} className='m-3 btn btn-danger'>Return to Login</Link>
            </form>
        </div>
    )
}