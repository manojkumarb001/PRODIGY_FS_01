import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AdminPage from './AdminPage'
import UserPage from './UserPage'


function Home() {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(
        res => {
          if (res.data.Status === "Success") {
            setAuth(true)
            setName(res.data.name)
          }
          else {
            setAuth(false)
            setMessage(res.data.Error)

          }
        }
      )
      .catch(err => console.log(err))
  }

  )


  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        location.reload(true)
      })
      .catch(err => console.log(err)
      )
  }

  return (
    <div>



      {
        auth ?
          name == 'admin' ?
            <div>

              <AdminPage />
            </div> : <div>

              <UserPage/>
            </div> :
          <div>

            <h1>Homepage</h1>
            <h2>Welcomes You!!!</h2>

        
            <h3>{message}</h3>

            <h3>Login Now</h3>
            <Link to="/login" className='link'>Login</Link>

            
          </div>
      }
    </div>
  )
}

export default Home
