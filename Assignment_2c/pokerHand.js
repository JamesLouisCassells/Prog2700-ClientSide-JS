//Pseudocode
// first api generates a deck id
//second api generates card(s) to be used (cannot get cards without a generated deck!)
// Poker requires 5 cards and the highest combination of those 5 cards
// One deck, 5 cards immediately displayed
let playingDeck = null;

function getDeck() {

    //first time clicking
    if (playingDeck === null){ //if no deck generated yet

        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') //api deck generator
        .then(response => response.json()) //convert response to js readable json
        .then(deckData => {
            //console.log("Deck data:", deckData); //this shows the json array position i needed

            playingDeck = deckData.deck_id; // Assigning specific deckId to a variable 
            console.log("Saved deck id:", playingDeck); //checking what the id was.
            
            return fetch(`https://deckofcardsapi.com/api/deck/${playingDeck}/draw/?count=5`); //punches in variable to complete url
            
        })

        //Now return a card
        .then(response => response.json()) //convert response to json
        .then(cardData => {
            //console.log("Card data:", cardData); //print the data to log to check it
            
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
