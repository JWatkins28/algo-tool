// Write code to return the the number of vowels in `str`

var vowelCount = function(str) {
    let vowels = ['a','e','i','o','u']
    let vowelCount = 0;
    let word = str.toLowerCase().split('')
    for (let i = 0; i < vowels.length; i++) {
        let n = i
        for (let i = 0; i < word.length; i++)
        if (word[i].includes(vowels[n])) {
            vowelCount++;
        }
    }
    return vowelCount;
};
