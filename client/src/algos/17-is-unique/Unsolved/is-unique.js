// Write code to create a function that accepts an array numbers
// Return `true` is no number appears in the array more than once, else return `false`

// var isUnique = function(arr) {};

const isUnique = (arr) => {
    let count = {};
    for (let i = 0; i < arr.length; i++) {
        if (!count[arr[i]]) {
            count[arr[i]] = 1
        } else {
            count[arr[i]]++
        }
        if (count[arr[i]] > 1) {
            return false
        }
    }
    return true
};