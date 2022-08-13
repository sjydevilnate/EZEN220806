"use strict";

/*

    개선된 객체 표현식에 대해서 알아본다.
      개선된 객체 프러퍼티 표현식
      개선된 객체 메서드 표현식
*/
var name = "홍길동";
var age = 20; // ES5

var p1 = {
  name: name,
  age: age,
  powderYell: function powderYell() {
    var yell = this.name.toUpperCase();
    console.log(yell + yell + "!!!");
  },
  setAge: function setAge(mph) {
    this.age = mph;
    console.log("나이:", mph);
  }
};