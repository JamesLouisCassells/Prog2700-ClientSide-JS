import Cell from "./Cell";

//replaces my draw table function (create element, append child)
function Grid({ p_rows, p_onCellClick }) { //passes in puzzle data and the function from game.jsx -- grid receives data and displays it

    // helper function to decide what to DISPLAY in each cell
    // same idea as with game.js: 0 = empty, 1 = X, 2 = O 
    function getCellDisplay(p_value) {
        if (p_value === 1) return "X";
        if (p_value === 2) return "O";
        return "";
    }

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
                                return (
                                    <Cell
                                        key={p_colIndex} // needed by React when looping

                                        // sends in what should be shown inside the square
                                        p_value={getCellDisplay(p_cell.currentState)}

                                        // sends in the click handler with the exact row/col of the clicked square
                                        p_onClick={() => {
                                            p_onCellClick(p_rowIndex, p_colIndex);
                                        }}

                                        // sends in whether that square is allowed to be clicked or not
                                        p_canToggle={p_cell.canToggle}
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