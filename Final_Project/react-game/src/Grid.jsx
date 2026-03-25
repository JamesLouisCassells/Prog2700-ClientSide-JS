import Cell from "./Cell";

//replaces my draw table function (create element, append child)
function Grid({ p_rows, p_onCellClick, p_showErrors }) { //passes in puzzle data, click function, and whether errors should be shown

    //the return shows what is being drawn: a table
    return (
        <table>
            <tbody>
                {/* loop through rows (outer loop), returns a table row. The key is just bookkeeping */}
                {p_rows.map(function (p_row, p_rowIndex) {
                    return (
                        <tr key={p_rowIndex}>

                            {/* loop trough columns (inner loop), each cell becomes a Cell component instead of raw td */}
                            {p_row.map(function (p_cell, p_colIndex) {

                                //only shows as wrong if checkbox is on, cell is filled, and answer is incorrect
                                const p_isWrong = p_showErrors &&
                                    p_cell.currentState !== 0 &&
                                    p_cell.currentState !== p_cell.correctState;

                                return (
                                    <Cell
                                        key={p_colIndex} // needed by React when looping

                                        // sends in the actual current state of the square
                                        p_state={p_cell.currentState}

                                        // sends in the click handler with the exact row/col of the clicked square
                                        p_onClick={() => {
                                            p_onCellClick(p_rowIndex, p_colIndex);
                                        }}

                                        // sends in whether that square is allowed to be clicked or not
                                        p_canToggle={p_cell.canToggle}

                                        // sends in whether this square should be highlighted as wrong
                                        p_isWrong={p_isWrong}
                                    />
                                );
                            })}

                        </tr>
                    );
                })}

            </tbody>
        </table>
    );
}

export default Grid;