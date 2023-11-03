import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'


export const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext()
    if (!token) {
        return <Navigate to="/login" />
    }
    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout').then(() => {
            setUser({})
            setToken(null)
        })
    }
    useEffect(() => {

        // var config = {
        //     method: 'get',
        //     url: 'http://localhost:8000/api/user',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        //     }
        // }
        //const res = axios(config);

        console.log("callledd");
        console.log(localStorage.getItem('ACCESS_TOKEN'))

        axiosClient.get('/user').then(({ data }) => {
            console.log(data)
            setUser(data)
        }).catch(err => {
            console.log("im err")
            console.log(err)
        })
    }, [])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/dashboard">Companies</Link>
                <Link to="/dashboard">Employees</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

        </div>
    )
}
