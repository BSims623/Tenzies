import React, { useState } from 'react'
import { LeaderBoardLegend, LeaderBoardRow } from '../components'
import FullWrapper from '../assets/wrappers/FullLeaderBoard'
import Wrapper from '../assets/wrappers/LeaderBoard'
import { useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { useDashboardContext } from '../pages/Dashboard'


// export const loader = async () => {
//     try {
//         const { data } = await customFetch.get('/leaderboard/get-leaderboard')
//         return data.leaderboard
//     } catch (error) {
//         console.log(error);
//         return error
//     }
// }


const FullLeaderBoard = () => {
    //const [leaderboard, setLeaderboard] = useState(useLoaderData())
    const { user, convertTime, fullLeaderboard } = useDashboardContext()

    const fullLeaderboardRows = fullLeaderboard.map((user, index) => {
        return <LeaderBoardRow key={user._id} rank={index + 1} avatar={user.avatar} username={user.username} location={user.location} time={convertTime(user.time)} rolls={user.rolls} />
    })

    return (
        <FullWrapper className='container-fluid'>
            <Wrapper>
                <LeaderBoardLegend />
                {fullLeaderboardRows}
            </Wrapper>
        </FullWrapper>
    )
}

export default FullLeaderBoard