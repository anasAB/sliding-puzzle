import React, { useState, useEffect } from 'react'
import Board from './Board'


const Puzzle = () => {
    const [boardArray, setBoardArray] = useState([])
    const [size, setsize] = useState(3)
    const [numberOfMoves, setNumberOfMoves] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const initializeNewGame = () => {
        setNumberOfMoves(0)
        setBoardArray(shuffleBoardCells(boardArray))
    }


    const shuffleBoardCells = (boardArray) => {
        const shuffledArray = boardArray.slice();
        for (let index = shuffledArray.length - 1; index > 0; index--) {
            const randomNumber = Math.floor(Math.random() * index);
            [shuffledArray[index], shuffledArray[randomNumber]] = [shuffledArray[randomNumber], shuffledArray[index]];
        }
        setBoardArray(shuffledArray)
        return shuffledArray
    }

    const updateNumberOfMoves = (number) => {
        setNumberOfMoves(prevNum => prevNum + 1)
    }


    useEffect(() => {
        const initBord = (size) => {
            const test = Array.from({ length: size * size }, (_, b) => b)
            setBoardArray(test)
            return;
        }
        setBoardArray(shuffleBoardCells(boardArray))
        initBord(size)
    }, [size]);


    const updateBoard = (boardArray) => {
        setIsFinished(isArraySorted(boardArray))
        setBoardArray(boardArray)
    }

    const isArraySorted = (array) => array.every((value, index, array) => {
        return !index || array[index - 1] <= value
    });

    const handleInput = (event) => {
        setsize(event.target.value)
    };

    const message = (isFinished ? "Winner !!! " : "Total ") + `Moves: ${numberOfMoves}`
    
    return (
        <div className='puzzle'>
            <Board size={size} boardArray={boardArray} updateBoard={updateBoard} updateNumberOfMoves={updateNumberOfMoves} />
            <p>Total Number Of Moves: {numberOfMoves}</p>
            {isFinished && <span className="slider-msg">
                {message}
            </span>}
            <div className="btn-new-game">
                <button className="btn-new-game" type='button' value='New 4x4 game' onClick={initializeNewGame}>New Game</button>
            </div>
            <div className='input-filed'>
                <span>Create Your Own Puzzle</span>
                <input className="input-filed" type="text" onChange={handleInput}/>
            </div>
        </div>
    );

}


export default Puzzle
