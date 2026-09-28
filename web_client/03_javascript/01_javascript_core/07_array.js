/**
 * Array 
 * - 타입/개수의 제한이 없는 콜렉션 객체
 */

// 배열 생성, 값 읽기, 값 수정, 중첩 배열 사용을 확인하는 함수
function test1(){
    const arr1 = [1, 2, 3];  // 배열 리터럴 방식으로 생성
    const arr2 = new Array(1, 2, 3);  // 생성자 방식으로 배열 생성
    console.log(arr1);  // arr1 출력
    console.log(arr2);  // arr2 출력

    // 값읽기
    console.log(arr1[0], arr1[1], arr1[2], arr1[3]);  // 인덱스로 요소 접근, 없는 요소는 undefined

    // 값수정
    arr1[0] *= 100;  // 첫 번째 요소 수정
    arr1[1] *= 200;  // 두 번째 요소 수정
    arr1[2] *= 300;  // 세 번째 요소 수정
    console.log(arr1);  // 수정된 배열 출력

    // 형식제한 
    const user = [
        '홍길동',  // 사용자 이름
        [100, 90, 80],  // 1차 점수 배열
        [90, 88, 95]  // 2차 점수 배열
    ];
    const user_name = user[0];  // 사용자 이름 저장
    const user_kor_avg = (user[1][0] + user[2][0]) / 2;  // 국어 평균 점수 계산
    console.log(`${user_name}의 국어 평균점수는 ${user_kor_avg}입니다.`);  // 결과 출력
}
test1();  // 함수 실행

/**
 * 반복처리
 */

// 배열을 for..in과 for..of로 순회하는 함수
function test2(){
    const arr = ['🥝', '🍓', '🥑'];  // 순회할 배열 생성

    // for..in
    for(let i in arr) {
        console.log(arr[i]);  // 인덱스를 이용해 요소 출력
    }
    // for..of
    for(let f of arr) {
        console.log(f);  // 요소를 직접 출력
    }
}
test2();  // 함수 실행

/**
 * Array API
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * 
 */

// 다양한 Array API의 사용법을 확인하는 함수
function test3(){
    const arr = ['사과', '딸기', '귤', '멜론', '사과', '딸기', '아보카도'];  // 과일 배열 생성

    // indexOf() | lastIndexOf()
    console.log(arr.indexOf('딸기'));  // 앞에서부터 첫 번째 딸기 위치
    console.log(arr.indexOf('바나나'));  // 없으면 -1 반환
    console.log(arr.lastIndexOf('딸기'));  // 뒤에서부터 첫 번째 딸기 위치

    // find() | findIndex() 조건에 만족하는 최초의 요소를 반환
    console.log(arr.find((fruit) => fruit.startsWith('딸')));  // 조건에 맞는 첫 요소 반환
    console.log(arr.findIndex((fruit) => fruit.startsWith('딸')));  // 조건에 맞는 첫 인덱스 반환

    // concat() 
    const vegitables = ['고구마', '감자', '오이'];  // 채소 배열 생성
    const vegifruits = arr.concat(vegitables);  // 두 배열을 합쳐 새 배열 생성
    console.log(vegifruits);  // 합쳐진 배열 출력
    console.log(arr);  // 원본 arr 확인
    console.log(vegitables);  // 원본 vegitables 확인

    // join() -> string
    console.log(vegitables.join('|'));  // 구분자를 넣어 문자열로 결합

    // sort(): in-place연산
    const nums = [3, 2, 1, 5, 4];  // 숫자 배열 생성
    nums.sort();  // 기본 정렬 수행
    console.log(nums);  // 정렬 결과 출력

    const names = ['홍길동', '고길동', '박길동'];  // 문자열 배열 생성
    names.sort();  // 문자열 오름차순 정렬
    console.log(names);  // 정렬 결과 출력

    // 내림차순정렬 
    nums.sort((a, b) => b - a);  // 숫자 내림차순 정렬
    console.log(nums);  // 정렬 결과 출력

    // 문자열인 경우 산술연산이 안되므로 비교연산처리후에 정수를 반환
    names.sort((a, b) => {
        if (a > b) return -1;  // a가 크면 앞으로 이동
        if (b > a) return 1;  // b가 크면 뒤로 이동
        return 0;  // 같으면 위치 유지
    });
    console.log(names);  // 문자열 내림차순 정렬 결과 출력
    console.log('홍길동' > '고길동'); // 사전등재순이 빠르면 작다 처리

    // toSorted(): out-of-place연산
    console.log(names.toSorted());  // 정렬된 새 배열 반환
    console.log(names);  // 원본 배열 유지 확인
}   
test3();  // 함수 실행

