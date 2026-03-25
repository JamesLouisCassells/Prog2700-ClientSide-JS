import { useEffect, useState } from "react";
import Grid from "./Grid";

//BEFORE: fetch - build table - click - manually update DOM

//NOW: fetch - store in state - render JSX
//click → update state - React re-renders automatically

function Game() { //this replaces my mainjson variable from game.js
    const [p_puzzle, setPuzzle] = useState(null);//starts as null because theres no initial fetch

    useEffect(() => { //this only runs when the page first opens (as with the IIFE in 4b )
        async function fetchPuzzle() {//api call
            try {
                const p_response = await fetch("https://prog2700.onrender.com/threeinarow/sample");
                //check for errors
                if (!p_response.ok) {
                    throw new Error(`Error ${p_response.status}: ${p_response.statusText}`);
                }
                //assign fetched json as a variable
                const p_json = await p_response.json();
                setPuzzle(p_json); //stories it as a react variable!
            }
            catch (p_error) {
                console.error("Error fetching puzzle:", p_error);
            }
        }

        fetchPuzzle();
    }, []); //this empty array means this only runs once (at initial load up)

    //replaces addEventHandler from game.js
    function handleCellClick(p_row, p_col) {
        //never mutate state directly so i build a new one
        setPuzzle(function (p_prevPuzzle) {
            if (!p_prevPuzzle) {
                return p_prevPuzzle;
            }

            const p_newRows = p_prevPuzzle.rows.map(function (p_currentRow, p_rowIndex) { //map creates a new state of grid (this replaces nested loops from games.js)
                return p_currentRow.map(function (p_cell, p_colIndex) {
                    if (p_rowIndex !== p_row || p_colIndex !== p_col) { //if not the clicked cell then change nothing
                        return p_cell;
                    }

                    if (!p_cell.canToggle) { //if its locked then do nothing
                        return p_cell;
                    }

                    return { //this is the same toggle return logic as from game.js
                        ...p_cell,
                        currentState: (p_cell.currentState + 1) % 3
                    };
                });
            });

            //this returns a new puzzle object which react needs
            return { 
                ...p_prevPuzzle,
                rows: p_newRows
            };
        });
    }
    // while waiting for API this will show "loading puzzle"  (instead of blank screen)
    if (!p_puzzle) {
        return <p>Loading puzzle...</p>;
    }

    //render grid
    //pass the data (rows), the click handler
    return (
        <div>
            <Grid p_rows={p_puzzle.rows} p_onCellClick={handleCellClick} />
        </div>
    );
}
export default Game;