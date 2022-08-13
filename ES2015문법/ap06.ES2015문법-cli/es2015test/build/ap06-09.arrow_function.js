"use strict";

/*

    ES6 의 화살표 사용법을 학습한다.

    화살표 함수는 function 키워드 없이도 함수를 만들 수 있으며,
    return을 사용하지 않아도 식을 계산한 값이 자동으로 반환된다.
    this 의 문제점을 해결할 수 있다.
    화살표 함수에서는 arguments 를 사용 할 수 없다.
    ===> rest 연산자가 나오게 됨.

*/
var func1 = function func1(a, b) {
  return a + b;
};

console.log(func1(3, 4)); // 7

var func2 = function func2(a, b) {
  return a + b;
};

console.log(func2(3, 4)); // 7

var func4 = function func4(a, b) {
  return a + b;
};

console.log(func2(3, 4)); // 7