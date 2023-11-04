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

        axiosClient.get('/user').then(({ data }) => {
            setUser(data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/companies">Companies</Link>
                <Link to="/employees">Employees</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        {import.meta.env.VITE_APP_NAME}
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
