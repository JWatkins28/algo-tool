// Write a function that takes two strings and returns true if every word found in the second string is present in the first string. You will be checking for both words and their frequency. Assume you'll need to worry about casing, but the strings won't contain any punctuation. Assume neither string will be empty

var concertFlyer = function (magazine, flyer) {
    let magWords = {};
    let flyerWords = {};
    let magArr = magazine.split(" ")
    let flyerArr = flyer.split(" ")

    for (let i = 0; i < flyerArr.length; i++) {
        flyerWords[flyerArr[i]] = (flyerWords[flyerArr[i]] || 0) + 1
    }

    for (let i = 0; i < magArr.length; i++) {
        magWords[magArr[i]] = (magWords[magArr[i]] || 0) + 1
    }
    console.log('flyerWords', flyerWords)
    console.log('magWords', magWords)
    for (const word in flyerWords) {
        if (!magWords[word] >= flyerWords[word] || !magWords[word]) {
            return false;
        }
    }

    return true;
};
