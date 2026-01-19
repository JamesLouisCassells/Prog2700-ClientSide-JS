/*
PROGRAM 3
Write a JavaScript program to calculate the number of weeks, days, hours, minutes and seconds left until midnight on your birthday. 
Output your results in Console.
The script does not have to prompt for your birthdate. Simply assign it to a variable and start from there. 
Ex: var myNextBirthday = …your code here 
Expected sample output (console.log()): 
There are 35 weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday! */

//Pseudocode
/* Javascript date gives the exact current time - use this against the users input birth date
    --new Date(year, monthIndex, day, hours, minutes, seconds
use const nextBirthDay to set birth date 
    --const nextBirthDay = new Date((2026, 7, 28, 10, 0, 0, 0) 28 August 2026
use const dateNow() to set current date
    --const dateNow = new Date()
evaluate different in those two and print that difference 
    -- let timeToDate = dateNow - birthDate

// Year, Month (0-11), Day, Hour, Minute, Second, Millisecond
const anotherDate = new Date(2023, 11, 25, 10, 0, 0, 0); // December 25, 2023, 10:00 AM
*/

function programThree() {
    const nextBirthDay = new Date(2026, 7, 28, 0, 0, 0, 0); //28 August 2026
    const datenow = new Date(); //current date converted to milliseconds
    const millisecToBday = nextBirthDay - datenow; //variable that holds the remaining milliseconds to my birthday

    const ms = { //creates an object that store the length of each factor for later conversion
        seconds: 1000,
        minutes: 60 * 1000,
        hours:   60 * 60 * 1000,
        days:    24 * 60 * 60 * 1000,
        weeks:   7 * 24 * 60 * 60 * 1000
        };

    let remainingMs = millisecToBday
    let weeks = Math.floor(remainingMs / ms.weeks); //variable rounds ms to weeks, returns remaining ms
    remainingMs = remainingMs % ms.weeks;

    let days = Math.floor(remainingMs / ms.days); //variable of remaining ms to days, returns remaining ms
    remainingMs = remainingMs % ms.days;

    let hours = Math.floor(remainingMs / ms.hours);//variable of remaining ms to hours, returns remaining ms
    remainingMs = remainingMs % ms.hours;

    let minutes = Math.floor(remainingMs / ms.minutes);//variable of remaining ms to minutes, returns remaining ms
    remainingMs = remainingMs % ms.minutes;

    let seconds = Math.floor(remainingMs / ms.seconds);//variable of remaining ms to seconds, returns remaining ms
    remainingMs = remainingMs % ms.seconds;
    
    const timeToBday = { weeks, days, hours, minutes, seconds}; // creates an object storing the above variables
    console.log(`There are ${timeToBday.weeks} weeks, ${timeToBday.days} days, ${timeToBday.hours} hours, ${timeToBday.minutes} minutes and ${timeToBday.seconds} seconds until my next birthday!`);
    // accesses the object and inserts them into a log statement 
    //There are 35 weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday! -this is my goal

    return timeToBday;
}
programThree();