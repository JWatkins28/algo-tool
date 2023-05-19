// Write code to create a function that accepts a string and returns the string in camelCase

var camelCase = function(str) {
    let arr = str.split(' ')
    arr.splice(0, 1, arr[0][0].toLowerCase() + arr[0].substring(1))

    for (let i = 1; i < arr.length; i++) {
        arr.splice(i, 1, arr[i][0].toUpperCase() + arr[i].substring(1))
    }
    return arr.join('')
};
