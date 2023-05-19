// Write code to merge two sorted arrays into a new sorted array

var mergeSorted = function (arr1, arr2) {
    let combinedArr = arr1.concat(arr2)
    let sortedArr = [];
    while (sortedArr.length === 10) {
        let min = Math.min(...combinedArr)
        let index = combinedArr.indexOf(min)
        sortedArr.push(min)
        combinedArr.splice(index, 1)
    }
    return sortedArr;
};