// #region
//Pseudocode
/* 
1) Split api call into two: 
    a) if deck hasnt been called then call a deck and then pull 5 cards
    b) if deck HAS been called then shuffle and pull 5 cards from existing deck
2) Once shuffled deck create a means to measure value highest sequence of cards
    extract values DONE
    extract suits DONE
    convert face cards to numbers → next
    check duplicates → pairs/trips/quads
    check suits → flush
    check sequences → straight
    Assign values to cards (2-14)

   VALUES determine:
    pair
    two pair
    three of a kind
    straight
    full house
    four of a kind
    high card

    SUITS determine:
    flush
    straight flush
    royal flush
3) Return (with fancy highlighting) the highest combination and explain what it is (ie two pair)
    
*/ 
 //#endregion

let playingDeck = null;
let handValues = [];
let handSuits = [];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const suits = ["HEARTS", "CLUBS", "SPADES", "DIAMONDS"]

function getDeck() {

    //first time clicking
    if (playingDeck === null){ //if no deck generated yet

        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') //api deck generator
        .then(response => response.json()) //convert response to js readable json
        .then(deckData => {
            console.log("Deck data:", deckData); //this shows the json array position i needed

            playingDeck = deckData.deck_id; // Assigning specific deckId to a variable 
            console.log("Saved deck id:", playingDeck); //checking what the id was.
            
            return fetch(`https://deckofcardsapi.com/api/deck/${playingDeck}/draw/?count=5`); //punches in variable to complete url
            
        })

        //Now return a card
        .then(response => response.json()) //convert response to json
        .then(cardData => {
        console.log("Card data:", cardData); //print the data to log to check it
        handValues = cardData.cards.map(card => card.value);//extracts existing card value data and saves it
        handSuits = cardData.cards.map(card => card.suit); //same for suit data
        console.log("saved handvalues", handValues); 
        console.log("saved handsuits", handSuits);
            const hand = document.getElementById('poker');
            hand.innerHTML = cardData.cards.map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`).join("");
            //arrow function, map method to iterate through the array of 5 cards and print them
        });
    }

    //Second time clicking (Card pack already assigned)
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
            
            const hand = document.getElementById('poker'); //populating poker div html with the cardData array information (5 cards)
            hand.innerHTML = cardData.cards.map(card => `<img src="${card.image}" alt="${card.value} of ${card.suit}">`).join("");
            //I use an arrow function on the result the API gave me (an array of card objects). 
            // I use map to iterate through each card and convert it to an img html string using the cards url
            // Finally join is used to combine those strings into one block of html and thats put into the block of html at the poker div
            
            
        });
    }
}

document.getElementById("freshHand").addEventListener("click", getDeck);


