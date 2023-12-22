import React from 'react'
import Wrapper from '../assets/wrappers/Profile'
import { useDashboardContext } from './Dashboard'
import { Link } from 'react-router-dom'

const LookupUserProfile = () => {
    const { user, userLookup, convertTime, convertDate, leaderboard } = useDashboardContext();


    let currentUser = getUserRank(userLookup.username) || user;

    function getUserRank(userName) {
        return leaderboard.map((user, index) => {
            user.rank = index + 1;
            return user
        }).find(user => user.username === userName)
    }

    return (
        <Wrapper className='text-light'>
            <div className="imgContainer">
                <img className='mt-5' src={currentUser.avatar} alt="Profile Picture" />
                <h1 className='text-center mt-3 mb-5'>{currentUser.username}</h1>
            </div>
            <div className="infoContainer">
                <h2>FIRST NAME: {currentUser.firstName}</h2>
                <h2>LAST NAME: {currentUser.lastName}</h2>
                <h2>LOCATION: {currentUser.location}</h2>
                <h2>RANK: {currentUser.rank > 0 ? currentUser.rank : 'Not Ranked'}</h2>
                <h2>PERSONAL RECORD TIME: {currentUser.time ? convertTime(currentUser.time) : 'No best time'}</h2>
                <h2>RECORD ROLLS: {currentUser.rolls ? user.rolls : 'No Rolls'}</h2>
                <h2>GAMES PLAYED: {currentUser.gamesPlayed}</h2>
                <h2>MEMBER SINCE: {convertDate(currentUser.createdAt)}</h2>
                <div className="buttonContainer mt-4 d-flex flex-column justify-content-center">
                    <Link to='/dashboard/profile/edit-profile' className={`btn btn-danger mb-3 ${user.username !== currentUser.username && 'd-none'}`} type="button">Edit User</Link >
                    <Link to='/dashboard/leaderboard' className='btn btn-primary mb-3' type="button">Full Leaderboard</Link >
                </div>
            </div>
        </Wrapper>
    )
}

export default LookupUserProfile