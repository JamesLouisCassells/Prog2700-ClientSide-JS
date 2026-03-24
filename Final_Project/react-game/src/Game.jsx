import { useState } from "react";
import Grid from "./Grid";
//this is my most important file that uses the most react actions
function Game() {
    const p_size = 6; //fixing the size as six for my grid

    const [p_grid, setGrid] = useState( //p_grid takes the paramter for the grid size, setGrid updates it. useState builds my grid
        Array(p_size).fill(null).map(() => Array(p_size).fill("")) //Creates a grid with empty strings. Fill() makes it useable
    );

    //function to handle clicks
    function handleCellClick(p_row, p_col) { //takes the specific row and column as parameters that the user clicked
        const newGrid = p_grid.map((row) => [...row]); //maps a new grid instead of mutating original
        newGrid[p_row][p_col] = newGrid[p_row][p_col] === "" ? "X" : ""; //empty cell gets an x, otherwise clear it (ON THE NEW GRID)
        setGrid(newGrid); //triggers a new grid update (a react feature!)
    }

    return <Grid p_grid={p_grid} p_onClick={handleCellClick} />;
}

export default Game;