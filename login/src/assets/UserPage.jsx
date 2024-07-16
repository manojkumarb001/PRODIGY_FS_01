import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserPage() {
    const [name, setName] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8081/user')
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
            <h1>User  Page</h1>
            <h2>Welcomes You!!!</h2>
            <h3>You are LoggedIn as " {name} "</h3>
            <button className='link' onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default UserPage
