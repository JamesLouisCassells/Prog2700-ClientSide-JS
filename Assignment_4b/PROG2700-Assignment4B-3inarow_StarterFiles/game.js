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
                game_div.innerHTML = ""; //clears the elements 
                const table = document.createElement("table"); //creates the table

                for (let row = 0; row < p_data.rows.length; row++) {
                    const tableRow = document.createElement("tr");
                    for (let col = 0; col < p_data.rows[row].length; col++) {
                        const tableData = document.createElement("td");
                        console.log(p_data.rows[row][col]); //Tells me the value of each cell (return is currentState, correctState, canToggle: true/false)
                        const cellInfo = p_data.rows[row][col]; //saving the value of each position in a vairable
                        if (cellInfo.currentState === 1) {
                            tableData.classList.add("blue-cell");
                            } 
                        else if (cellInfo.currentState === 2) {
                            tableData.classList.add("white-cell"); //or white
                            }
                        
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