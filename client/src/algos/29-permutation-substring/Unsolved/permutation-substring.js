// Write code to create a function that accepts two strings
// Return true if the second string is a substring of any permutation of the first string
// Else return false

var permutationSubstring = function (str, sub) {

    if (str.length < sub.length) {
        return false
    }

    var subLetters = sub.toLowerCase().split('')
    var strLetters = str.toLowerCase().split('')

    for (let i = 0; i < strLetters.length; i++) {
        if (subLetters[0] === ' ') {
            subLetters.splice(0, 1)
        }
        if (strLetters.includes(subLetters[0])) {

            let index = strLetters.indexOf(subLetters[0])
            strLetters.splice(index, 1)
            subLetters.splice(0, 1)
        }
    }

    if (!subLetters[0]) {
        return true
    }
    return false
};