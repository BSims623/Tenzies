import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    console.log(error);
    console.log(error.response.data.msg);
    const errorMessage = error.response.data.msg;

    return (
        <div className='vh-100 d-flex flex-column align-items-center justify-content-center bg-dark'>
            <h1 className='text-light'>{errorMessage ? errorMessage : 'Something went wrong...'}</h1>
            <Link to='/' className='btn btn-danger'>Back Home</Link>
        </div>
    )
}

export default Error