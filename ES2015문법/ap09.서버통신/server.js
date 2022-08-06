/*
 * reference site
 * http://stackoverflow.com/questions/4505809/how-to-post-to-a-request-using-node-js
 */

var http  = require('http');
var $url  = require('url');
var $fs   = require('fs' );
var $qs   = require('querystring');

var jsonLogin = JSON.stringify({
    'username': randomString(10, 'afxfdfyrsu98ccy65ki'),
    'email'   : 'email@mail.com',
    'password': 'a075d17f3d453073853f813838c15c3942e1f95'
});
var jsonLogout = JSON.stringify({
    'username': "",
    'email'   : "",
    'password': ""
});

var usersList = [
    {
        'uid': "uid01",
        'pwd': "pwd01",
        'name': "홍길동",
        'email': 'email@mail.com',
        'token': null /* randomString(10, 'a075d17f3d453073853f813838c15c3942e1f95') */,
        'isLogin': false,
    },
    {
        'uid': "uid02",
        'pwd': "pwd02",
        'name': "강남길",
        'email'   : 'email@naver.com',
        'token': null /* randomString(10, 'a075d17f3d453073853f813838c15c3942e1f95') */,
        'isLogin': false,
    },

];

var dataXml = '';
dataXml += '<?xml version="1.0" encoding="utf-8"?>  ';
dataXml += '<REST>                                  ';
dataXml += '    <ListOfLN_Interface>                ';
dataXml += '        <Contact>123304</Contact>       ';
dataXml += '    </ListOfLN_Interface>               ';
dataXml += '</REST>                                 ';


function QueryStringToJSON(qs) {
    var arr = qs.split('?');

    if( arr.length <= 1 ) return null;

    var pairs = arr[1].split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

function QueryJsonToObject(query) {

    var obj = null
    if( query["0"] ){
        obj = JSON.parse( query["0"] );
    }

    return obj
}

// http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
function getParams(request, response, callback) {
    var params = null;

    if(typeof callback !== 'function') return null;

    if(request.method.toUpperCase() === 'POST') {
        var queryData = "";
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            params = $qs.parse(queryData);
            callback(params, request, response);
        });
    }
    else if (request.method.toUpperCase() === 'GET') {
        params = $url.parse(request.url, true);
        console.log(params.query);

        callback(params, request, response);
    }
    else {
        response.writeHead(405, {'Content-Type': 'text/plain'} );
        response.end();
    }
}

/*
    make a random sting in javascript
    http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
function makeid() {
    var possible = "ABCDEFG HIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var text = "";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*
 make a random sting in javascript
 http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 사용법:
 var randomValue = randomString(5);
 var randomValue = randomString(5, 'PICKCHARSFROMTHISSET');
 */
function randomString(len, charSet) {
    charSet = charSet + 'ABCDE FGHI JKL MNOPQ RS TUVW XY Za bc defg hij klm nop qrst uv wxyz0 12 3 45 67 89';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * charSet.length);
        randomString += charSet.charAt(pos);
    }
    return randomString;
}


/**
 *
 * @param {*} state
 */
function createStore(state = {}) {
    return {
        counter(inc) {
            return state.counter += Number(inc);
        },
        todoGet(){
            return state.todoItems;
        },
        todoAdd(newTodo){

            /* max 를 id 를 찾는방법
                1. array.reduce() 사용
                2. array.map()과 Math.max()를 사용하는 방법
            */

            // 1. array.reduce() 를 사용하여 newId를 구하는 방법
            var maxObj = null;
            if (state.todoItems.length === 0) {
                maxObj = {
                    id: 0,
                    todo: "",
                    done: false
                };
            } else {
                maxObj = state.todoItems.reduce(function (
                    prevItem,
                    nextItem
                ) {
                    // 최대 id 값을 갖고있는 item을 찾는다.
                    return prevItem.id > nextItem.id ? prevItem : nextItem; //
                });
            }
            console.log(maxObj);

            var newid = maxObj.id + 1;

            /*
                state.todoItems[state.todoItems.length] = {
                    id: newid
                    todo: state.newTodoItem,
                    done: false,
                };
            */
            state.todoItems.push( Object.assign({ id: newid },newTodo ) );
        },
        todoDoneToggle: function (id, paramIndex) {
            // update
            // object array 에서 찾는 방법
            // 1. array.findIndex()을 사용하여 paramIndex 찾기
            var searchIndex = state.todoItems.findIndex( function(item){
                //return item.id === id;
                if( item.id === id ){
                    return true;
                }
                else {
                    return false;
                }
            });

            const finalIndex=  searchIndex >=0 ? searchIndex: paramIndex;

            if ( finalIndex >= 0) {
                state.todoItems[finalIndex].done = !state.todoItems[finalIndex].done;
            }

            return state.todoItems;
        },
        todoRemove: function (id, paramIndex) {
            // delete: ;
            // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
            // 방법1: array.splice() 을 사용하는 방법
            // 방법2: array.map() 을 사용하는 방법

            // object array 에서 찾는 방법
            // 1. array.findIndex()을 사용하여 paramIndex 찾기
            var searchIndex = state.todoItems.findIndex( function(item){
                //return item.id === id;
                if( item.id === id ){
                    return true;
                }
                else {
                    return false;
                }
            });

            const finalIndex =  searchIndex >=0 ? searchIndex: paramIndex;

            if ( finalIndex >= 0) {
                state.todoItems.splice( finalIndex, 1);
            }
        },
        todoClearAll: function () {
            state.todoItems = [];
        }
    };
}

