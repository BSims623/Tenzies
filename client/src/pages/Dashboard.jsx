import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import customFetch from '../utils/customFetch';

export const loader = async () => {
    try {
        const leaderboardData = await customFetch.get('leaderboard/get-leaderboard');
        const { data } = await customFetch.get('users/current-user')
        return { currentUser: data.user, leaderboard: leaderboardData.data.leaderboard }
    } catch (error) {
        return redirect('/')
    }
}

const DashboardContext = createContext();

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useLoaderData();
    const { leaderboard } = useLoaderData();
    const [user, setUser] = useState(currentUser)
    const [fullLeaderboard, setFullLeaderboard] = useState(leaderboard)
    const [userLookup, setUserLookup] = useState(currentUser)

    const logoutUser = async () => {
        navigate('/')
        await customFetch.get('/auth/logout')
    }

    const convertTime = (time) => {
        const minutes = Math.floor((time / 6000)) % 60;
        const seconds = Math.floor((time / 100)) % 60;
        const milliseconds = (time % 100);

        let timeDisplay = `${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`
        return timeDisplay
    }

    const getFullLeaderboard = async () => {
        try {
            const currentUser = await customFetch.get('users/current-user')
            const { data } = await customFetch.get('leaderboard/get-leaderboard?limit=10')
            setFullLeaderboard(data.leaderboard)
            setUser(currentUser.data.user)
        } catch (error) {
            console.log(error);
            return error
        }
    }

    const updateUser = (updatedUser) => {
        setUser(updateUser)
    }

    const convertDate = (date) => {
        const newDate = new Date(date);
        const formattedDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;

        return formattedDate
    }



    return (
        <DashboardContext.Provider value={{ user, setUser, userLookup, setUserLookup, fullLeaderboard, getFullLeaderboard, setFullLeaderboard, logoutUser, convertTime, convertDate }}>
            <Navbar />
            <Outlet context={{ user }} />
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard