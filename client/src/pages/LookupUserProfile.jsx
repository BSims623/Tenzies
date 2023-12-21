import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/Profile'
import { useDashboardContext } from './Dashboard'
import { Link, useNavigate } from 'react-router-dom'
import customFetch from '../utils/customFetch'

const LookupUserProfile = () => {
    const { user, userLookup, convertTime, convertDate, fullLeaderboard } = useDashboardContext();
    const [currentUser, setCurrentUser] = useState(userLookup);
    const navigate = useNavigate();
    console.log(userLookup);

    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            //const { data } = await customFetch.get('users/current-user')
            let updateCurrentUser = getUserRank(userLookup.username)
            if (!updateCurrentUser) updateCurrentUser = user
            setCurrentUser(updateCurrentUser)
        }
        fetchDataAndUpdate()
        // let updateCurrentUser = getUserRank(user.username)
        // if (!updateCurrentUser) updateCurrentUser = user
        // setUser(updateCurrentUser)
    }, [navigate])

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
                <h2>PERSONAL RECORD TIME: {currentUser.time ? convertTime(currentUser.time) : 'No best time'}</h2>
                <h2>RECORD ROLLS: {currentUser.rolls ? user.rolls : 'No Rolls'}</h2>
                <h2>GAMES PLAYED: {currentUser.gamesPlayed}</h2>
                <h2>MEMBER SINCE: {convertDate(currentUser.createdAt)}</h2>
                <div className={`btnContainer ${user.username !== currentUser.username && 'd-none'}`}>
                    <Link to='/dashboard/profile/edit-profile' className='btn btn-danger' type="button">Edit User</Link >
                </div>
            </div>
        </Wrapper>
    )
}

export default LookupUserProfile