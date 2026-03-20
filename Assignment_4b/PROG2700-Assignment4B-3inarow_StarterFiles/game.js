// Pseudo: 
// 1) get anchor point (#theGame)
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
            const game_div = document.querySelector("#theGame"); //selects the entire page with document, QS chooses the element with id "theGame"
            console.log("return from querySelector: ", game_div);
        }

        catch (error) {
                console.error("Error fetching data:", error);
         }
    }

    fetchData(api_url);
    })();