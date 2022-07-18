import React, { useState, useEffect } from 'react'
import Cell from './Cell';

const Board = (props) => {
    const { size, boardArray, updateBoard, updateNumberOfMoves, isFinished } = props

    const [zeroIndex, setzeroIndex] = useState(0)

    const [possibleTopIndex, setPossibleTopIndex] = useState(0)
    const [possibleBottomIndex, setPossibleBottomIndex] = useState(0)

    const [possibleRightIndex, setPossibleRightIndex] = useState(0)
    const [possibleLeftIndex, setPossibleLeftIndex] = useState(0)


    const findPossibleMovingIndex = () => {
        const zeroIndex = boardArray.indexOf(0);
        setzeroIndex(zeroIndex)
        const zeroCoordinate = getZeroCoords(zeroIndex);
        const possibleTopIndex = zeroCoordinate.row > 1 && getPotentialIndex(zeroCoordinate.row - 1, zeroCoordinate.column);
        const possibleBottomIndex = zeroCoordinate.row < size && getPotentialIndex(zeroCoordinate.row + 1, zeroCoordinate.column);
        
        const possibleRightIndex = zeroCoordinate.column < size && getPotentialIndex(zeroCoordinate.row, zeroCoordinate.column + 1);
        const possibleLeftIndex = zeroCoordinate.column > 1 && getPotentialIndex(zeroCoordinate.row, zeroCoordinate.column - 1);

        setPossibleTopIndex(possibleTopIndex)
        setPossibleBottomIndex(possibleBottomIndex)
        setPossibleRightIndex(possibleRightIndex)
        setPossibleLeftIndex(possibleLeftIndex)
    }

    useEffect(() => {
        findPossibleMovingIndex()
    }, [boardArray]);


    const getZeroCoords = (index) => {
        return { row: Math.floor(index / size) + 1, column: (index % size) + 1 }
    }

    const getPotentialIndex = (row, col) => {
        return (size * (row - 1)) + col - 1
    }

    const cellClickHandler = (index) => {
        if (!isFinished) {
            findPossibleMovingIndex()
            if (index === possibleTopIndex || index === possibleRightIndex || index === possibleBottomIndex || index === possibleLeftIndex) {
                updateNumberOfMoves(1)
                nextBoard(index)
            };
        }
    }

    const nextBoard = (cellIndex) => {
        const newboard = boardArray.slice();
        const cellValue = newboard[cellIndex];

        newboard[cellIndex] = newboard[zeroIndex];
        newboard[zeroIndex] = cellValue;
        updateBoard(newboard);
    }

    return <Cell boardCells={boardArray} cellClickHandler={cellClickHandler} size={size} isFinished={isFinished} />
}
export default Board