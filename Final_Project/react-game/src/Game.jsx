import { useEffect, useState } from "react";
import Grid from "./Grid";

//BEFORE: fetch - build table - click - manually update DOM
//NOW: fetch - store in state - render JSX
//click → update state - React re-renders automatically

function Game() { //this replaces my mainjson variable from game.js
    //setting state variables
    const [p_originalPuzzle, setOriginalPuzzle] = useState(null); //stores the starting version for reset
    const [p_puzzle, setPuzzle] = useState(null); //starts as null because theres no initial fetch
    const [p_statusMessage, setStatusMessage] = useState(""); //stores the message shown after clicking check puzzle
    const [p_showErrors, setShowErrors] = useState(false); //tracks whether the checkbox is checked

    useEffect(() => { //this only runs when the page first opens (as with the IIFE in 4b )
        async function fetchPuzzle() { //api call
            try {
                const p_response = await fetch("https://prog2700.onrender.com/threeinarow/sample");

                //check for errors
                if (!p_response.ok) {
                    throw new Error(`Error ${p_response.status}: ${p_response.statusText}`);
                }
                //assign fetched json as a variable
                const p_json = await p_response.json();
                setPuzzle(p_json); //stores it as React state
                setOriginalPuzzle(JSON.parse(JSON.stringify(p_json))); //deep copy so it doesn't get mutated
            }
            catch (p_error) {
                console.error("Error fetching puzzle:", p_error);
            }
        }

        fetchPuzzle(); //calls the api fetch
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

    function resetPuzzle() {
        if (!p_originalPuzzle) { //if its not the exact orientation of the original puzzle
            return;
        }
        //restore original puzzle
        setPuzzle(JSON.parse(JSON.stringify(p_originalPuzzle)));
        //clear UI state
        setStatusMessage("");
        setShowErrors(false);
    }

    //checks the whole puzzle and decides what message to show
    function checkPuzzle() {
        if (!p_puzzle) { //safety check in case puzzle has not loaded yet
            return;
        }

        let p_hasWrongCell = false;
        let p_hasIncompleteCell = false;
        //outer loop = rows
        p_puzzle.rows.forEach(function (p_row) {
            //inner loop = each cell in the row
            p_row.forEach(function (p_cell) {
                //if any cell is still empty then the puzzle is not complete yet
                if (p_cell.currentState === 0) {
                    p_hasIncompleteCell = true;
                }
                //if a FILLED cell does not match the correct state, then it is wrong
                //this avoids treating empty cells as wrong straight away
                if (p_cell.currentState !== 0 && p_cell.currentState !== p_cell.correctState) {
                    p_hasWrongCell = true;
                }
            });
        });

        //decides which message gets shown
        if (p_hasWrongCell) {
            setStatusMessage("Something is wrong");
        }
        else if (p_hasIncompleteCell) {
            setStatusMessage("So far so good");
        }
        else {
            setStatusMessage("You did it!!");
        }
    }

    //shows loading text until the API data arrives
    if (!p_puzzle) {
        return <p>Loading puzzle...</p>;
    }

    return (
        <div className="game-container">
            <h1>Three in a Row with React!</h1>
            {/* renders the actual game grid */}
            <Grid  p_rows={p_puzzle.rows}
                    p_onCellClick={handleCellClick}
                    p_showErrors={p_showErrors}  
            />

            {/* button to check the puzzle status */}
            <button onClick={checkPuzzle}>Check Puzzle</button>
             {/* button to reset the puzzle status !*/}
            <button onClick={resetPuzzle}>Reset Puzzle</button>
            <label>
                <input
                    type="checkbox"
                    checked={p_showErrors}
                    onChange={function (p_event) {
                        setShowErrors(p_event.target.checked);
                    }}
                />
                Show Errors
             </label>
            {/* displays the result message */}
            <p>{p_statusMessage}</p>
        </div>
    );
}

export default Game;