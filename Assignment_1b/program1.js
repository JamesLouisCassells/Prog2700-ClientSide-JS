/* Write a function in JavaScript that will receive a string as a parameter and then perform the following: 
--If the first and last characters of the string are the same (ignoring case), the function will return the string in reverse order. 
--Otherwise, the function will return the string with the first and last letters removed. 
--You don’t have to ask the user to input a string. Simply assign a string to a variable in your code as your starting point. 

Example: “Triscuit” returns “tiucsirT” but “Cracker” returns “racke”. */

function programOne(word) {
    let newWord = ""; //initialise a new word to be populated

    if (word[0].toLowerCase() === word[word.length -1].toLowerCase()) { //if the first and last values are equal (regardless of casing)
       for (let i = word.length -1; i >= 0; i--) { //start at the end of the string and print a new word working backwards
        newWord += word[i]; // just iterates through the list from end to start (reverses word)
        }
        return newWord; //return reversed word
    
    } else { //we only have two requests so if it isnt matching first and last then slice it
        newWord = word.slice(1, -1); // this creates a new word without the first and last characters
        return newWord;
    }
    
}

console.log(programOne("Triscuit"));
console.log(programOne("Cracker"));
