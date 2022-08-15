/*
    rest 연산자 사용법을 학습한다.

    rest 연산자는 매개변수를 배열로 만드는 연산자다.
    rest 연산자(...)는 함수의 매개변수에서 주로 사용된다.
    rest 연산자(...)는 함수의 매개변수로 넘어오는 값들을 "배열"로 만든다.
    rest 연산자(...)는 arguments 를 대체한다.
    rest 연산자(...)는 Array 메서드를 사용할 수 있다.
*/

//  ...args 에서  ... 를 rest 연산자라고 부른다
function greet(...args) {
  // 가변매개변수를 이용한 출력
  console.log('가변매개변수(rest연산자) >> ', args);

  // arguments 를 사용하여 출력
  console.log('arguments >> ', arguments);

  console.log('\n');
}
greet(); //
greet('Elise'); //  Elise
greet('Mike', 'Hi'); //  Mike Hi

// ES5 에서 rest 연산자 기능 구현하기
function func1() {
  var args = Array.prototype.slice.call(arguments);
  var first = args[0];
  var others = args.slice(1);

  console.log('func1 >>', first);
  console.log('func1 >>', others);
}
func1(1, 2, 3, 4, 0);

// ES6 문법
function func2(...args) {
  var [first, ...others] = args;

  console.log('func2 >>', first);
  console.log('func2 >>', others);
}
func2(1, 2, 3, 4, 0);

function func3(first, ...others) {
  var firstInES6 = first;
  var othersInES6 = others;

  console.log('func3 >>', first);
  console.log('func3 >>', others);
}
func3(1, 2, 3, 4, 0);

// ES6 예제
const [item1, ...otherItems] = [0, 1, 2];
const { other, ...others } = { one: 1, two: 2, three: 3, four: 4, other: 0 };
console.log('combined >> other', other); // other = {other: 0}
console.log('combined >> others', others); // others = { one: 1, two: 2, three: 3, four: 4}
