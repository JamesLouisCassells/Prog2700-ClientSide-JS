import { useState } from "react";
import Grid from "./Grid";

function Game() {
    const p_size = 6;

    const [p_grid, setGrid] = useState(
        Array(p_size).fill(null).map(() => Array(p_size).fill(""))
    );

    function handleCellClick(p_row, p_col) {
        const newGrid = p_grid.map((row) => [...row]);
        newGrid[p_row][p_col] = newGrid[p_row][p_col] === "" ? "X" : "";
        setGrid(newGrid);
    }

    return <Grid p_grid={p_grid} p_onClick={handleCellClick} />;
}

export default Game;