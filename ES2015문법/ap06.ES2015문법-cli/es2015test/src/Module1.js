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
const a = 1;
const b = 2;
const d = 4;
export { a };
export const c = 3;
export default b; // export default 는 파일당 1번만 사용 가능.
