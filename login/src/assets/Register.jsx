import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [val,setVal]=useState({
        username:'',
        email: '',
        password: '',
        cpassword: ''
    })
    const navigate=useNavigate()
    const handleSubmission=(event)=>{
        event.preventDefault();
        //console.log(val)
        axios.post('http://localhost:8081/register',val)
        .then(res=>{
            if(res.data.Status==="Success"){
                navigate('/login')
            }
            else{
                alert("Error")
            }
            
        })
        .catch(err=>{console.log(err)})
    }
  return (
    <div className='reg'>


     <h2>Register</h2>
        <form id="registerForm" onSubmit={handleSubmission}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required
                onChange={e=>setVal({...val,username:e.target.value})}></input>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required
                onChange={e=>setVal({...val,email:e.target.value})}></input>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required
                onChange={e=>setVal({...val,password:e.target.value})}></input>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="cpassword" name="cpassword" required
                onChange={e=>setVal({...val,cpassword:e.target.value})}></input>
            </div>
            <button type='submit' className='link'onClick={handleSubmission}>Sign Up</button>
            <Link to="/login" className='link'>Login</Link>
        </form>
    </div>
  )
}

export default Register
