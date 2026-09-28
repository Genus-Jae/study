/*
Scope란? 변수 유효범위

- 전역스코프(global scope): 전역에서 선언된 변수는 전역에서 접근 가능하다. 
- 지역스코프(local scope): 지역에서 선언된 변수는 지역에서만 접근 가능하다.
    - 함수블럭
    - if/for블럭
*/

let a = 10;
console.log(a);

function foo() {
    let b = 20;
    console.log(b);

    console.log(a);
}

foo();

//console.log(b); // 전역지역에서 지역변수는 접근할 수 없다.

if (true) {
    let c = 30;
    console.log(c);

    a *= 10;
    console.log(a);
}

// 지역에서 전역변수에 대한 읽기/쓰기가 가능하다.
console.log(a)
//console.log(c)

// 전역변수로 사용할 변수 선언 후 반복문 내에서 값 값 제어
let i = 0;
for (i = 0; i < 3; i++) {
    console.log(i)
}
console.log(i)

/*
- var: 함수스코프 (if/for블럭 무시)
- let/const: 블럭스코프 
*/

// 변수 중복 선언 문제
var x = 10;
var x = 20;

function bar() {
    var y = 200;
}
bar();
// console.log(y);

if (true) {
    var z = 300;
}
console.log(z); // if문 블록 밖에서도 접근 가능