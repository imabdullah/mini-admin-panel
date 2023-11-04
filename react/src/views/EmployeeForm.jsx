import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'

export const EmployeeForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [companies, setCompany] = useState([])
    const [employee, setEmployee] = useState({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: {},
    })

    if (id) {
        useEffect(() => {
            setLoading(true)

            axiosClient.get(`/employees/${id}`).then(({ data }) => {
                setLoading(false)
                setEmployee(data.data)

            }).catch(() => {
                setLoading(false)
            })

            getCompanies();
        }, [id])
    }

    const getCompanies = () => {
        console.log("getiiing... coompanies")
        axiosClient.get('/companies').then(({ data }) => {
            setCompany(data.data)
        })
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (employee.id)
            axiosClient.put(`/employees/${employee.id}`, employee).then(() => {
                //Todo: Show notificaiton
                navigate('/employees')
            }).catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data)
                }
            })

        else
            axiosClient.post('/employees', employee).then(() => {
                navigate('/employees')
            }).catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data)
                }
            })
    }

    return (
        <>
            {employee.id && <h1>Update Employee:</h1>}
            {!employee.id && <h1>New Employee</h1>}

            <div className='card animated fadeInDown'>
                {loading && (
                    <div className='text-center'>Loading...</div>
                )}

                {errors && <div className='alert'>
                    <p>{errors.message}</p>

                </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input type='text' placeholder='First Name' value={employee.first_name} onChange={ev => setEmployee({ ...employee, first_name: ev.target.value })} />
                        <input type='text' placeholder='First Name' value={employee.last_name} onChange={ev => setEmployee({ ...employee, last_name: ev.target.value })} />
                        <input type="email" onChange={ev => setEmployee({ ...employee, email: ev.target.value })} value={employee.email} placeholder='Email' />
                        <input type='tel' onChange={ev => setEmployee({ ...employee, phone: ev.target.value })} value={employee.phone} placeholder='Phone' />
                        <label>Select Company</label>
                        <select onChange={ev => setEmployee({ ...employee, company_id: ev.target.value })} >
                            {companies.map((company, index) => (
                                <option key={index} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                        <button className='btn btn-save'>Save</button>
                    </form>
                }
            </div>
        </>
    )
}
