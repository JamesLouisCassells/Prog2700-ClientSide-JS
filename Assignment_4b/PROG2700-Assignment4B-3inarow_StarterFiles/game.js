// Pseudo:
// 1) Fetch puzzle data from API
// 2) Build the puzzle table in JavaScript only
// 3) Let user click changeable squares to cycle through 3 states
// 4) Check puzzle status with a button and display the result
// 5) Create uniqiue display?

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
                        //this is my click handler
                        tableData.addEventListener("click", function () {
                            console.log("cell clicked");
                            const clickRow = Number(this.dataset.row);
                            const clickCol = Number(this.dataset.col);
                            const clickCell = p_data.rows[clickRow][clickCol];
                            p_clickCount++; //updates my click counter for req006
                            p_counterLabel.textContent = "Clicks: " + p_clickCount;
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
                            showErrors(p_data, p_errorCheckbox.checked); //keeps the error highlight updated (from req 005)
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

                for (let row = 0; row < p_data.rows.length; row++) { //loop through the rows
                    for (let col = 0; col < p_data.rows[row].length; col++) { //loop through the columns
                        const p_cell = p_data.rows[row][col]; //store each individual value from the data in p_cell

                        if (p_cell.currentState === 0) { //if the data says the square is still empty, the puzzle is not complete
                            isComplete = false;
                        }
                        else if (p_cell.currentState !== p_cell.correctState) { //if a filled square does not match the correct answer, mark the puzzle as having an error
                            hasError = true;
                        }
                    }
                }
                //Messages for clicking the button provided here in the return
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

            //req005 ERROR DISPLAY CHECKBOX (6 PTS.)
            function showErrors(p_data, p_show) { //passes in main data and if the checkbox is checked will show errors
                const allCells = game_div.querySelectorAll("td");//targets all data

                allCells.forEach(function (cell) { //saves variables for row, column and the data
                    const row = Number(cell.dataset.row);
                    const col = Number(cell.dataset.col);
                    const cellInfo = p_data.rows[row][col];

                    cell.classList.remove("error-cell");

                    if (p_show && cellInfo.currentState !== 0 && cellInfo.currentState !== cellInfo.correctState) { //only run if the checkbox is true
                        cell.classList.add("error-cell");
                    }
                });
            }

            //Puzzle state button: building button and message area to check puzzle state after clicks
            const p_checkButton = document.createElement("button"); //creates a button in data
            p_checkButton.textContent = "Check Puzzle"; //assigns a label to the button

            const p_statusMessage = document.createElement("p"); //creating element to be passed in for status checking (messages above)
            p_statusMessage.textContent = ""; //initalising paragraph as empty

            p_checkButton.addEventListener("click", function () { //when the button is clicked
                p_statusMessage.textContent = puzzleStatus(json); //run this function and check if the puzzles correct
            });

            //Error checking button: building checkbox and message 
            const p_errorDisplayLabel = document.createElement("label");
            const p_errorCheckbox = document.createElement("input");
            p_errorCheckbox.type = "checkbox";
            p_errorDisplayLabel.appendChild(p_errorCheckbox);
            p_errorDisplayLabel.appendChild(document.createTextNode(" Show Incorrect Square(s)"));

            p_errorCheckbox.addEventListener("change", function () { //checks if the box is checked or not
                showErrors(json, this.checked); //this is the variable that will be passed into the function showErrors as p_show if there are errors    
            });

            const builtTable = createTable(json); //calls the function with the json passed in
            
            //req006 REQ-006	ADDING AN INNOVATIVE FEATURE 
            let p_clickCount = 0; //create a base numbered variable of 0
            const p_counterLabel = document.createElement("p"); //create a DOM element to display that counter
            p_counterLabel.textContent = "Clicks: 0";

        
            game_div.appendChild(p_checkButton); //attaches the button to the wire framimg
            game_div.appendChild(p_statusMessage); //adds the status message after that
            game_div.appendChild(p_errorDisplayLabel);//puts the error checker on the screen
            game_div.appendChild(p_clickCount);
            game_div.appendChild(builtTable); //puts the built table on the screen

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchData(api_url);
})();