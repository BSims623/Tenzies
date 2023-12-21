import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/LeaderBoard'
import { topTenLeaderData } from '../utils/mockLeaderboardData'
import { LeaderBoardLegend, LeaderBoardRow } from '.'
import { useDashboardContext } from '../pages/Dashboard'


const LeaderBoardContainer = () => {
    const { convertTime, fullLeaderboard } = useDashboardContext();

    const topTen = fullLeaderboard.slice(0, 10)


    const topTenRows = topTen.map((user, index) => {
        return <LeaderBoardRow key={user._id} rank={index + 1} avatar={user.avatar} username={user.username} location={user.location} time={convertTime(user.time)} rolls={user.rolls} />
    })


    return (
        <Wrapper className='container mt-3 rounded'>
            <LeaderBoardLegend className='legend' />
            {topTenRows}
        </Wrapper>
    )
}

export default LeaderBoardContainer