/**
 * - push() | pop() | unshift() | shift()
 * - slice()
 * - splice()
 */

// 배열 요소 추가, 삭제, 복사, 치환 관련 메소드를 확인하는 함수
function test4(){
    const stations = ['가산디지털단지역', '독산', '금천구청'];  // 역 이름 배열 생성
    stations.push('석수');  // 뒤에 요소 추가
    stations.push('관악');  // 뒤에 요소 추가
    stations.push('안양');  // 뒤에 요소 추가
    console.log(stations);  // 추가 후 배열 출력
    console.log(stations.pop());  // 마지막 요소 제거 및 반환
    console.log(stations);  // 제거 후 배열 출력

    stations.unshift('구로');  // 앞에 요소 추가
    stations.unshift('신도림');  // 앞에 요소 추가
    stations.unshift('영등포');  // 앞에 요소 추가
    console.log(stations);  // 추가 후 배열 출력
    console.log(stations.shift());  // 첫 번째 요소 제거 및 반환
    console.log(stations.shift());  // 첫 번째 요소 제거 및 반환
    console.log(stations.shift());  // 첫 번째 요소 제거 및 반환
    console.log(stations.shift());  // 첫 번째 요소 제거 및 반환
    console.log(stations);  // 제거 후 배열 출력

    // slice(start, end) -> Array (out-of-place 연산)
    const langs = ['html', 'css', 'js', 'ts', 'dart'];  // 언어 배열 생성
    console.log(langs.slice(0, 3));  // 0번부터 3번 전까지 복사
    console.log(langs);  // 원본 배열 확인
    const langs_copy = langs.slice()  // 전체 배열 복사
    console.log(langs_copy);  // 복사본 출력

    // splice(start, delCount, newItem1, newItem2, ...) -> Array(삭제된 요소)
    // - 요소삭제와 요소추가를 동시에 수행하는 메소드. in-place연산
    const alphas = ['a', 'b', 'c', 'd', 'e', 'f'];  // 알파벳 배열 생성
    console.log(alphas.splice(2, 2, 'x', 'y', 'x'));  // 요소 삭제 후 새 요소 삽입
    console.log(alphas);  // 변경된 배열 출력
    console.log(alphas.splice(2, 0, '가', '나', '다'));  // 삭제 없이 새 요소 삽입
    console.log(alphas);  // 변경된 배열 출력

    // toSplice: out-of-place연산
    console.log(alphas.toSpliced(2, 6))  // 원본 유지하며 새 배열 반환
    console.log(alphas);  // 원본 배열 확인
}
test4();  // 함수 실행


/**
 * 반복처리 메소드: 배열 요소에 대해 주어진 callback함수를 반복 호출처리
 * - forEach(callbackFn): 단순 반복처리
 * - filter(callbackFn)
 * - map(callbackFn)
 * - reduce(callbackFn, initValue)
 */

