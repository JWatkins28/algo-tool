var sortedSquares = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        arr.splice(i, 1, arr[i] * arr[i] )
    }
    return arr.sort((a,b) => a - b)
};