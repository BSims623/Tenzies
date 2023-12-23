import React from 'react'
import Wrapper from '../assets/wrappers/Game'
import { GameContainer, LeaderBoardContainer } from '../components'
import { Link } from 'react-router-dom'

const Game = () => {

    return (
        <Wrapper className='d-flex flex-column align-items-center'>
            <GameContainer />
            <h1 className=' mt-5 text-light'>TOP TEN</h1>
            <LeaderBoardContainer />
            <Link to='leaderboard' className='btn btn-danger my-4 text-light'>View Full Leaderboard</Link>
        </Wrapper>
    )
}

export default Game