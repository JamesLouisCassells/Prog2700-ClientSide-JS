/*
PROGRAM 4
Write a JavaScript program to iterate through an array of ten(10) positive randomly generated numbers. 
Each number will then be checked to see if it’s a prime number. 
Output your results in Console.
Sample Expected output:

23-yes, 15-no, 22-no, 124-no, 11-yes, 9-no, 2-yes, 13-yes, 5-yes, 1-no 
*/

/* pseudocode
create a function
loop through the array using a for loop 
    --for (let i = 0; i < primeArray.length; i++ ) 
create a variable that checks whether something is a prime number
    --for every number from 2 u[ until n-1 if it divides evenly it isnt a prime number
    --if number % divisor === 0  then it is a prime number

    PRIME NUMBER: a whole number greater than 1 that cannot be exactly divided by any whole number other than itself and 1
*/
function arrayGenerator() {
    let array = [];
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 500) +1); 
        // creates an array of ten values between 1 and 500 using the math function 
    }
    return array;
}

function programFour(number) {
    let newArray = [];
    for (let i = 0; i < number.length; i++ ) {  //run through the length of the array
        let n = number[i]; //assign n to the value at that position of the array. Saves processing power to do this early.
        let isPrime = true; //assume its a prime number to begin until proven wrong
        
        if (n <= 1) { //immediately handles 1 and anything less than 0 which cannot be prime
            isPrime = false; // only once we've proven a divisor and thus not a prime do we KNOW its not a prime
        }
        else {
            for (let divisor = 2; divisor < n; divisor++){ 
                //divisor is used to check if it is a prime number until divisor is the same number as its checking
                if (n % divisor == 0) { //does it divide evenly with no remainder? if so its not prime
                    isPrime = false;
                    break; // can exit the loop early here because we know it isnt prime
                }
            }
        if (isPrime) {
            newArray.push(`${n} - yes`)
        } 
        else { 
            newArray.push(`${n} - no`)
        }
    }

    
}
console.log(newArray.join(", "));
}

let tenNumbers = arrayGenerator();
programFour(tenNumbers);
