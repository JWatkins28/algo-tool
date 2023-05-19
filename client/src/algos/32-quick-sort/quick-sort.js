// Create our input data
const unsortedInputArray = [];
// seed data in unsortedInputArray
for (let i = 0; i < 2000; i++) {
  unsortedInputArray.push(Math.round(Math.random() * 2000));
}

// TODO: create quick sort function
const quickSort = (array) => {
  if (array.length <= 1) {
    return array;
  }
  let pivot = array.splice(Math.floor(Math.random(array.length)), 1)
  let smallerArr = [];
  let largerArr = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      smallerArr.push(array[i])
    } else {
      largerArr.push(array[i])
    }
  }

  return [...quickSort(smallerArr), pivot, ...quickSort(largerArr)];

};

const sorted = quickSort(unsortedInputArray);
console.log('Post Sort:', sorted.join(' '));
console.log('DONE!');
