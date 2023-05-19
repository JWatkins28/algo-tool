// Write code to create a function that accepts a string and returns an object containing the number of times each character appears in the string

var characterCount = function (str) {
    let object = {};
    for (let i = 0; i < str.length; i++) {
        let letter = str.charAt(i)
        if (!object[letter]) {
            object[letter] = 1
        } else {
            object[letter]++
        }
    }
    return object
};
