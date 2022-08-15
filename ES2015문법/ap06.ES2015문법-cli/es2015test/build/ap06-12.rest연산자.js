"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
    rest 연산자 사용법을 학습한다.

    rest 연산자는 매개변수를 배열로 만드는 연산자다.
    rest 연산자(...)는 함수의 매개변수에서 주로 사용된다.
    rest 연산자(...)는 함수의 매개변수로 넘어오는 값들을 "배열"로 만든다.
    rest 연산자(...)는 arguments 를 대체한다.
    rest 연산자(...)는 Array 메서드를 사용할 수 있다.
*/
//  ...args 에서  ... 를 rest 연산자라고 부른다
function greet() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // 가변매개변수를 이용한 출력
  console.log('가변매개변수(rest연산자) >> ', args); // arguments 를 사용하여 출력

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

func1(1, 2, 3, 4, 0); // ES6 문법

function func2() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var first = args[0],
      others = args.slice(1);
  console.log('func2 >>', first);
  console.log('func2 >>', others);
}

func2(1, 2, 3, 4, 0);

function func3(first) {
  var firstInES6 = first;

  for (var _len3 = arguments.length, others = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    others[_key3 - 1] = arguments[_key3];
  }

  var othersInES6 = others;
  console.log('func3 >>', first);
  console.log('func3 >>', others);
}

func3(1, 2, 3, 4, 0); // ES6 예제

var item1 = 0,
    otherItems = [1, 2];

var _one$two$three$four$o = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  other: 0
},
    other = _one$two$three$four$o.other,
    others = _objectWithoutProperties(_one$two$three$four$o, ["other"]);

console.log('combined >> other', other); // other = {other: 0}

console.log('combined >> others', others); // others = { one: 1, two: 2, three: 3, four: 4}