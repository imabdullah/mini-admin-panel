import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'

const CompanyForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    const [company, setCompany] = useState({
        id: null,
        name: '',
        email: '',
        website: '',
        logo: null,
    })
    if (id) {
        useEffect(() => {
            setLoading(true)

            axiosClient.get(`/companies/${id}`).then(({ data }) => {
                setLoading(false)
                setCompany(data.data)

            }).catch(() => {
                setLoading(false)
            })
        }, [id])
    }

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        setCompany({ ...company, logo: file });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (company.id)
            axiosClient.put(`/companies/${company.id}`, company).then(() => {
                //Todo: Show notificaiton
                navigate('/companies')
            }).catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data)
                }
            })

        else
            axiosClient.post('/companies', company, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                },
            }).then(() => {
                navigate('/companies')
            }).catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data)
                }
            })
    }
    return (
        <>
            {company.id && <h1>Update Company: {company.name}</h1>}
            {!company.id && <h1>New Company</h1>}
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
                        <input onChange={ev => setCompany({ ...company, name: ev.target.value })} value={company.name} placeholder='Name' />
                        <input type="email" onChange={ev => setCompany({ ...company, email: ev.target.value })} value={company.email} placeholder='Email' />
                        <input onChange={ev => setCompany({ ...company, website: ev.target.value })} value={company.website} placeholder='Website' />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button className='btn btn-save'>Save</button>
                    </form>
                }
            </div>
        </>
    )
}

export default CompanyForm