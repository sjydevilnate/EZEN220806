/*

    ES2015의 template literal( 백틱, ``) 에 대해서 알아본다.

*/

const string1 = '안녕하세요';
const string2 = '반갑습니다';
const greeting = `${string1},


${string2}!!!!`;
console.log(greeting);

const product = { name: '도서', price: '4200원' };
const message = `제품 ${product.name.replace('도서', '책')} 의 가격은 ${product.price} 입니다.`;
console.log(message);

const value1 = 1;
const value2 = 2;
const operator1 = `곱셈값은 ${value1 * value2}입니다.`;
const operator2 = `불리언값은 ${boolValue ? '참' : '거짓'}입니다.`;
