import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../assets/wrappers/GameContainer'
import { nanoid } from 'nanoid'
import Die from '../components/Die'
import { useDashboardContext } from '../pages/Dashboard'
import customFetch from '../utils/customFetch'


const GameContainer = () => {
    const { user, convertTime, getFullLeaderboard } = useDashboardContext();
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [count, setCount] = useState(0);
    const [newGame, setNewGame] = useState(true)
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const startTimeRef = useRef(null);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allTheSame = dice.every((die) => die.value === firstValue);
        if (allHeld && allTheSame) {
            setIsRunning(false)
            setTenzies(true)
        }
    }, [dice])

    useEffect(() => {
        if (tenzies) updateUser()
    }, [tenzies])

    ////// TIME ////////

    useEffect(() => {
        let requestRef;

        const animate = (timestamp) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsedTime = timestamp - startTimeRef.current;
            if (isRunning) {
                setTime(Math.floor(elapsedTime / 10));
            }

            requestRef = requestAnimationFrame(animate);
        };

        if (isRunning) {
            requestRef = requestAnimationFrame(animate);
        }

        return () => {
            cancelAnimationFrame(requestRef);
            startTimeRef.current = null;
        };
    }, [isRunning, setTime]);

    const minutes = Math.floor((time / 6000)) % 60;

    const seconds = Math.floor((time / 100)) % 60;

    const milliseconds = (time % 100);

    ////// Best Time ////////

    function newBestTime(updatedUser) {
        if ((updatedUser.time - time) > 0 || updatedUser.time === undefined) {
            updatedUser.time = time;
            updatedUser.rolls = count;
        }
        return updatedUser
    }

    const styles = {
        color: isRunning ? '#dc3545' : '#f8f9fa'
    }

    ///////////////////////////

    async function updateUser() {
        const updatedUser = { ...user };
        updatedUser.gamesPlayed = user.gamesPlayed + 1;
        newBestTime(updatedUser);

        try {
            const newUser = await customFetch.patch('/users/update-guest', updatedUser);
            getFullLeaderboard();
        } catch (error) {
            console.log(error);
            return error
        }
    }


    function randomNumber() {
        return Math.ceil(Math.random() * 6)
    }

    function allNewDice() {
        const newArr = [];
        for (let i = 1; i < 11; i++) {
            const newDie = {
                value: randomNumber(),
                isHeld: false,
                id: nanoid()
            }
            newArr.push(newDie)
        }
        return newArr
    }

    function holdDie(id) {
        if (!isRunning && !tenzies) {
            setIsRunning(!isRunning)
        } else if (!tenzies) {
            setDice(prevDice => prevDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die
            }));
        }
    }

    function rollTheDice() {
        if (newGame) setNewGame(false)
        if (tenzies) {
            setNewGame(true)
            setTenzies(false)
            setDice(allNewDice())
            setCount(0)
            setTime(0)
        } else {
            setCount(count + 1)
            setDice(prevDice => prevDice.map((die) => {
                return die.isHeld ? die : { ...die, value: randomNumber() }
            }))
        }
        if (!isRunning && !tenzies) {
            setIsRunning(!isRunning)
        }
    }

    let diceElements = dice.map((die) => {
        return <Die value={die.value} isHeld={die.isHeld} key={die.id} id={die.id} holdDie={holdDie} />
    });

    return (
        <Wrapper className="mainContainer d-flex flex-column align-items-center py-4 px-2 rounded bg-dark">
            <h1 className='display-5 fw-bold lh-1 text-center text-danger'>{tenzies ? 'You Won!!!' : 'Tenzies'}</h1>
            <h5 className='text-center text-light mx-3'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. And one more thing... Go FAST!</h5>
            <div className="container mt-5 text-light">
                <div className="row">
                    <div className="col">
                        <h4>ROLL#<span className='ms-2' style={styles}>{count}</span></h4>
                    </div>
                    <div className="col">
                        <h4>TIME: <span style={styles}>{minutes.toString().padStart(1, "0")}:{seconds.toString().padStart(2, "0")}:{milliseconds.toString().padStart(2, "0")}</span></h4>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <h4 className='text-primary'>RECORD ROLLS</h4>
                    </div>
                    <div className="col">
                        <h4 className='text-primary'>RECORD TIME</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4 className='text-primary'>{user.rolls > 0 ? user.rolls : 'No Rolls'}</h4>
                    </div>
                    <div className="col">
                        <h4 className='text-primary'>{user.time !== undefined ? convertTime(user.time) : 'No Time'}</h4>
                    </div>
                </div>
            </div>
            <div className={newGame ? 'diceContainer mt-5 bg-danger rounded position-relative d-flex justify-content-center align-items-center' : "diceContainer mt-5 bg-danger rounded"}>
                {newGame ? <h1>Ready?</h1> : diceElements}
            </div>
            <button className='rollBtn btn btn-danger mt-3 px-5 py-3' type="button" onClick={() => rollTheDice()}>{tenzies ? 'NEW GAME' : 'ROLL'}</button>

        </Wrapper>
    )
}

export default GameContainer