/*
 (구조) 분해 할당에 대해서 알아본다.


*/

const points = [20, 30, 40];
const x1 = points[0]; // 20
const y1 = points[1]; // 30
const z1 = points[2]; // 40
console.log(x1, y1, z1);

const [x2, y2, z2] = points;
// const [x2, y2, z2] =[20, 30, 40];
console.log(x2, y2, z2);

// 두번째 값 무시하기
const [x3, , z3] = points; // [20, 30, 40];
console.log(x3, z3); // 20, 40

// 세번째 값 무시하기
const [x4, , , w4] = points; // [20, 30, 40];
console.log(x4, w4); // 20, undefined

const [x5, , , w5] = [20, 30, 40, () => console.log('xxxx')];
console.log(x5, w5); // 20, ()=>(console.log('xxxx'))
w5(); // xxxx

const car = {
  type: 't',
  color: 'S',
  model: 2021
};
// ES5
const type1 = car.type;
const color1 = car.color;
const model1 = car.model;
console.log(type1, color1, model1);
// ES2015
const { type, color, model, gear } = car;
console.log(type, color, model, gear); // t S 2021 undefined

// ES2015
const { type: type2, color: color2, model: model2, gear2 } = car;
console.log(type2, color2, model2, gear2); // t, s, 2021, undefined

const func1 = ({ type, color }) => {
  console.log(type); //  ?
  console.log(color); //  ?
};
func1(car);

const func2 = function (car) {
  console.log(car.type); //  ?
  console.log(car.color); //  ?
};
func2(car);
