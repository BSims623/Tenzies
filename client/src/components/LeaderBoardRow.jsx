import React from 'react'
import Wrapper from '../assets/wrappers/LeaderboardRow'
import { Link } from 'react-router-dom'
import { useDashboardContext } from '../pages/Dashboard'



const numberOne = 'text-success'

const LeaderBoardRow = (props) => {
    const { setUserLookup } = useDashboardContext();

    return (
        <Wrapper className='row bg-dark'>
            <div className="col-2 py-2"><h4 className='my-0 ms-3 text-danger'>{props.rank}</h4></div>
            {/* <div className="col">{user.image ? <img src={user.image} alt='profile picture' /> : ''}</div> */}
            <div className="col-4 py-2 d-flex align-items-center justify-content-start"><div onClick={() => setUserLookup(props)} ><Link to='/dashboard/profile/lookup-user' className='text-decoration-none'><img className='me-2' src={props.avatar} alt="Profile Picture" /></Link></div><div onClick={() => setUserLookup(props)}><Link to='/dashboard/profile/lookup-user' className='text-decoration-none'><h4 className={`text-danger my-0 ${props.rank === 1 && 'text-decoration-underline'}`}>{props.username}</h4></Link></div></div>
            {/* <div className="col"><h4 className=''>{user.location}</h4></div> */}
            <div className="col py-2"><h4 className='my-0 text-danger'>{props.time}</h4></div>
            <div className="col py-2"><h4 className='my-0 ms-5 text-danger'>{props.rolls}</h4></div>
        </Wrapper >
    )
}

export default LeaderBoardRow