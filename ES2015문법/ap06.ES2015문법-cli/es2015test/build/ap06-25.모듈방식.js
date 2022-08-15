"use strict";

/*
  CommonJS 모듈 방식 : require 사용
    var module = require('./MyModule');


  ES2015 모듈 방식 : import/export 사용
    import React from "redux";
    import {Component} from "redux";
    import React, {Component} from "redux";
    import React as rd from "redux";
    import * as rd from "redux";
*/
// CommonJS 방식
var _module = require('./MyModule');

function Func() {
  _module();
}

_module.exports = new Func(); // CommonJS 방식
// define(['./MyModule'], function(module) {
//   function Func() {
//     module();
//   }
//   return new Func();
// });