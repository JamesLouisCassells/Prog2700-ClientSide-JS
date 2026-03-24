import Cell from "./Cell";
//grid displays the board itself, it is not used for logic
function Grid({ p_grid, p_onClick }) {
    return (
        <table>
            <tbody>
                {p_grid.map(function (p_row, p_rowIndex) { //loops through each row in the grid
                    return (
                        <tr key={p_rowIndex}> //keys are used to track the React elements
                        
                            {p_row.map(function (p_cell, p_colIndex) { //loops through each cell in the row
                                return (
                                    <Cell
                                        key={p_colIndex} //uniq id for react
                                        p_value={p_cell} //value that is displayed in the cell itself 
                                        p_onClick={() => p_onClick(p_rowIndex, p_colIndex)} //click handler comes down to the cell, wrapped in row/col info
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