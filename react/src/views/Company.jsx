import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'

const Company = () => {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalResults, setTotalResults] = useState(0);

    const getCompanies = (curPage) => {
        setLoading(true);
        axiosClient.get(`/companies?page=${curPage}`).then(({ data }) => {
            setLoading(false);
            setCompanies(data.data);
            setTotalResults(data.meta.total);
            setPageSize(data.meta.per_page);
            setPage(data.meta.current_page)
        }).catch(err => {
            setLoading(false);
        })
    }
    useEffect(() => {
        getCompanies(page);
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

    const fetchNextPage = () => {
        if (!(page + 1 > Math.ceil(totalResults / pageSize))) {
            getCompanies(page + 1)
        }


    }
    const fetchPreviousPage = () => {
        if (page > 1) {
            getCompanies(page - 1)
        }
    }


    return (
        <div>
            <div className="main-content" >
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
                                <td>
                                    <img className="company-image"
                                        src={

                                            `${import.meta.env.VITE_API_BASE_URL}${c.logo != null ? '/storage/' + c.logo : '/images/default_placeholder.png'}`}
                                    />
                                </td>
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

                {!loading && <div className="pagination-btns">
                    <button disabled={page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={fetchPreviousPage}>&larr; Previous</button>

                    <button disabled={page + 1 > Math.ceil(totalResults / pageSize) ? true : false}
                        type="button" className="btn btn-dark" onClick={fetchNextPage}>Next &rarr;</button>
                </div>
                }

            </div>
        </div>
    )
}

export default Company