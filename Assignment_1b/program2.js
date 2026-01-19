/* PROGRAM 2
Write a function in JavaScript that will return the sum of the longest streak of consecutive increasing numbers within an array and output it in Console.  
If there are no consecutive numbers in the array, the function should return zero. 
If there are multiple instances of the same amount of consecutive numbers in the array, the function will return the largest sum calculated between all instances. 
Examples: 
[1, 2, 3, 6, 9, 34, 2, 6] would return 6 (1+2+3) 
[3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3] would return 27 (8+9+10) 
[100, 101, 102, 3, 4, 5, 6, 9] would return 18 (3+4+5+6) */

//Pseudcode
/* 
Create empty array
for loop to go through the array and check the value of each index
if the value is +1 from previous then add value total to a separate array
if it happens again and the new value is higher then replace first array

*/
function programTwo(sequence) {
  let currentSum = 0;
  let currentArray = [];
  let maxArray = [];
  let maxSum = 0;

  for (let i = 0; i < sequence.length; i++) {
    // loops through the input sequence incrementally

    if (sequence[i] === sequence[i - 1] + 1) {
      //if the value is one up from the previous one (makes sure i dont miss a value)
      if (currentSum === 0) {
        currentSum = sequence[i - 1]; //takes the number before that indexed value and adds it to the variable
        currentArray.push(sequence[i - 1]); // adds the value to an array 
      }

      currentSum += sequence[i];
      currentArray.push(sequence[i]);
      //If its the start of the streak dont forget the previous number

    } else {
      //if the streak has ended then compare if it was longer or equal to previous streak consecutively AND in sum
      if (
        currentArray.length > maxArray.length ||
        (currentArray.length === maxArray.length && currentSum > maxSum)
      ) {
        //checks if the new streak is longer than the previous streak
        maxArray = currentArray;
        maxSum = currentSum;
      }

      currentArray = [];
      currentSum = 0; //resets the streak counter for future streaks
    }
  }

  //final catch to make sure we get the last longest streak (if array ends while still in a streak)
  if (
    currentArray.length > maxArray.length ||
    (currentArray.length === maxArray.length && currentSum > maxSum)
  ) {
    maxArray = currentArray;
    maxSum = currentSum;
  }

  return maxSum;
}

console.log(programTwo([100, 101, 102, 3, 4, 5, 6, 9]));
