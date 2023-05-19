// Write code to create a function that accepts two arrays of numbers
// Return a new array containing the intersecting elements of the arrays

var arrayIntersection = function(arr1, arr2) {
    let intersectArr = [];
    let index;
    while (arr1[0]) {
        if (arr2.includes(arr1[0])) {
            intersectArr.push(arr1[0])
            index = arr2.indexOf(arr1[0])
            arr2.splice(index, 1)
        }
        arr1.splice(0, 1)
    }
    console.log(intersectArr)
    return intersectArr;
};