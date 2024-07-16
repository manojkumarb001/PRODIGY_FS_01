import axios from 'axios'
import React, { useEffect, useState } from 'react'


function AdminPage() {
    const [name, setName] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8081/admin')
            .then(
                res => {
                    if (res.data.Status === "Success") {
                        setName(res.data.name)
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
        <div className='page'>
            <header>ABC iNC</header>
            <h1>Admin Page</h1>
            <h2>Welcomes You!!!</h2>
            <h3>You are Authorized as " {name} "</h3>
            <button className='link' onClick={handleLogout}>Log Out</button>
        </div>



    )
}

export default AdminPage
