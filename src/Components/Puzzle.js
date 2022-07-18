import React, { useState, useEffect } from 'react'
import Board from './Board'


const Puzzle = () => {
    const [boardArray, setBoardArray] = useState([])
    const [size, setsize] = useState(3)
    const [numberOfMoves, setNumberOfMoves] = useState(0)
    const [isFinished, setIsFinished] = useState(false)

    const initializeNewGame = () => {
        setIsFinished(false)
        setNumberOfMoves(0)
        setBoardArray(shuffleBoardCells(boardArray))
    }


    const shuffleBoardCells = (boardArray) => {
        const shuffledArray = boardArray.slice();
        for (let index of shuffledArray) {
            const randomNumber = Math.floor(Math.random() * index);
            [shuffledArray[index], shuffledArray[randomNumber]] = [shuffledArray[randomNumber], shuffledArray[index]];
            setBoardArray(shuffledArray)
        }
        return shuffledArray
    }

    const updateNumberOfMoves = (number) => {
        setNumberOfMoves(prevNum => prevNum + 1)
    }

    useEffect(() => {
        const test = Array.from({ length: size * size }, (_, index) => index)
        setBoardArray(shuffleBoardCells(test))
    }, [size]);


    const updateBoard = (boardArray) => {
        setIsFinished(isBoardSorted(boardArray))
        setBoardArray(boardArray)
    }

    const isBoardSorted = (array) => array.every((value, index, array) => {
        return !index || array[index - 1] <= value
    });

    const handleInput = (event) => {
        setsize(event.target.value)
    };

    const message = isFinished ? `Winner !!! With ${numberOfMoves} Moves` : `Total Moves: ${numberOfMoves}`

    return (
        <div className='puzzle'>
            <Board size={size} boardArray={boardArray} updateBoard={updateBoard} updateNumberOfMoves={updateNumberOfMoves} isFinished={isFinished} />
            <span className="slider-msg">
                {message}
            </span>
            <div className="btn-new-game">
                <button className="btn-new-game" type='button' value='New 4x4 game' onClick={initializeNewGame}>New Game</button>
            </div>
            <div className='input-filed'>
                <span>Create Your Own Puzzle</span>
                <input type="text" onChange={handleInput} />
            </div>
        </div>
    );
}


export default Puzzle
