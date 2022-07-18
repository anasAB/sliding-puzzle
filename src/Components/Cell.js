import React from 'react'


const Cell = (props) => {

    const { cellClickHandler, boardCells, size, isFinished } = props

    const squares = boardCells.map((value, index) => {
        const cellStyle = value === 0 ? 'cell-zero' : isFinished ? 'item game-finished': 'item';
        if ((index % size === (size -1))) {
            return (
                <span key={value}>
                    <span key={value} className={cellStyle} onClick={() => cellClickHandler(index)}>
                        <span >{value !== 0 && value}</span>
                    </span>
                    <br />
                </span>

            );
        }
        return (
            <span key={value} className={cellStyle} onClick={() => cellClickHandler(index)}>
                <span >{value !== 0 && value}</span>
            </span>
        );

    });

    return (
        <div>
            {squares}
        </div>
    );

}

export default Cell