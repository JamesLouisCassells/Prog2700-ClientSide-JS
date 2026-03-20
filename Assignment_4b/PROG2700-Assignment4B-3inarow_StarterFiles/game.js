// Pseudo: 
// 1) get anchor point (#theGame) DONE
// 2) Create a table in memory
// 3) Use data from json to build row and columns
// - loop through 2d for rows and values
// 4) connect elements with createElement and appendChild

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
            
            function createTable(p_data){
                const game_div = document.querySelector("#theGame"); //selects the entire page with document, QS chooses the element with id "#theGame" (no # would search for an element)
                console.log("return from querySelector: ", game_div);
                game_div.innerHTML = ""; //c;ears the element
                const table = document.createElement("table"); //creates the table
                for (let row = 0; row < p_data.rows.length; row ++){ //length of the array row
                    const tableRow = document.createElement("tr");
                    for(let col = 0; col < p_data.rows[row].length; col ++) {
                        const tableData = document.createElement("td");
                        tableData.appendChild(tableRow)
                    }
                    tableRow.appendChild(tableData);
                }                
            }
            game_div.appendChild(createTable)
        }
            

        catch (error) {
                console.error("Error fetching data:", error);
         }
    }

    fetchData(api_url);
    })();