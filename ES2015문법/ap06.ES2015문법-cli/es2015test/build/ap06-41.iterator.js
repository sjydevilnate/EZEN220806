/*
    Iterator 함수와 Iterator 객체

    Iterator 함수는 next() 메서드가 있는 객체를 반환하는 함수다.
    1. next() 메서드를 갖고 있다.
    2. next() 메서드는 value와 done 프로퍼티를 갖는 객체를 반환한다.
    3. 반복 이 끝나면  done 프로퍼티는 참이 된다.


    Iterable 객체는 반복을 정의하는 객체다.
    Iterable 객체는 [Symbol.iterator]  메서드를 반드시 구현해야 한다.
*/
"use strict";