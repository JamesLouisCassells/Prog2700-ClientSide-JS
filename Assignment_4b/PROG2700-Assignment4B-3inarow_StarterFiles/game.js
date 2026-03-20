// Pseudo: 


(() => { //wrapping my code IIFE
    const api_url = "https://prog2700.onrender.com/threeinarow/sample";
    
    //As with assignment 3c: wrapping api call in a function, putting it in a try catch for error handling.
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const json = await response.json();
            console.log("json info received from api: ", json);

            const game_div = document.querySelector("#theGame");//selects the entire page with document, QS chooses the element with id "#theGame" (no # would search for an element)
            console.log("return from querySelector: ", game_div);
            
            function createTable(p_data){                
                game_div.innerHTML = ""; //clears anything already insidet the game div before redrawing 
                const table = document.createElement("table"); //creates the table

                for (let row = 0; row < p_data.rows.length; row++) {
                    const tableRow = document.createElement("tr");
                    for (let col = 0; col < p_data.rows[row].length; col++) {
                        const tableData = document.createElement("td");
                        console.log(p_data.rows[row][col]); //Tells me the value of each cell (return is currentState, correctState, canToggle: true/false)
                        const cellInfo = p_data.rows[row][col]; //saving the value of each position in a vairable
                       
                        tableData.dataset.row = row; //saving the row data
                        tableData.dataset.col = col;  //saving the col data
                        
                        //assigning colours based on api currentState value
                        if (cellInfo.currentState === 1) {
                            tableData.classList.add("blue-cell");
                            } 
                        else if (cellInfo.currentState === 2) {
                            tableData.classList.add("white-cell"); //or white
                            }
                        //creating actions for clicking based on what values are stored in the api
                        tableData.addEventListener("click", function () { 
                            console.log("cell clicked");
                            const clickRow = Number(this.dataset.row);
                            const clickCol = Number(this.dataset.col);
                            const clickCell = p_data.rows[clickRow][clickCol];
                        //iif this is a fixed starting square, do nothing
                        if (!clickCell.canToggle) {
                            return;
                        }
                        //assigning state based on clicks
                        clickCell.currentState = (clickCell.currentState + 1) % 3; //0 becomes 1, 1-2, 2-0 using remainder division
                        this.classList.remove("blue-cell", "white-cell");

                        if (clickCell.currentState === 1) {
                            this.classList.add("blue-cell");
                        }
                        else if (clickCell.currentState === 2) {
                            this.classList.add("white-cell");
                        }
                        });
                        
                        tableRow.appendChild(tableData); //populating the rows with the data
                    }
                    table.appendChild(tableRow);//populating the table with the rows
                }          
                return table;      
            }
            const builtTable = createTable(json); //calls the function with the json passed in
            game_div.appendChild(builtTable);
        }

        catch (error) {
                console.error("Error fetching data:", error);
         }
    }

    fetchData(api_url);
    })();