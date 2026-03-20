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
            //link the dom to the div
            const game_div = document.querySelector("#theGame"); //selects the entire page with document, QS chooses the element with id "#theGame" (no # would search for an element)
            console.log("return from querySelector: ", game_div);
            //create a table to put in the div
            const table = document.createElement("table");
            //attach that table to the linked div
            game_div.appendChild(table);
            //creating a row and adding it to the table
            var row = document.createElement("tr");
            table.appendChild(row);
            var data = document.createElement("td");
            row.appendChild(data);
        }

        catch (error) {
                console.error("Error fetching data:", error);
         }
    }

    fetchData(api_url);
    })();