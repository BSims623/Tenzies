import React, { useState } from 'react'
import { LeaderBoardLegend, LeaderBoardRow } from '../components'
import FullWrapper from '../assets/wrappers/FullLeaderBoard'
import Wrapper from '../assets/wrappers/LeaderBoard'
import { Link } from 'react-router-dom'
import { useDashboardContext } from '../pages/Dashboard'


const FullLeaderBoard = () => {
    const { user, leaderboard, convertTime, fullLeaderboard } = useDashboardContext()

    const fullLeaderboardRows = leaderboard.map((user, index) => {
        return <LeaderBoardRow key={user._id} rank={index + 1} avatar={user.avatar} username={user.username} location={user.location} time={user.time} rolls={user.rolls} />
    })

    return (
        <FullWrapper className='container-fluid'>
            <Wrapper>
                <LeaderBoardLegend />
                {fullLeaderboardRows}
                <div className="buttonContainer mt-4 d-flex flex-column justify-content-center">
                    <Link to='/dashboard' className='btn btn-primary mb-3' type="button">Back To Game</Link >
                </div>
            </Wrapper>
        </FullWrapper>
    )
}

export default FullLeaderBoard