import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'





function LoginPage() {
    const [val, setVal] = useState({

        username: '',
        password: '',

    })
    const navigate = useNavigate();
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', val)
            .then(res => {
                //console.log(res)
                if (res.data.Status === "Success") {
                    navigate('/')
                }

                else {
                    alert("Error")
                }


            })
            .catch(err => { console.log(err) })
    }
    return (
        <div className='reg'>
            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required
                        onChange={e => setVal({ ...val, username: e.target.value })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required
                        onChange={e => setVal({ ...val, password: e.target.value })}></input>
                </div><br />
                <button type='submit' className='link' onClick={handleSubmit}>Sign Up</button>
                <Link to="/register" className='link'>Create Account</Link>
            </form>

        </div>
    )
}

export default LoginPage
