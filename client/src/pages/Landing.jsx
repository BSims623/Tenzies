import React from 'react'
import Wrapper from '../assets/wrappers/Landing'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <Wrapper className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <div className='container-fluid position-fixed top-0 d-flex align-items-center'>
                <i className="bi bi-dice-3-fill mx-3 text-danger"></i>
                <h1 className='fw-bold mt-2 text-danger logo'>TENZIES</h1>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center">
                <div className="content d-flex flex-column justify-content-center">
                    <h1 className='display-5 fw-bold lh-1 text-center text-light my-5'>Welcome to <span className='text-danger'>Tenzies</span>!</h1>
                    <div className="buttonContainer d-flex justify-content-center my-5">
                        <Link to='/register' className='btn btn-primary mx-2'>Register</Link>
                        <Link to='/login' className='btn btn-danger mx-2'>Login / Demo</Link>
                    </div>
                </div>
                <div className="imgContainer">
                    <img className='rounded' src="./Dice.jpg" alt="Two Red dice with a black backround." />
                </div>
            </div>
        </Wrapper>
    )
}

export default Landing