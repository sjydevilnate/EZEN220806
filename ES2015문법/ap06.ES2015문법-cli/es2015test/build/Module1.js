"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.c = exports.a = void 0;

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
// Module1.js
var a = 1;
exports.a = a;
var b = 2;
var d = 4;
var c = 3;
exports.c = c;
var _default = b; // export default 는 파일당 1번만 사용 가능.

exports["default"] = _default;