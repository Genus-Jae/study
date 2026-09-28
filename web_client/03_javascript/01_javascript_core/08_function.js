/*
JS 함수 작성법

1. 함수 선언식 Function Declaration
   - hoisting 처리
2. 함수 표현식 Function Expression
   - 선언한 변수의 규칙에 따라 hoisting 처리

hoisting이란? 선언이 끌어올려져 처리되는 현상
*/

foo();
// console.log(k); // var로 hoisting되어 undefined
// console.log(m); // let도 hoisting되지만 초기화 전 접근 시 오류 발생

function foo() {
    console.log('fooooooo');
}

var k = 10;   // var로 선언하면 호이스팅됨
let m = 20;   // let은 선언 전 접근 불가

/*
함수 표현식: 익명 함수를 변수에 대입
*/

const bar = function () {
    console.log('baaaaaar');
};

bar();

/**
 * IIFE
 *
 * - Immediately Invoked Function Expression
 * - 함수를 정의하자마자 호출하는 방식
 * - 전역변수 대신 지역변수를 선언하고 보호하는 방식
 */

// 즉시 실행 함수
(function () {
    console.log('IIFE 테스트');
})();

(function (name) {
    console.log(`Hello ${name}`);
})('홍길동');

let app_name = 'MyFantasticApp';

(() => {
    let pet_name = '햄토리';  // IIFE 내부 지역변수
})();

// console.log(pet_name); // 참조 오류

app_name = 'YourFantasticApp';
console.log(app_name);

/*
매개변수와 인자가 불일치해도 오류가 발생하지 않음
*/

const test1 = function (a, b) {
    console.log(a, b);
    console.log(arguments);
};

test1(10, 20);
test1(10);
test1();
test1(10, 20, 30);

/*
모든 함수는 반환값을 갖는다.
return절을 명시하지 않으면 undefined 반환
*/

const test2 = function () {};

console.log(test2());

/**
 * 화살표 함수 Arrow Function
 *
 * - Python의 lambda와 같이 함수를 간결하게 작성하는 문법
 */

const f1 = function (a, b) {
    console.log(a, b);
    return a + b;
};

console.log(f1(10, 20));

// 화살표 함수
const f2 = (a, b) => a + b;

console.log(f2(10, 20));

const f3 = (a, b) => console.log(a, b);

f3(10, 20);

/**
 * Python *, **
 *
 * - packing: def foo(*args), def foo(**kwargs) 매개변수
 * - unpacking: foo(*mylist), foo(**mydict) 인자
 *
 * JavaScript ...
 *
 * - 나머지 매개변수(rest parameter):
 *   함수 선언부에서 여러 인자를 묶어 처리
 *
 * - 전개 연산자(spread operator):
 *   배열이나 객체의 요소를 나열
 */

const test3 = (year, ...names) => {
    console.log(names, typeof(names));

    for (let name of names) {
        console.log(name);
    }
};

test3(1990, '홍길동');
test3(2000, '홍길동', '신사임당');
test3(2010, '홍길동', '신사임당', '이순신');

const names = ['홍길동', '신사임당'];

test3(2026, names);     // 배열 자체를 하나의 인자로 전달
test3(2026, ...names);  // 배열 요소를 펼쳐서 전달

// 전개 연산자
(() => {
    const a = [1, 2, 3];
    const b = ['a', 'b', 'c'];

    const c = a.concat(b);  // concat으로 배열 합치기
    console.log(c);

    const d = [...a, ...b]; // 전개 연산자로 배열 합치기
    console.log(d);
})();

/**
 * JavaScript 함수는 일급 객체이다.
 *
 * 일급 객체란?
 *
 * - 익명 리터럴로 생성할 수 있어야 한다.
 * - 변수 또는 자료구조에 저장할 수 있어야 한다.
 * - 함수의 인자로 사용할 수 있어야 한다.
 * - 함수의 반환값으로 사용할 수 있어야 한다.
 */

const test4 = (k) => {
    console.log(`🤣😊😂 ${k}`);
};

test4('안녕!');

// 함수를 다른 변수에도 저장 가능
const test5 = test4;

test5('반가워~');

// test4 식별자, test4 함수 객체
const obj_funcs = {
    test4: test5
};

obj_funcs['test4']('abc'); // 객체 속성으로 정의된 함수 호출

const funcs = [test1, test2, test3, test4];

funcs[3]('이것도 되나?');

const runner = (f, n) => {
    for (let i = 0; i < n; i++) {
        f('안녕!');
    }
};

runner(test4, 3);

const test6 = (emoji) => {
    return () => {
        console.log(emoji);
    };
};

const dog_emoji = test6('🐶');
dog_emoji();

const cat_emoji = test6('🐩');
cat_emoji();

const getDessert = (dessert) => {
    return (name) => `${name}이/가 ${dessert}을/를 먹어요~`;
};

const getCake = getDessert('🍰');
const getDonut = getDessert('🍩');

console.log(getCake('철수'));
console.log(getDonut('은희'));

// 고차 함수
const getDessert2 = (dessert) =>
    (name) => `${name}이/가 ${dessert}을/를 먹어요~`;

const getCarrot = getDessert2('🥕');

console.log(getCarrot('토끼'));

const friends = ['길동', '순신', '관순'];
const getCorn = getDessert('🌽'); // 옥수수 문장 생성 함수

// 각 친구에 대한 문장 생성
friends.forEach((friends) => console.log(getCorn(friends)));

// 문장들을 새 배열로 하나씩 적용해서 생성
const results = friends.map((friend) => getCorn(friend));

console.log(results);

