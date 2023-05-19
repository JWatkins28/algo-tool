// Write code to return the largest number in the given array

var maxNum = function(arr) {
    let bigBoi = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > bigBoi) {
            bigBoi = arr[i]
        }
    }
    return bigBoi
};
