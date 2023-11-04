
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalResults, setTotalResults] = useState(0);

    const getEmployees = (curPage) => {
        setLoading(true);
        axiosClient.get(`/employees?page=${curPage}`).then(({ data }) => {
            setLoading(false);
            setEmployees(data.data);
            setTotalResults(data.meta.total);
            setPageSize(data.meta.per_page);
            setPage(data.meta.current_page)
        }).catch(err => {
            setLoading(false);
        })
    }
    useEffect(() => {
        getEmployees(page);
    }, [])

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return
        }
        axiosClient.delete(`/employees/${u.id}`).then(() => {
            getEmployees();
        })
    }

    const fetchNextPage = () => {
        if (!(page + 1 > Math.ceil(totalResults / pageSize))) {
            getEmployees(page + 1)
        }


    }
    const fetchPreviousPage = () => {
        if (page > 1) {
            getEmployees(page - 1)
        }
    }


    return (
        <div>
            <div className="main-content" >
                <h1>Employees</h1>
                <Link to="/employees/add" className='btn-add'>Add New</Link>
            </div>

            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Full Name</td>
                            <td>Company</td>
                            <td>Phone</td>
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
                        {employees.map(e => (

                            <tr key={e.id}>
                                <td>{e.id}</td>

                                <td>{e.first_name}{e.last_name}</td>
                                <td>{e.company.name}</td>
                                <td>{e.phone}</td>
                                <td>{e.email}</td>
                                <td>{e.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/employees/' + e.id}>Edit</Link> &nbsp;
                                    <button onClick={ev => onDelete(e)} className="btn-delete">Delete</button>
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

export default Employee