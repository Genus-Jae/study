console.log("Hello Node.js");  // 문자열 콘솔에 출력

// 함수 선언
function add(a, b) {
    return a + b;
}

// 변수 선언
const result = add(10, 20);
console.log(result);

// 한줄 주석
/*
여러줄 주석
여러줄 주석
*/


// package.json의 "type": "commonjs"면 require() 문법, "type": "module"이면 import/export문법
import fs from 'fs' // 파일 시스템 모듈
import {fileURLToPath} from 'url'; // file URL을 파일 경로로 변환하는 함수

const filename = fileURLToPath(import.meta.url)
console.log(import.meta.url) // 현재 파일의 url 형식
console.log(filename) // 현재 파일의 실제 경로

// 파일 읽기 작업이 끝난 뒤 자동으로 실행되는 콜백 함수 (function(err,data))
fs.readFile(filename, 'urf-8', function(err,data){
    if(err){
        console.error('파일 읽기 실패 : err')
        return;
    }
    console.log('파일 내용: \n', data)
});