var store = createStore({
    counter: 0,
    todoItems: [
        { id: 1, todo: "영화보기-api", done: false },
        { id: 2, todo: "주말 산책-api", done: true },
        { id: 3, todo: "ES6 학습-api", done: false },
        { id: 4, todo: "잠실 야구장-api", done: false }
    ],
});

/**
 * "실전 리액트 프로그래밍", chapter 6, page 280~281.
 */
var getNextData = (function makeDataGenerator() {
    let itemIndex = {
        friends: 0,
        timelines: 0,
    };
    items = {
        friends: [
            { name: '쯔위', age: 15 },
            { name: '수지', age: 20 },
            { name: '아이유', age: 25 },
            { name: '손나은', age: 30 },
        ],
        timelines: [
            { desc: '점심이 맛있었다', likes: 0 },
            { desc: '나는 멋지다', likes: 10 },
            { desc: '호텔에 놀러 갔다', likes: 20 },
            { desc: '비싼 핸드폰을 샀다', likes: 30 },
        ],
    }

    /**
     *
     * @param {*} name
     */
    return function getNextData(name) {

        const item = items[name][itemIndex[name] % items[name].length];
        itemIndex[name] += 1;
        const newitem = { ...item, id: itemIndex[name] };
        return newitem;
    };
})();

console.log( getNextData("friends") );
console.log( getNextData("friends") );
console.log( getNextData("timelines") );
console.log( getNextData("timelines") );



