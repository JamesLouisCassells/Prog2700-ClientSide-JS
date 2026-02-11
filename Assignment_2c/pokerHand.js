// #region Pseudocode
// 1) Split api call into two: 
//     a) if deck hasnt been called then call a deck and then pull 5 cards
//     b) if deck HAS been called then shuffle and pull 5 cards from existing deck
// 2) Once shuffled deck create a means to measure value highest sequence of cards
//     extract values DONE
//     extract suits DONE
//     convert face cards to numbers DONE
//     check duplicates → pairs/trips/quads
//     check suits → flush
//     check sequences → straight
//     Assign values to cards (2-14)
// 3) Return (with fancy highlighting) the highest combination and explain what it is (ie two pair)
    

 //#endregion

 //#region globals
let playingDeck = null;
let handValues = [];
let handSuits = [];
let numberValues = [];
// const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
// const suits = ["HEARTS", "CLUBS", "SPADES", "DIAMONDS"]
//#endregion

function getDeck() {
    //#region Assignment Part One/Two: FIRST TIME CLICKING: initial deck fetch
    if (playingDeck === null){ //if no deck generated yet (else use the same deck, shuffle and draw 5 cards)
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') //api deck generator taking 1 deck only
        .then(response => response.json()) //convert response from api to js readable json
        .then(deckData => { //once i have that json, use an anonymous function to:
            console.log("Deck data:", deckData); //this shows the json array position i needed
            playingDeck = deckData.deck_id; // Assigning specific deckId to a variable 
            console.log("Saved deck id:", playingDeck); //checking what the id was.
            return fetch(`https://deckofcardsapi.com/api/deck/${playingDeck}/draw/?count=5`);}) //Saves and punches in playingDeck variable to complete url || Draws 5 cards
        .then(response => response.json()) //convert response to json
        .then(cardData => {
        console.log("Card data:", cardData); //print the data to log to check it
        handValues = cardData.cards.map(card => card.value);//extracts existing card value data and saves it
        handSuits = cardData.cards.map(card => card.suit); //same for suit data
        console.log("saved handvalues", handValues); 
        console.log("saved handsuits", handSuits);

        //Using map and parseInt to convert json stored face values to trackable ints ("JACK" to 11)
        handValues = cardData.cards.map(card => card.value); //extracts existing card value data and saves it
            handSuits = cardData.cards.map(card => card.suit); //same for suit data
            console.log("Card data:", cardData);
            numberValues = handValues.map(str => { //Anonymous function which Loops through handvalues and assigns number value to face cards
            if (str === "JACK")
                return 11;
            else if (str === "QUEEN")
                return 12;
            else if (str === "KING")
                return 13;
            else if (str === "ACE")
                return 14;
            else //If it isnt a face card then converts string to int with parseInt
                return parseInt(str)
            })  
            console.log("Number Values:", numberValues);
            checkDuplicates(numberValues);
            checkFlush(handSuits);
            checkStraights(numberValues);
             
            //Makes those cards appear on the webpage by linking them to the html
            const hand = document.getElementById('poker'); //Assigning result to html so it appears on the web page
            //arrow function, map method to iterate through the array of 5 cards and print them
            hand.innerHTML = cardData.cards.map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`).join("");
        });} 
    //#endregion
    //#region Part Two:  SECOND TIME CLICKING (Card pack already assigned)
    else {
        console.log("Reusing deck id", playingDeck);
        fetch(`https://deckofcardsapi.com/api/deck/${playingDeck}/shuffle/`)
        .then(response => response.json())

        .then(() => {
            return fetch(`https://deckofcardsapi.com/api/deck/${playingDeck}/draw/?count=5`)
             })

        .then(response => response.json())
        .then(cardData => {
            handValues = cardData.cards.map(card => card.value); //extracts existing card value data and saves it
            handSuits = cardData.cards.map(card => card.suit); //same for suit data
            console.log("Card data:", cardData);
            
            //converting values into numeric, trackable ints
            numberValues = handValues.map(str => {
            if (str === "JACK")
                return 11;
            else if (str === "QUEEN")
                return 12;
            else if (str === "KING")
                return 13;
            else if (str === "ACE")
                return 14;
            else 
                return parseInt(str) //parse for numbers within string (easy part)
        })
            console.log("Number Values:", numberValues);
            checkDuplicates(numberValues);
            console.log("Suit Values:", handSuits)
            checkFlush(handSuits);
            checkStraights(numberValues);
    

            const hand = document.getElementById('poker'); //populating poker div html with the cardData array information (5 cards)
            hand.innerHTML = cardData.cards.map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`).join("");
            //I use an arrow function on the result the API gave me (an array of card objects). 
            // I use map to iterate through each card and convert it to an img html string using the cards url
            // Finally join is used to combine those strings into one block of html and thats put into the block of html at the poker div
        });
    }
    //#endregion
}
// #region Part Four: Function algorithms to determine best hand
function checkDuplicates(numberValues){
    // populate a new object with key value pairs representing the value and the count of how many times it showed [["7", 2]] etc
    count = {}; //create an empty object
    numberValues.forEach(value => { //run forEach to run through the numberValues array
        if (count[value]) { //if it finds the same value already exists in count plus one to that object - [["7", 2]]
            count[value]++;
         } else {
            count[value] = 1; // otherwise keep the count where it is
            }
    });
    //console.log("Amount:", count); 
    let duplicates = Object.entries(count); //convert count from an object of key value pairs back to a readable/mappable array of duplicates and totals.
    let pairs = duplicates.filter( entry => entry[1] === 2 ); //filter through duplicates 2d array -- keep where the count shows duplicates anount -- store result in pairs
    let triples = duplicates.filter( entry => entry[1] === 3 ); // three of a kind
    let quads = duplicates.filter( entry => entry[1] === 4 ); //four of a kind
    console.log(pairs);
    console.log(triples);
    console.log(quads);
    return {pairs, triples, quads};   //return makes this function useable for the comparison function to check values
}


function checkFlush(handSuits){
    //parse through suits array and suits array and look for 5 or more in sequence
    let count = {};
    handSuits.forEach(suit => {
        if (count[suit]) {
            count[suit]++;
         } else {
            count[suit] = 1;
            }
    });

    let flush = Object.entries(count);
    let one = flush.filter( entry => entry[1] === 5 ); //if four of the suits are the same
    console.log(one)
    return one.length === flush; //if one is populated its truthy which means a flush was satisfied
}
function checkStraights(numberValues){
    let sorted = [...numberValues].sort((a, b) => a - b); //creates a copy of the numberValues and sorts it by numeric value. Copy b/c sort mutates the original
    let consec = sorted.filter((value, i) => sorted[i + 1] === value + 1) //filter parses sorted, if the value at position 1 matches position 2 it adds them to a new array and checks the next value
    console.log(sorted);
    console.log("Consecutive matches:", consec);
    return consec.length === 4; // it will only return true if there is 5 consecutives (5-1 because computers)
}
function checkRoyalFlush(){
    //explicitly check for royal flush but also flush
    //return the cards and an award
}
document.getElementById("freshHand").addEventListener("click", getDeck);
// #endregion
