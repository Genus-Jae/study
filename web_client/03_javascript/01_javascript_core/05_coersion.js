/**
 * 형변환
 * - 명시적 형변환
 * - 암묵적 형변환
 */

/**
 * (암묵적형변환) 산술연산
 */

// 산술 연산에서 문자열과 숫자의 암묵적 형변환을 확인하는 함수
function test1(){
    console.log(3 + "3"); // string 암묵적 형변환후  처리
    console.log(3 - "3"); // number 암묵적 형변환후 처리
    console.log(3 * "3");  // 문자열이 숫자로 변환되어 곱셈 처리
    console.log(3 / "3");  // 문자열이 숫자로 변환되어 나눗셈 처리
    console.log(3 % "3");  // 문자열이 숫자로 변환되어 나머지 처리

    console.log(3 - "a"); // NaN
    console.log(NaN, typeof(NaN));  // NaN 값과 타입 출력
}
test1();  // 함수 실행

/**
 * (암묵적 형변환) 비교연산
 */

// 비교 연산에서 일반 비교와 엄격 비교 차이를 확인하는 함수
function test2(){
    console.log(3 == "3"); // number 형변환 이후 처리
    console.log(3 != "3");  // 형변환 후 같으므로 false

    // 엄격비교 연산자: 타입/값이 모두 같아야 true 반환
    console.log(3 === "3");  // 타입이 달라 false
    console.log(3 !== "3");  // 타입이 달라 true
}
test2();  // 함수 실행


/**
 * (암묵적형변환) 논리형 관련
 * - 모든 값은 논리값이 필요한 자리에서 boolean타입으로 암묵적 형변환
 * - 값이 있는 것들은 true 변환
 * - 값이 없는 것들은 false 변환
 */

// 다양한 값을 Boolean으로 변환했을 때 truthy/falsy를 확인하는 함수
function test3(){
    // truthy
    console.log(Boolean(123));  // true
    console.log(Boolean(123.456));  // true
    console.log(Boolean(-100));  // true
    console.log(Boolean('hello'));  // true
    console.log(Boolean(' '));  // 공백 문자열도 true
    console.log(Boolean([]));  // 빈 배열도 true
    console.log(Boolean({}));  // 빈 객체도 true
    console.log(Boolean(10 / 0)); // Infinity(number)

    // falsy
    console.log(Boolean(0));  // false
    console.log(Boolean(0.0));  // false
    console.log(Boolean(''));  // 빈 문자열은 false
    console.log(Boolean(undefined));  // false
    console.log(Boolean(null));  // false
    console.log(Boolean(NaN));  // false
}
test3();  // 함수 실행

/**
 * (명시적 형변환) 문자열 형변환
 */

// 숫자를 문자열로 명시적으로 변환하는 방법을 확인하는 함수
function test4(){
    console.log(123, typeof(123));  // 숫자와 타입 출력
    console.log(String(123), typeof(String(123)));  // String 함수로 변환
    console.log((123).toString(), typeof((123).toString()));  // toString 메서드로 변환
}
test4();  // 함수 실행

/**
 * (명시적 형변환) 숫자형 변환
 * - Number(): 숫자(정수/실수) 변환
 * - parseInt(): 정수 변환. 왼쪽부터 변환불가한 문자가 나오기전까지 변환
 * - parserFloat(): 실수 변환. 왼쪽부터 변환불가한 문자가 나오기전까지 변환
 */

// 문자열을 숫자로 변환하는 여러 방법을 비교하는 함수
function test5(){
    const nums = ['123', '123.456', '123.456원', '$123.456'];  // 변환할 문자열 배열
    for (let num of nums) {
        console.log(num);  // 원본 문자열 출력
        console.log(Number(num));  // 전체 문자열을 숫자로 변환 시도
        console.log(parseInt(num));  // 정수 부분만 변환
        console.log(parseFloat(num));  // 실수 부분까지 변환

        // 정규식을 통한 숫자변환
        const n = Number(num.replace(/[^\d.]/, ''));  // 숫자와 소수점 외 문자 제거 후 숫자 변환
        console.log(n)  // 변환 결과 출력
    }
}
test5();  // 함수 실행4