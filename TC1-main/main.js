/*
* PHONEWORDS
* Write a function that will take a phone word (vanity number) and return the correct telephone number.
* The number pad looks like the following:
* https://en.wikipedia.org/wiki/Telephone_keypad#/media/File:Telephone-keypad2.svg
*
* RULES
* Given a phoneword:
* 1. Ignore any non-alphanumeric characters (), -, etc.
* 2. Keep any existing digits
* 3. Resolve a letter to a number according to the keypad image
* 4. All your code must be contained in the section outlined below
*/


var buttons = ["abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"] //DO NOT MODIFY


// YOU CAN ADD TO AND MODIFY THE CODE BELOW THIS LINE
//   |
//   V

function convertPhoneWord(phoneWord) {
    //Enter your code in this function body
  
//initialise empty array to populate  
  let number = []; 

//if the value type of that theparameter variable value is not a string
  if (typeof phoneWord !== "string") { 
    return '';
  }  

  for (let ch of phoneWord) {  // loops through the parameter variable letter by letter

    if (isDigit(ch)) { //if its a number then add it to the new array
      number.push(ch);
    }
    else if (isLetter(ch)) {  //Checks for letters
        let low = ch.toLowerCase(); //converts every letter to lowercase upon iteration
        for (let i = 0; i < buttons.length; i++){ //loops through button array to check for matches in buttons array
            if (buttons[i].includes(low)){
                number.push(i+2); //if theres a match it adds the index number plus two to match that abc/number conversion
                break; //cease loop when value is matched and added
            }
        }
    }
  }

  return number.join("");
}



//    ^
//    |
//YOU CAN ADD TO OR MODIFY THE CODE ABOVE THIS LINE




// DO NOT CHANGE ANY CODE AFTER THIS LINE.
//     |
//     |
//     V

//helper functions...do not modify, but you can use them in your code

function isDigit(character) {
    return "0123456789".indexOf(character) !== -1;
}

function isLetter(character) {
    character = character.toUpperCase();    
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(character) !== -1;
}

testCode();