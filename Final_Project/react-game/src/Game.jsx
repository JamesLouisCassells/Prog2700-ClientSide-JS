import { useState } from "react";
import Grid from "./Grid";
//where my grid lives and updates
//this is my most important file that uses the most react actions
function Game() {
    const p_size = 6; //fixing the size as six for my grid

    const [p_grid, setGrid] = useState( //p_grid takes the paramter for the grid size, setGrid updates it. useState builds my grid
        Array(p_size).fill(null).map(() => Array(p_size).fill("")) //Creates a grid with empty strings. Fill() makes it useable
    );

    //function to handle clicks - wrapped in a function so it doesnt load on page load but on click
    function handleCellClick(p_row, p_col) { //takes the specific row and column as parameters that the user clicked
        const newGrid = p_grid.map((row) => [...row]); //maps a new grid instead of mutating original
        newGrid[p_row][p_col] = newGrid[p_row][p_col] === "" ? "X" : ""; //empty cell gets an x, otherwise clear it (ON THE NEW GRID)
        setGrid(newGrid); //triggers a new grid update (a react feature!)
    }

    return <Grid p_grid={p_grid} p_onClick={handleCellClick} />;
}

function resetGame() {
    const emptyGrid = Array(p_size)
        .fill(null)
        .map(() => Array(p_size).fill(""));

    setGrid(emptyGrid);
}

<button onClick={resetGame}>Reset</button>

export default Game;