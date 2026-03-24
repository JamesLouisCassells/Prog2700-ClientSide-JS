import Cell from "./Cell";

// loop through the grid and draw rows
// Grid displays the board itself, it is not used for logic
function Grid({ p_grid, p_onClick }) {
    return (
        <table>
            <tbody>
                {/* loops through each row in the grid */}
                {p_grid.map(function (p_row, p_rowIndex) {
                    return (
                        <tr key={p_rowIndex}>
                            {/* keys are used to help React track elements */}

                            {/* loops through each cell in the row */}
                            {p_row.map(function (p_cell, p_colIndex) {
                                return (
                                    <Cell
                                        key={p_colIndex} // unique id for React
                                        p_value={p_cell} // value displayed in the cell
                                        p_onClick={() => p_onClick(p_rowIndex, p_colIndex)} // pass click handler down with row/col info
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