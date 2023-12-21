import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../assets/wrappers/Game'
import { nanoid } from 'nanoid'
import Die from '../components/Die'
import { GameContainer, LeaderBoardContainer } from '../components'
import { Link, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'


const Game = () => {
    // const [topTen, setTopTen] = useState(useLoaderData())

    // const getTopTen = async () => {
    //     try {
    //         const { data } = await customFetch.get('/leaderboard/get-leaderboard?limit=10')
    //         return data.leaderboard
    //     } catch (error) {
    //         console.log(error);
    //         return error
    //     }
    // }

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