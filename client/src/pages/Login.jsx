import React from 'react'
import Wrapper from '../assets/wrappers/Login'
import customFetch from '../utils/customFetch';
import { Form, redirect, useNavigation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    await customFetch.post('/auth/login', data)
    return redirect('/dashboard')

}

const Login = () => {
    const navigate = useNavigate();

    const loginGuest = async () => {
        const data = { "email": 'guest@gmail.com', "password": 'theSecret' }
        try {
            await customFetch.post('/auth/login', data)
            toast.success('Take a test drive')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error?.response?.data?.msg)
            return error
        }

    }


    return (
        <Wrapper className='container-fluid h-100 d-flex justify-content-center align-items-center bg-dark'>
            <Form method='post' className='container-fluid bg-dark'>
                <div className='container p-0 mb-3 d-flex align-items-center'>
                    <i className="logo bi bi-dice-3-fill bg-dark text-danger me-3"></i>
                    <h1 className='fw-bold mt-2 text-danger logo'>TENZIES</h1>
                </div>
                <h1 className="h3 mb-3 fw-normal text-light">Let's Go!</h1>
                <div className="form-floating">
                    <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mt-3">
                    <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label text-light" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <div className="buttonContainer d-flex flex-column justify-content-center">
                    <button className="btn btn-danger mb-3" type="submit">Sign in</button>
                    <button className="btn btn-danger" onClick={loginGuest}>Demo User</button>
                </div>
            </Form>
        </Wrapper>
    )
}

export default Login