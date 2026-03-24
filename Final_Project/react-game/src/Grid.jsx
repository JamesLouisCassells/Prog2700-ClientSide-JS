import Cell from "./Cell";

function Grid({ p_grid, p_onClick }) {
    return (
        <table>
            <tbody>
                {p_grid.map(function (p_row, p_rowIndex) {
                    return (
                        <tr key={p_rowIndex}>
                            {p_row.map(function (p_cell, p_colIndex) {
                                return (
                                    <Cell
                                        key={p_colIndex}
                                        p_value={p_cell}
                                        p_onClick={() => p_onClick(p_rowIndex, p_colIndex)}
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