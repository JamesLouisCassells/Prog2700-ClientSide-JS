// Pseudo:
// 1) Fetch puzzle data from API
// 2) Build the puzzle table in JavaScript only
// 3) Let user click changeable squares to cycle through 3 states
// 4) Check puzzle status with a button and display the result

(() => { //wrapping my code IIFE
    const api_url = "https://prog2700.onrender.com/threeinarow/sample";

    //As with assignment 3c: wrapping api call in a function, putting it in a try catch for error handling.
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            //req001 REQ-001 RETRIEVAL OF THE JSON STARTING DATA FOR THE PUZZLE
            const json = await response.json();
            console.log("json info received from api: ", json);

            const game_div = document.querySelector("#theGame"); //selects the entire page with document, QS chooses the element with id "#theGame" (no # would search for an element)
            console.log("return from querySelector: ", game_div);

            game_div.innerHTML = ""; //clears anything already inside the game div before building the game

            //req002 REQ-002 DRAWING AND DISPLAYING OF 3-IN-A-ROW TABLE WITH JAVASCRIPT ONLY
            function createTable(p_data) { //p_data is my game state, DOM is the visual output, click updates data then updates the DOM
                const table = document.createElement("table"); //creates the table

                for (let row = 0; row < p_data.rows.length; row++) {
                    const tableRow = document.createElement("tr");

                    for (let col = 0; col < p_data.rows[row].length; col++) {
                        const tableData = document.createElement("td");
                        console.log(p_data.rows[row][col]); //Tells me the value of each cell (return is currentState, correctState, canToggle: true/false)
                        const cellInfo = p_data.rows[row][col]; //saving the value of each position in a variable

                        tableData.dataset.row = row; //saving the row data
                        tableData.dataset.col = col; //saving the col data

                        //assigning colours based on api currentState value
                        if (cellInfo.currentState === 1) {
                            tableData.classList.add("blue-cell");
                        }
                        else if (cellInfo.currentState === 2) {
                            tableData.classList.add("white-cell");
                        }

                        //req003 REQ-003 CHANGING OF SQUARE COLORS WITH MOUSE CLICKS
                        //creating actions for clicking based on what values are stored in the api
                        tableData.addEventListener("click", function () {
                            console.log("cell clicked");
                            const clickRow = Number(this.dataset.row);
                            const clickCol = Number(this.dataset.col);
                            const clickCell = p_data.rows[clickRow][clickCol];

                            //if this is a fixed starting square, do nothing
                            if (!clickCell.canToggle) {
                                return;
                            }

                            //assigning state based on clicks
                            clickCell.currentState = (clickCell.currentState + 1) % 3; //0 becomes 1, 1 becomes 2, 2 becomes 0 using modulo
                            this.classList.remove("blue-cell", "white-cell");

                            if (clickCell.currentState === 1) {
                                this.classList.add("blue-cell");
                            }
                            else if (clickCell.currentState === 2) {
                                this.classList.add("white-cell");
                            }
                        });

                        tableRow.appendChild(tableData); //adds the current cell into the current row
                    }

                    table.appendChild(tableRow); //adds the finished row into the table
                }

                return table;
            }

            //req004 3-IN-A-ROW PUZZLE STATUS CHECKING
            function puzzleStatus(p_data) {
                let hasError = false; //default states for status checking
                let isComplete = true;

                for (let row = 0; row < p_data.rows.length; row++) {
                    for (let col = 0; col < p_data.rows[row].length; col++) {
                        const p_cell = p_data.rows[row][col];

                        if (p_cell.currentState === 0) { //if the data says the square is still empty, the puzzle is not complete
                            isComplete = false;
                        }
                        else if (p_cell.currentState !== p_cell.correctState) { //if a filled square does not match the correct answer, mark the puzzle as having an error
                            hasError = true;
                        }
                    }
                }

                if (hasError) {
                    return "Something is wrong";
                }
                else if (!isComplete) {
                    return "So far so good";
                }
                else {
                    return "You did it!!";
                }
            }

            //building button and message area to check puzzle state after clicks
            const p_checkButton = document.createElement("button");
            p_checkButton.textContent = "Check Puzzle";

            const p_statusMessage = document.createElement("p");
            p_statusMessage.textContent = "";

            p_checkButton.addEventListener("click", function () {
                p_statusMessage.textContent = puzzleStatus(json);
            });

            const builtTable = createTable(json); //calls the function with the json passed in

            game_div.appendChild(p_checkButton);
            game_div.appendChild(p_statusMessage);
            game_div.appendChild(builtTable);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData(api_url);
})();