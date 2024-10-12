import React from 'react'
import './Entered.css'
import axios from 'axios';
function Entered({ name, firstElement }): JSX.Element {
    const api = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3000/",
      });
    const logout = () => {
        api.post("/logout")
        localStorage.removeItem('access')
        location.reload()
    }
    return (
        <>

            <div className="entered">
                <div className="user">
                    <div className="icon_name">{firstElement}</div>
                    <p className="name">{name}</p>
                </div>
                <div className="login">
                    <p onClick={logout}>Выход</p>
                </div>
            </div>

        </>
    )
}

export default Entered