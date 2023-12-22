import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/Profile'
import { useDashboardContext } from './Dashboard'
import { Link, useNavigate } from 'react-router-dom'
import customFetch from '../utils/customFetch'

const userProfile = () => {
    const { user, setUser, convertTime, convertDate, fullLeaderboard } = useDashboardContext();
    //const [currentUser, setCurrentUser] = useState(user);
    // const navigate = useNavigate();

    let currentUser = getUserRank(user.username) || user;
    console.log(currentUser);


    function getUserRank(userName) {
        return fullLeaderboard.map((user, index) => {
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
                <h2>PERSONAL RECORD TIME: {currentUser.time ? convertTime(user.time) : 'No best time'}</h2>
                <h2>RECORD ROLLS: {currentUser.rolls ? currentUser.rolls : 'No Rolls'}</h2>
                <h2>GAMES PLAYED: {currentUser.gamesPlayed}</h2>
                <h2>MEMBER SINCE: {convertDate(currentUser.createdAt)}</h2>
                <div className="buttonContainer mt-4 d-flex flex-column justify-content-center">
                    <Link to='edit-profile' className='btn btn-danger' type="button">Edit User</Link >
                </div>
            </div>
        </Wrapper>
    )
}

export default userProfile