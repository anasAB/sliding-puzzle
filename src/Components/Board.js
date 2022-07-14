import React, { useState, useEffect } from 'react'
import Cell from './Cell';



const Board = (props) => {
    const { size, boardArray, updateBoard, updateNumberOfMoves } = props

    const [zeroIndex, setzeroIndex] = useState(0)
    const [possibleTopIndex, setPossibleTopIndex] = useState(0)
    const [possiblRightIndex, setpossiblRightIndex] = useState(0)
    const [possiblBottomIndex, setPossiblBottomIndex] = useState(0)
    const [possibleLeftIndex, setPossibleLeftIndex] = useState(0)


    const findPossibleMovingIndex = () => {
        const zeroIndex = boardArray.indexOf(0);
        setzeroIndex(zeroIndex)

        const zeroCoordinate = getZeroCoords(zeroIndex);

        const possibleTopIndex = zeroCoordinate.row > 0 && getPotentialIndex(zeroCoordinate.row - 1, zeroCoordinate.column);
        const possiblBottomIndex = zeroCoordinate.row < size && getPotentialIndex(zeroCoordinate.row + 1, zeroCoordinate.column);

        const possiblRightIndex = zeroCoordinate.column < size && getPotentialIndex(zeroCoordinate.row, zeroCoordinate.column + 1);
        const possibleLeftIndex = zeroCoordinate.column > 0 && getPotentialIndex(zeroCoordinate.row, zeroCoordinate.column - 1);

        setPossibleTopIndex(possibleTopIndex)
        setpossiblRightIndex(possiblRightIndex)
        setPossiblBottomIndex(possiblBottomIndex)
        setPossibleLeftIndex(possibleLeftIndex)
    }

    useEffect(() => {
        findPossibleMovingIndex()
    }, [boardArray]);


    const getZeroCoords = (index) => {
        return { row: Math.floor(index / size) + 1, column: (index % size) + 1 }
    }

    const getPotentialIndex = (row, col) => {
        return (size * (row - 1)) + col - 1;
    }

    const cellClickHandler = (index) => {
        findPossibleMovingIndex()
        if (index === possibleTopIndex || index === possiblRightIndex || index === possiblBottomIndex || index === possibleLeftIndex) {
            updateNumberOfMoves(1)
            return nextBoard(index)
        };
    }

    const nextBoard = (cellIndex) => {
        const newboard = boardArray.slice();
        const cellValue = newboard[cellIndex];

        newboard[cellIndex] = newboard[zeroIndex];
        newboard[zeroIndex] = cellValue;
        updateBoard(newboard);
    }

    return (
        <Cell boardcells={boardArray} cellClickHandler={cellClickHandler} size={size} />
    )
}
export default Board