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
            // checkDuplicates(numberValues);
            // checkFlush(handSuits);
            // checkStraights(numberValues);
             
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
            // checkDuplicates(numberValues);
            console.log("Suit Values:", handSuits)
            // checkFlush(handSuits);
            // checkStraights(numberValues);

            const hand = document.getElementById('poker'); //populating poker div html with the cardData array information (5 cards)
            hand.innerHTML = cardData.cards.map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`).join("");
            //I use an arrow function on the result the API gave me (an array of card objects). 
            // I use map to iterate through each card and convert it to an img html string using the cards url
            // Finally join is used to combine those strings into one block of html and thats put into the block of html at the poker div
        });
    }
    //#endregion
return (numberValues, handSuits)
}
// #region Part Four: Function algorithms to determine best hand
function checkDuplicates(numberValues){
    // populate a new object with key value pairs representing the value and the count of how many times it showed [["7", 2]] etc
    let count = {}; //create an empty object
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

function checkOnePair(numberValues) {
    const { pairs, triples, quads } = checkDuplicates(numberValues); //create an object called triples from duplicates function
    if (pairs.length === 1 && triples.length === 0 && quads.length === 0) { // ensures a full house wont be triggered for three of a kind
        const pairValue = Number(pairs[0][0]);
        return {
            name: "One Pair",
            ranks: [pairValue],
            display: `One Pair (${pairValue})`
        };
    }
    return null;
}

function checkTwoPair(numberValues) {
    const { pairs, quads, triples } = checkDuplicates(numberValues); //create an object called triples from duplicates function
    if (pairs.length === 2 && triples.length === 0 && quads.length === 0) { // ensures a full house wont be triggered for three of a kind
        const p1 = Number(pairs[0][0]);
        const p2 = Number(pairs[1][0]);
        const highPair = Math.max(p1, p2);
        const lowPair = Math.min(p1, p2);
        return {
            name: "Two Pairs",
            ranks: [highPair, lowPair],
            display: `Two Pairs (${highPair}s and ${lowPair}s)`
        };
    }
    return null;
}

function checkHighCard(numberValues) {
    const ranksDesc = [...numberValues].sort((a, b) => b - a); //sort in descending order
    const high = ranksDesc[0]; //0 index is now the highest card
    return {
        name: "High Card",
        ranks: ranksDesc,
        display: `High Card (${high})`
    };
}


function checkThreeOfAKind(numberValues) {
    const { triples, pairs, quads } = checkDuplicates(numberValues); //create an object called triples from duplicates function
    if (triples.length === 1 && pairs.length === 0 && quads.length === 0) { // ensures a full house wont be triggered for three of a kind
        const trip = Number(triples[0][0]);
        return {
            name: "Three of a Kind",
            ranks: [trip],
            display: `Three of a Kind (${trip})`
        };
    }
    return null;
}

function checkFourOfAKind(numberValues) {
    const { quads } = checkDuplicates(numberValues); //create an object called quads from duplicates function
    if (quads.length === 1) { // if a quad was present from that function then return as such
        return {
            name: "Four of a Kind",
            ranks: [Number(quads[0][0])],
            display: `Four of a Kind (${quads[0][0]})`
        };
    }
    return null;
}

function checkFullHouse(numberValues) {
    const { pairs, triples } = checkDuplicates(numberValues); //create an object called quads from duplicates function
    if (triples.length === 1 && pairs.length === 1) { // need a pair and a triple to constitute a full house
        return {
            name: "Full House",
            ranks: [
                Number(triples[0][0]),
                Number(pairs[0][0])
            ],
            display: `Full House (${triples[0][0]} over ${pairs[0][0]})`
        };
    }
    return null;
}


function checkFlush(handSuits, numberValues){
    //parse through suits array and suits array and look for 5 or more in sequence
    let count = {};
    handSuits.forEach(suit => {
        if (count[suit]) {
            count[suit]++;
         } else {
            count[suit] = 1;
            }});
    let flush = Object.entries(count);
    let one = flush.filter( entry => entry[1] === 5 ); //if four of the suits are the same
    console.log(one)
    //above checks if theres a flush, below allowed me to return the values
    const isFlush = one.length > 0; //if one is populated then theres a flush and it is truthy
    if (!isFlush) return null;
    const ranksDesc = [...numberValues].sort((a,b) => b - a);
    
    return { //return an object with the hand type, its strength and the cards themselves
    name: "Flush",
    strength: 6, //future proofing for against another hand
    ranks: ranksDesc,
    display: `Flush (${ranksDesc.join(" ")})`
    };
   
}

function checkStraights(numberValues){
    let sorted = [...numberValues].sort((a, b) => a - b); //creates a copy of the numberValues and sorts it by numeric value. Copy b/c sort mutates the original
    let consec = sorted.filter((value, i) => sorted[i + 1] === value + 1) //filter parses sorted, if the value at position 1 matches position 2 it adds them to a new array and checks the next value
    if (consec.length === 4) { 
        const high = sorted[4];
        return {
            name: "Straight",
            strength: 5,
            ranks: [high, high-1, high-2, high-3, high-4],
            display: `Straight (${high} high)`
            };
    }
    //solution for ace being 1 or 14 with low straights
    if (sorted.includes(14)) { //if the sorted array has an ace
        let aceLow = sorted.map(v => v === 14 ? 1 : v).sort((a, b) => a - b); //create a mew array and treat the ace as value 1 or 14 with ternary operator and check for 1-5
        consec = aceLow.filter((value, i) => aceLow[i + 1] === value + 1);
        if (consec.length === 4) {
            return {
                name: "Straight",
                strength: 5,
                ranks: [5,4,3,2,1],
                display: "Straight 5 high"
                }; //if yes then consider ace a 1 and return true
            }       
    }
    return null; //if no straights anywhere then return null (not false so it doesnt cause issues with evaluateHands)
}

function checkRoyalFlush(handSuits, numberValues){

    let sorted = [...numberValues].sort((a, b) => a - b); //creates a copy of the numberValues and sorts it by numeric value. Copy b/c sort mutates the original
    let consec = sorted.filter((value, i) => sorted[i + 1] === value + 1) //filter parses sorted, if the value at position 1 matches position 2 it adds them to a new array and checks the next value
    const flushResult = checkFlush(handSuits, numberValues); //returns an object or null
    if (sorted[0] === 10 && consec.length === 4 && flushResult) { //royal flush always starts at a jack (10) and flush has to be present
        return {
            name: "Royal Flush",
                strength: 10,
                ranks: [14,13,12,11,10],
                display: "Royal Flush"
                };
        }
    return numberValues;;
}

document.getElementById("freshHand").addEventListener("click", getDeck);
// #endregion
// #region Hand Evaluation using all the other functions
function evaluateHand(p_handSuits, p_numberValues) {
   // top tier
    const royal = checkRoyalFlush(p_handSuits, p_numberValues);
    if (royal) return royal;

    // TODO: add checkStraightFlush() once you write it
    // const straightFlush = checkStraightFlush(p_handSuits, p_numberValues);
    // if (straightFlush) return straightFlush;

    const quads = checkFourOfAKind(p_numberValues);
    if (quads) return quads;

    const fullHouse = checkFullHouse(p_numberValues);
    if (fullHouse) return fullHouse;

    const flush = checkFlush(p_handSuits, p_numberValues);
    if (flush) return flush;

    const straight = checkStraights(p_numberValues);
    if (straight) return straight;

    const trips = checkThreeOfAKind(p_numberValues);
    if (trips) return trips;

    const twoPair = checkTwoPair(p_numberValues);
    if (twoPair) return twoPair;

    const pair = checkOnePair(p_numberValues);
    if (pair) return pair;

    return checkHighCard(p_numberValues); // always returns an object
}
//to do :create handEvaluation function that compares them all. Take out the checks from deck function and put them all there. Also begin refactoring and clean up css