// forEach를 사용한 반복 처리와 타입 분류를 확인하는 함수
function test5(){
    const arr = ['a', 'b', 'c', 'd', 'e'];  // 문자 배열 생성
    arr.forEach((elem, index, _arr) => {
        // console.log(elem, index, _arr);
        // console.log(elem.toUpperCase());
        if(index % 2 == 0) {
            console.log(elem);  // 짝수 인덱스 요소만 출력
        }
    });

    // @실습문제: brr배열의 요소타입에 따라 분류하세요.
    // - 숫자는 nums배열에 추가
    // - 문자열은 strs배열에 추가
    const brr = [1, 2, '가', 3, 4, '홍길동', 'abc', 400];  // 숫자와 문자열이 섞인 배열
    const nums = [];  // 숫자 저장용 배열
    const strs = [];  // 문자열 저장용 배열
    brr.forEach((elem) => {
        typeof(elem) == 'number' && nums.push(elem);  // 숫자면 nums에 추가
        typeof(elem) == 'string' && strs.push(elem);  // 문자열이면 strs에 추가
    });
    console.log(nums);  // 숫자 배열 출력
    console.log(strs);  // 문자열 배열 출력
}
test5();  // 함수 실행

/**
 * filter: 주어진 배열에서 조건에 맞는 요소만 추려서 새 배열로 반환
 * - callback함수에서는 이 요소에 대한 조건식결과를 반환
 */

// filter를 사용해 원하는 요소만 추출하는 함수
function test6() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];  // 숫자 배열 생성
    const evens = arr.filter((elem, index, _arr) => {
        return elem % 2 == 0  // 짝수만 true 반환
    });
    console.log(evens);  // 짝수 배열 출력

    const brr = [1, 2, '가', 3, 4, '홍길동', 'abc', 400];  // 혼합 배열 생성
    const nums = brr.filter((elem) => typeof(elem) == 'number');  // 숫자만 추출
    const strs = brr.filter((elem) => typeof(elem) == 'string');  // 문자열만 추출
    console.log(nums);  // 숫자 배열 출력
    console.log(strs);  // 문자열 배열 출력
}
test6();  // 함수 실행

/**
 * map: 모든 요소에 대해서 연산 수행결과를 새 배열에 담아 반환
 */

// map을 사용해 각 요소를 변환한 새 배열을 만드는 함수
function test7(){
    const arr = [1, 2, 3, 4, 5];  // 숫자 배열 생성
    const squares = arr.map((elem, index, _arr) => {
        return elem ** 2;  // 제곱값 반환
    });
    console.log(squares);  // 제곱 배열 출력

    const names = ['허균', '신사임당', '이순신', '세종대왕'];  // 이름 배열 생성
    const name_lens = names.map((name) => name.length);  // 각 이름의 길이 계산
    console.log(name_lens);  // 길이 배열 출력
}
test7();  // 함수 실행

/**
 * reduce: 모든 요소를 순회하고, 단 하나의 결과값 반환
 */

// reduce를 사용해 누적 계산 결과를 만드는 함수
function test8(){
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];  // 숫자 배열 생성
    const sum = arr.reduce((prevValue, currValue, index, _arr) => {
        console.log(prevValue, currValue, index);  // 누적값, 현재값, 인덱스 출력
        return prevValue + currValue;  // 누적 합 반환
    }, 0);
    console.log(sum);  // 총합 출력


    const brr = [1, 2, '가', 3, 4, '홍길동', 'abc', 400];  // 혼합 배열 생성
    const nums = brr.reduce((arr, elem) => {
        typeof(elem) == 'number' && arr.push(elem);  // 숫자만 누적 배열에 추가
        return arr;  // 누적 배열 반환
    }, []);
    console.log(nums);  // 숫자 배열 출력

    const numbers = [1, 2, 3, 4, 5];  // 숫자 배열 생성
    const squares = numbers.reduce((arr, elem) => {
        arr.push(elem ** 2);  // 제곱값을 누적 배열에 추가
        return arr;  // 누적 배열 반환
    }, []);
    console.log(squares);  // 제곱 배열 출력
}
test8();  // 함수 실행