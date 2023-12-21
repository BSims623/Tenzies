import React from 'react'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from './index'


const Die = (props) => {

    const styles = {
        background: props.isHeld ? '#dc3545' : '#f8f9fa'
    }

    const renderDice = (props) => {
        switch (props.value) {
            case 1:
                return <Dice1 isHeld={props.isHeld} holdDie={props.holdDie} id={props.id} styles={styles} />;
            case 2:
                return <Dice2 isHeld={props.isHeld} holdDie={props.holdDie} id={props.id} styles={styles} />;
            case 3:
                return <Dice3 isHeld={props.isHeld} holdDie={props.holdDie} id={props.id} styles={styles} />;
            case 4:
                return <Dice4 isHeld={props.isHeld} holdDie={props.holdDie} id={props.id} styles={styles} />;
            case 5:
                return <Dice5 isHeld={props.isHeld} holdDie={props.holdDie} id={props.id} styles={styles} />;
            case 6:
                return <Dice6 isHeld={props.isHeld} holdDie={props.holdDie} id={props.id} styles={styles} />;
            default:
                return null; // Handle if no value matches
        }
    };

    return (
        <>
            {renderDice(props)}
        </>
    )
}

export default Die