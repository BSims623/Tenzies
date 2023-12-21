import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/Profile'
import img from "/Users/briansims/Desktop/MyTenzies/client/src/assets/images/avatarDefault.jpg"
import { useDashboardContext } from './Dashboard'
import { Link, useNavigate } from 'react-router-dom'
import customFetch from '../utils/customFetch'

const userProfile = () => {
    const { user, setUser, convertTime, convertDate, fullLeaderboard } = useDashboardContext();
    const [currentUser, setCurrentUser] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            const { data } = await customFetch.get('users/current-user')
            let updateCurrentUser = getUserRank(data.user.username)
            if (!updateCurrentUser) updateCurrentUser = user
            setUser(updateCurrentUser)
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
                <img className='mt-5' src={user.avatar} alt="Profile Picture" />
                <h1 className='text-center mt-3 mb-5'>{user.username}</h1>
            </div>
            <div className="infoContainer">
                <h2>FIRST NAME: {user.firstName}</h2>
                <h2>LAST NAME: {user.lastName}</h2>
                <h2>LOCATION: {user.location}</h2>
                <h2>RANK: {user.rank > 0 ? user.rank : 'Not Ranked'}</h2>
                <h2>PERSONAL RECORD TIME: {user.time ? convertTime(user.time) : 'No best time'}</h2>
                <h2>RECORD ROLLS: {user.rolls ? user.rolls : 'No Rolls'}</h2>
                <h2>GAMES PLAYED: {user.gamesPlayed}</h2>
                <h2>MEMBER SINCE: {convertDate(user.createdAt)}</h2>
                <div className="btnContainer">
                    <Link to='edit-profile' className='btn btn-danger' type="button">Edit User</Link >
                </div>
            </div>
        </Wrapper>
    )
}

export default userProfile