import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LeaderBoardRow } from '../components';

const statsQuery = {
    queryKey: ['stats'],
    queryFn: async () => {
        const fullLeaderboardData = await customFetch.get('leaderboard/get-leaderboard');
        const topTenLeaderboard = await customFetch.get('leaderboard/get-leaderboard?limit=10')
        const { data } = await customFetch.get('users/current-user');
        return { currentUser: data.user, leaderboard: fullLeaderboardData.data.leaderboard, topTen: topTenLeaderboard.data.leaderboard };
    },
};

export const loader = (queryClient) => async () => {
    try {
        const data = await queryClient.ensureQueryData(statsQuery);
        return null;
    } catch (error) {
        return redirect('/')
    }
}

const DashboardContext = createContext();

const Dashboard = ({ queryClient }) => {
    const navigate = useNavigate();
    const { data } = useQuery(statsQuery);
    const user = data.currentUser;
    const { topTen } = data;
    const { leaderboard } = data;
    //const [user, setUser] = useState(currentUser)
    const [fullLeaderboard, setFullLeaderboard] = useState(leaderboard);
    // const [topTen, setTopTen] = ([])
    const [userLookup, setUserLookup] = useState(user)

    const logoutUser = async () => {
        navigate('/');
        await customFetch.get('/auth/logout');
        queryClient.invalidateQueries();
        toast.success('logging out...');
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
            queryClient.invalidateQueries();
            topTenRows = topTen.map((user, index) => {
                return <LeaderBoardRow key={user._id} rank={index + 1} avatar={user.avatar} username={user.username} location={user.location} time={user.time} rolls={user.rolls} />
            })
        } catch (error) {
            console.log(error);
            return error
        }
    }

    let topTenRows = topTen.map((user, index) => {
        console.log(user.avatar);
        return <LeaderBoardRow key={user._id} rank={index + 1} avatar={user.avatar} username={user.username} location={user.location} time={user.time} rolls={user.rolls} />
    })

    const convertDate = (date) => {
        const newDate = new Date(date);
        const formattedDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;

        return formattedDate
    }



    return (
        <DashboardContext.Provider value={{ user, topTenRows, leaderboard, userLookup, setUserLookup, fullLeaderboard, getFullLeaderboard, setFullLeaderboard, convertTime, convertDate, logoutUser }}>
            <Navbar />
            <Outlet context={{ user }} />
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard