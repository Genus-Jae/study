/*
js의 8가지 자료형
1. undefined
2. string
3. number
4. boolean
5. null
6. object(array, object, function)
7. bigint 큰수/정밀한수를 제어하기 위한 숫자형
8. symbol 고유하고 수정불가능한 자료형형
*/

/*
변수선언 키워드
- let: 변수 선언
- const: 상수 선언
- var: (legacy) 예전 브라우져 실행하는 경우
*/

// 1.undefined: 타입/값 정의되지 않은 상태
let a;
console.log(a, typeof(a)); // 자료형 출력

// 2. number: 정수/실수
a = 3;
let b = 3.2;
console.log(a, typeof(a));
console.log(b, typeof(b));

console.log(a + b)
console.log(a - b)
console.log(a * b)
console.log(a / b)
console.log(a % b)

// 3. string: 문자열
// '',"",``
const username = "홍길동"
console.log(username, typeof(username));
console.log(`안녕하세요! 제 이름은 ${username}입니다. 잘 부탁드립니다`)

// 4. boolean: 논리형 true/false
let bool = true;
console.log(bool, typeof(bool));
console.log(!bool); // 반전

//5. null: 값 없음/ 깂 제거
// undefined는 최초 값이 정의되지 않았을 때
let k = 100;
k = null;
console.log(k, typeof(k));

//6. object(array, object, function)
const arr = [1,2,3]
console.log(arr, typeof(arr));
console.log(arr[0], arr[1], arr[100]);

// dict와는 다르게 key속성세 문자열/식별자 사용가능
const obj = {
    username: 'honggd',
    age: 20,
    scores: [90,80,100]
};

console.log(obj, typeof(obj));
console.log(obj['username'],obj['age'],obj['scores']) // bracket 방식 접근
console.log(obj.username, obj.age, obj.scores) // dot 방식 접근


let p = 200;

function foo(p){
    console.log('fooooo', p);
    return p;
};
console.log(foo, typeof(foo));
console.dir(foo) // 함수 객체 구조를 디렉토리 형태로 출력