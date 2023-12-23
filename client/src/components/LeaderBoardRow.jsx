import React from 'react'
import Wrapper from '../assets/wrappers/LeaderboardRow'
import { Link } from 'react-router-dom'
import { useDashboardContext } from '../pages/Dashboard'



const numberOne = 'text-success'

const LeaderBoardRow = (props) => {
    const { setUserLookup, convertTime } = useDashboardContext();

    return (
        <Wrapper className='row bg-dark'>
            <div className="col-2 py-2"><p className='my-0 ms-3 text-danger'>{props.rank}</p></div>
            <div className="col-5 py-2 d-flex align-items-center justify-content-start"><div onClick={() => setUserLookup(props)} ><Link to='/dashboard/profile/lookup-user' className='text-decoration-none'><img className='me-2' src={props.avatar} alt="Profile Picture" /></Link></div><div onClick={() => setUserLookup(props)}><Link to='/dashboard/profile/lookup-user' className='text-decoration-none'><p className={`text-danger my-0 ${props.rank === 1 && 'text-decoration-underline'}`}>{props.username}</p></Link></div></div>
            <div className="col py-2"><p className='my-0 text-danger'>{convertTime(props.time)}</p></div>
            <div className="col py-2"><p className='my-0 ms-3 text-danger'>{props.rolls}</p></div>
        </Wrapper >
    )
}

export default LeaderBoardRow