// node 서버 만들기
http.createServer( function(req, res) {

    console.log('request received.');

    var urlpath = $url.parse(req.url).pathname;

    if( urlpath === '/' && req.method.toUpperCase()==='GET'  ) {
        var msg = "Node 서버가 실행 중입니다.";
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Length': Buffer.byteLength(msg)
        });
        res.write(msg);
        res.end();
    }

    if( urlpath === '/text' && req.method.toUpperCase()==='GET'  ) {
        // 비동기적 읽기
        var filename = __dirname + '/item.txt';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'text/plain; charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/html' && req.method.toUpperCase()==='GET'  ) {
        // 비동기적 읽기
        var filename = __dirname + '/item.html';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/xml' && req.method.toUpperCase()==='GET'  ) {
        // 비동기적 읽기
        var filename = __dirname + '/item.xml';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/xml, charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    if( urlpath === '/json' && req.method.toUpperCase()==='GET' ) {

        // 비동기적 읽기
        var filename = __dirname + '/item.json';
        $fs.readFile( filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }

            console.log( filename + ' file readed');

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data);
            res.end();
        });
    }

    // 호출 : http://localhost:5050/user/all
    if( urlpath === '/user/all' /* && req.method.toUpperCase() === 'POST' */ ) {
        console.log( 'all ...');

        getParams(req, res, function(data){
            console.log( data );

            var resContent = usersList.length === 0 ? "" : JSON.stringify(usersList);
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json charset=utf-8',
                'Content-Length': Buffer.byteLength(resContent)
            });
            res.write( resContent );
            res.end();
        });
    }

    // 호출 : http://localhost:5050/user/login?uid=uid01&pwd=pwd01
    if( urlpath === '/user/login' /* && req.method.toUpperCase() === 'POST' */ ) {
        console.log( 'login ...');

        getParams(req, res, function(data){
            console.log( data );

            // DB에서 로그인 검증 처리
            var user = usersList.filter(function (el) {
                if( el.uid === this.uid && el.pwd === this.pwd ) {
                    return true;
                }
                return false;
            }, data.query)
            .map( function(el){
                if( el.uid === this.uid && el.pwd === this.pwd ) {
                    el.token = randomString(10, 'a075d17f3d453073853f813838c15c3942e1f95');
                    el.isLogin = true;
                }
                return el;

            }, data.query);

            var resContent = user.length === 0 ? "" : JSON.stringify(user[0]);
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json charset=utf-8',
                'Content-Length': Buffer.byteLength(resContent)
            });
            res.write( resContent );
            res.end();
        });
    }

    // 호출 : http://localhost:5050/user/logout?uid=uid01
    if( urlpath === '/user/logout' /* && req.method.toUpperCase() === 'POST' */ ) {
        console.log( 'logout ...');

        getParams(req, res, function(data){
            console.log( data );

            // DB에서 로그아웃 검증 처리
            var user = usersList.map(function (el) {
                if( el.uid === this.uid ) {
                    el.token = null /* randomString(10, 'a075d17f3d453073853f813838c15c3942e1f95') */;
                    el.isLogin = false;
                }
                return el;
            }, data.query);

            var resContent = user.length === 0 ? "" : JSON.stringify(user[0]);

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json charset=utf-8',
                'Content-Length': Buffer.byteLength(resContent)
            });
            res.write(resContent);
            res.end();
        });
    }

    // 호출 : http://localhost:5050/user/register?uid=uid01&pwd=pwd01&name=홍길동&email=email@mail.com
    if( urlpath === '/user/register' /* && req.method.toUpperCase() === 'POST' */ ) {
        console.log( 'register ...');

        getParams(req, res, function(data){
            console.log( data );

            // DB에 insert처리
            usersList.push(data.query);

            var resContent = JSON.stringify( usersList[usersList.length-1] );

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json charset=utf-8',
                'Content-Length': Buffer.byteLength(resContent)
            });
            res.write(resContent);
            res.end();
        });
    }


    // 호출 : http://localhost:5050/user/unregister?uid=uid01
    if( urlpath === '/user/unregister' /* && req.method.toUpperCase() === 'POST' */ ) {
        console.log( 'unregister ...');

        getParams(req, res, function(data){
            console.log( data );

            // DB에 insert처리
            var searchIndex = usersList.findIndex( function(item){
                //return item.id !== this.uid ;
                if( item.uid === this.uid ){
                    return true;
                }
                else {
                    return false;
                }
            }, data.query);
            usersList.splice(searchIndex, 1);

            var resContent = JSON.stringify(  {mesg: "unregister success"} );

            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json charset=utf-8',
                'Content-Length': Buffer.byteLength(resContent)
            });
            res.write(resContent);
            res.end();
        });
    }


    // 호출 : http://localhost:5050/board?start=10&end=20
    if( urlpath === '/board' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            var arr = [];
            for(var i=Number(data.query.start); i<=Number(data.query.end); i=i+1){
                var obj = {
                    no: i
                    , title : 'title ' + ("00000000" + i).slice(-8)
                    , writer : makeid()
                    , content : randomString(700, i.toString() )
                };

                arr.push( obj );
            }
            var txt = JSON.stringify(  arr );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();

        });
    }


    if( urlpath === '/welcome' && req.method.toUpperCase() === 'POST'  ) {

        getParams(req, res, function(data){
            console.log( data );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'text/plain',
                'Content-Length': Buffer.byteLength(data)
            });
            res.write(data.name);
            res.end();

        });
    }


    // 호출 : http://localhost:5050/counter?step=10
    if( urlpath === '/counter' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            if( data.query.step === null || data.query.step === undefined) data.query.step = 0;

            var step = Number(data.query.step);
            var counter = store.counter(data.query.step);
            var txt = JSON.stringify( counter );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }


    // 호출 : http://localhost:5050/todo/get
    if( urlpath === '/todo/get' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            var todos = store.todoGet();
            var txt = JSON.stringify( todos );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }


    // 호출 : http://localhost:5050/todo/add?todo=aaa&done=false
    if( urlpath === '/todo/add' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            var obj = QueryJsonToObject(data.query);
            if( !obj ){
                obj = {
                    todo: data.query["todo"],
                    done: false,
                }
            }

            store.todoAdd(obj);
            var todos = store.todoGet();
            var txt = JSON.stringify( todos );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }

    // 호출 : http://localhost:5050/todo/donetoggle?id=1&index=1
    if( urlpath === '/todo/donetoggle' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            var obj = QueryJsonToObject(data.query);
            if( !obj ){
                obj = {
                    id: Number(data.query["id"]),
                    index: Number(data.query["index"]),
                }
            }

            store.todoDoneToggle(obj.id, obj.index);
            var todos = store.todoGet();
            var txt = JSON.stringify( todos );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }

    // 호출 : http://localhost:5050/todo/remove?id=1&index=1
    if( urlpath === '/todo/remove' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            var obj = QueryJsonToObject(data.query);
            if( !obj ){
                obj = {
                    id: Number(data.query["id"]),
                    index: Number(data.query["index"]),
                }
            }

            store.todoRemove(obj.id, obj.index);
            var todos = store.todoGet();
            var txt = JSON.stringify( todos );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }

    // 호출 : http://localhost:5050/todo/clearall
    if( urlpath === '/todo/clearall' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            store.todoClearAll();
            var todos = store.todoGet();
            var txt = JSON.stringify( todos );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }

    // 호출 : http://localhost:5050/getnextdata?name=friends
    // 호출 : http://localhost:5050/getnextdata?name=timelines
    if( urlpath === '/getnextdata' && req.method.toUpperCase() === 'GET'  ) {

        getParams(req, res, function(data){
            console.log( data );

            if( data.query.name === null || data.query.name === undefined) data.query.name = "friends";

            var txt = JSON.stringify( getNextData(data.query.name) );

            res.writeHead(200, "OK", {
                'Access-Control-Allow-Origin': '*', /* 크로스 도메인 지원 설정 */
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', /* Request methods you wish to allow */
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization', /* Request headers you wish to allow */
                'Content-Type': 'application/json, charset=utf-8',
                'Content-Length': Buffer.byteLength( txt )
            });
            res.write( txt );
            res.end();
        });
    }

}).listen(5050, 'localhost');

console.log('start server - anonymous function');
