import React from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)

    await customFetch.post('/auth/register', data)
    return redirect('/login')
}

const Register = () => {
    return (
        <div style={{ minHeight: '100vh' }} className='h-100 d-flex justify-content-center align-items-center bg-dark'>
            <Form method='post' className='container-fluid'>
                <div className='container p-0 mb-3 d-flex align-items-center'>
                    <i className="logo bi bi-dice-3-fill bg-dark text-danger me-3"></i>
                    <h1 className='fw-bold mt-2 text-danger logo'>TENZIES</h1>
                </div>
                <h1 className="h3 mb-3 fw-normal text-light">Let's Go!</h1>
                <div className="form-floating">
                    <input name='firstName' type="text" className="form-control" id="floatingInputOne" placeholder="john" />
                    <label htmlFor="floatingInputOne">First Name</label>
                </div>
                <div className="form-floating mt-3">
                    <input name='lastName' type="text" className="form-control" id="floatingInputTwo" placeholder="doe" />
                    <label htmlFor="floatingInputTwo">Last Name</label>
                </div>
                <div className="form-floating mt-3">
                    <input name='location' type="text" className="form-control" id="floatingInputThree" placeholder="earth" />
                    <label htmlFor="floatingInputThree">Location</label>
                </div>
                <div className="form-floating mt-3">
                    <input name='username' type="text" className="form-control" id="floatingInputFour" placeholder="earth" />
                    <label htmlFor="floatingInputFour">Username</label>
                </div>
                <div className="form-floating mt-3">
                    <input name='email' type="email" className="form-control" id="floatingInputFive" placeholder="name@example.com" />
                    <label htmlFor="floatingInputFive">Email address</label>
                </div>
                <div className="form-floating mt-3">
                    <input name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label text-light" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <div className="buttonContainer d-flex flex-column justify-content-center">
                    <button className="btn btn-danger mb-3" type="submit">Submit</button>
                </div>
                <p className="mt-5 mb-3 text-center text-light">Already a member?<Link to='/login' className='text-danger text-decoration-none'> Login</Link></p>
            </Form>
        </div>
    )
}

export default Register