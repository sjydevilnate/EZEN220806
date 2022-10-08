// 5. API 만들기
// src/containers/counter/api.js
import axios from 'axios';

export function getPromise(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randnum = Math.random();
      if (randnum * 10 < 8) {
        const result = {
          data: {
            ...params,
            time: new Date().toLocaleTimeString(),
            value: randnum,
          },
        };
        resolve(result);
      } else {
        reject('getPromise 실패');
      }
    }, 1000);
  });
}

export function callApi(params) {
  return axios({
    url: 'http://localhost:5050/counter', // 호출되는 서버 주소.
    method: 'get', // request method: get, post, delete, put
    params: { ...params }, // 서버로 보내는 데이터. { data1:'test1', data2:'test2' }
    timeout: 30000, // 최대 대기 시간: 30초. 30초 이상이 되면 fail 부분이 실행됨.
    responseType: 'json', // response로 넘어오는 데이터 형태: text, html, xml, json, jsonp, script
  });
}
