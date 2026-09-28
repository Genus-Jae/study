/**
 * 내장 String API
 */
// 문자열 관련 주요 메소드를 확인하는 함수
const test1 = () => {
    const str = 'Apple Samsung Pineapple';  // 테스트용 문자열
    console.log(str);  // 원본 문자열 출력
    console.log(str.length);  // 문자열 길이 출력

    for(let i=0; i < str.length; i++) {  // 문자열을 한 글자씩 순회
        console.log(str.charAt(i));  // i번 인덱스의 문자 출력
    }

    console.log(str.toLowerCase());  // 소문자로 변환
    console.log(str.toUpperCase());  // 대문자로 변환

    console.log(str.indexOf('Sam'));  // 'Sam'이 처음 시작하는 인덱스 반환
    console.log(str.indexOf('Grape'));  // 없으면 -1 반환
    console.log(str.lastIndexOf('ppl'));  // 'ppl'이 마지막으로 나오는 인덱스 반환
    
    console.log(str.substring(6, 9));  // 6번부터 9번 전까지 잘라서 반환
    console.log(str.substr(6, 3));  // 6번부터 3글자 반환, deprecated 메소드

    console.log(str.replace('Apple', '사과'));  // 첫 번째 Apple만 치환한 새 문자열 반환
    console.log(str.replace('ppl', 'PPL'));  // 첫 번째 ppl만 치환한 새 문자열 반환
    console.log(str.replaceAll('ppl', 'PPL'));  // 모든 ppl 치환
    console.log(str.replace(/ppl/g, 'PPL'));  // 정규표현식으로 모든 ppl 치환
    console.log(str);  // 원본 문자열은 변경되지 않음

    console.log(str.split(' '));  // 공백 기준으로 문자열을 배열로 분리

    // @실습문제: 주어진 문자열에서 알파벳의 개수를 세어 출력
    const text = '안녕하세요, 저는 Steve입니다. California에 살고 있고, 제 Major는 AI Engineer입니다.';  // 한글과 영문이 섞인 문자열
    const matched = text.match(/[a-zA-Z]/g);  // 영문자만 정규표현식으로 추출
    console.log(matched.length);  // 추출된 영문자 개수 출력

    let cnt = 0;  // 직접 셀 개수 변수
    for(let i = 0; i < text.length; i++){  // 문자열 전체 순회
        const ch = text[i];  // 현재 문자 저장
        if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {  // 영문자인지 검사
            cnt++;  // 영문자면 개수 증가
        }
    }
    console.log(cnt);  // 직접 센 영문자 개수 출력

}
test1();

/**
 * Math
 */
// Math 객체의 주요 수학 메소드를 확인하는 함수
const test2 = () => {
    // 정수(난수 * 경우의수 + 최소값)
    console.log(Math.random());  // 0 이상 1 미만의 난수 반환
    // 1 ~ 10사이의 난수
    console.log(Math.trunc(Math.random() * 10 + 1));  // 1~10 사이 정수 난수 생성

    console.log(Math.ceil(12.34));  // 올림
    console.log(Math.round(12.34));  // 반올림
    console.log(Math.round(12.56));  // 반올림
    console.log(Math.floor(-12.56));  // 내림
    console.log(Math.trunc(-12.56));  // 소수점 이하 제거

    // 123.456 -> 123.46
    console.log(Math.round(123.456 * 100) / 100);  // 소수 둘째 자리까지 반올림
};
test2();


/**
 * Date API
 */
// Date 객체의 주요 날짜/시간 메소드를 확인하는 함수
const test3 = () => {
    const now = new Date();  // 현재 날짜와 시간 객체 생성
    console.log(now);  // 현재 날짜 객체 출력
    console.log(now.getFullYear());  // 연도 출력
    console.log(now.getMonth() + 1);  // 월 출력, 0부터 시작하므로 +1 처리
    console.log(now.getDate());  // 일 출력
    console.log(now.getHours());  // 시 출력
    console.log(now.getMinutes());  // 분 출력
    console.log(now.getSeconds());  // 초 출력

    // Unix Time (Epoch Time): 1970년 1월 1일 자정기준으로 누적된 milli초 
    console.log(Date.now());  // 현재 시각의 Unix Time 출력

    // Unix Time -> Date
    const date = new Date(1770599633128);  // Unix Time으로 Date 객체 생성
    console.log(date);  // 변환된 날짜 출력

    // 특정날짜
    const someday = new Date(2026, 3, 24, 17, 50, 0);  // 특정 날짜와 시간으로 Date 객체 생성
    console.log(someday);  // 지정한 날짜 출력
};
test3();