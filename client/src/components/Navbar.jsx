import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Navbar'
import { useDashboardContext } from '../pages/Dashboard'

const Navbar = () => {
    const { user, logoutUser } = useDashboardContext();


    return (
        <Wrapper className="navbar navbar-expand-lg" aria-label="Thirteenth navbar example">
            <div className="container-fluid">
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                    <Link className="navbar-brand col-lg-3 me-0" to="/dashboard">
                        <div className='p-0 mb-3 d-flex align-items-center'>
                            <i className="logo bi bi-dice-3-fill text-danger me-3"></i>
                            <h1 className='fw-bold mt-2 text-danger logo'>TENZIES</h1>
                        </div>
                    </Link>
                    <ul className="navbar-nav col-lg-6 justify-content-lg-center">
                        <li className="nav-item mx-2">
                            <Link className="nav-link active text-danger" aria-current="page" to="/dashboard">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link text-danger" to="leaderboard">View Leaderboard</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav col-lg-3 justify-content-lg-end">

                        <Link to='profile' className="profileBtn btn text-danger my-2 mx-2 d-flex justify-content-center"><img className='me-2' src={user.avatar} alt="Profile Picture" />{user.username}</Link>
                        <button className="btn btn-danger my-2 mx-2" onClick={() => logoutUser()}>Logout</button>
                    </ul>

                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar