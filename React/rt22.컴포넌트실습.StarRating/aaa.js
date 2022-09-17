const totalStars = 5;

const arr = [...Array(totalStars).keys()].map((val) => val + 1);
debugger;
console.log(arr);

const arr2 = Array.from(new Array(20), (x, i) => i + 1);
debugger;
console.log(arr2);

const arr3 = Array(10)
  .fill(1)
  .map((val, index) => val + index);
debugger;
console.log(arr3);

const arr4 = [...Array(totalStars)].map((val, i) => i + 1);
debugger;
console.log(arr4);
