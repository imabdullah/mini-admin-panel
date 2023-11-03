import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'

const Company = () => {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCompanies = () => {
        console.log("companins..")
        setLoading(true);
        axiosClient.get('companies').then(({ data }) => {
            console.log(data);
            setLoading(false);
            setCompanies(data.data);
            console.log(companies);
        }).catch(err => {
            setLoading(false);
        })
    }
    useEffect(() => {
        getCompanies();
    }, [])

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return
        }
        axiosClient.delete(`/companies/${u.id}`).then(() => {
            //TODO: SHOW USER DELETED
            getCompanies();
        })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Companies</h1>
                <Link to="/companies/add" className='btn-add'>Add New</Link>
            </div>

            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Logo</td>
                            <td>Name</td>
                            <td>Website</td>
                            <td>Email</td>
                            <td>Created at</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    {
                        loading && <tbody>
                            <tr>
                                <td colSpan="6" className='text-center'>Loading...</td>
                            </tr>
                        </tbody>
                    }
                    {!loading && <tbody>
                        {companies.map(c => (

                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td><img className="company-image" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${c.logo}`} /></td>
                                <td>{c.name}</td>
                                <td>{c.website}</td>
                                <td>{c.email}</td>
                                <td>{c.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/companies/' + c.id}>Edit</Link> &nbsp;
                                    <button onClick={ev => onDelete(c)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>

            </div>
        </div>
    )
}

export default Company