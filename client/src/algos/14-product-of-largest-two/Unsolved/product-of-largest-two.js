// Write code to create a function that accepts an array of numbers, finds the largest two numbers, and returns the product of the two

var productOfLargestTwo = function(arr) {
    let sorted = arr.sort((a, b) => a - b)
    let num1 = sorted[sorted.length - 1]
    let num2 = sorted[sorted.length - 2]
    return num1 * num2
};

