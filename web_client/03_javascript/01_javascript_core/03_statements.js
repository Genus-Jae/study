/**
 * 제어문
 * - 조건문 if
 * - 분기처리문 switch..case
 * - 반복문
 *  - for
 *  - while
 *  - for..in
 *  - for..of
 * - 반복분기처리 break/continue
 */

/**
 * if
 */

function test1(age){
    if (age >= 20) {
        console.log('당신은 성인입니다.')
    }
    else if (age >= 0 && age < 20) {
        // and -> &&
        // or -> ||
        // not -> !
        console.log('당신은 미성년자입니다.')
    }
    else {
        console.log('유효한 숫자가 아닙니다.')
    }
}

test1(30)
test1(19)
test1(-100)

function test2(en_color) {
    let ko_color = '';
    switch(en_color) {
        case 'red':
            ko_color = '빨강';
            break;
        case 'yellow':
            ko_color = '노랑';
            break;
        case 'blue':
            ko_color = '파랑';
            break;
        default:
            ko_color = '알수 없는 색상'
    }

    return ko_color;
}

console.log(test2('red'));
console.log(test2('yellow'));
console.log(test2('blue'));
console.log(test2('black'));

/**
 * 기본 for문
 * - for(초기식; 조건식; 증감식)
 * - 증감변수: 반복문의 실행흐름/반복횟수 제어용 변수
 * - 초기식: 증감변수 초기화. 처음 한번만 실행!
 * - 조건식: 참인 경우 for블럭 실행, 거짓인 경우 반복문 종료
 * - 증감식: 증감변수 업데이트 i++ 1씩 증가, i-- 1씩 감소
 * - 초기식 -> 조건식 -> 반복실행 -> 증감식
 */

function test3() {
    for(let i = 0; i < 5; i++){
        console.log(i)
    }

    for (let i = 10; i < 0; i--) {
        if (i % 2 == 0) {
            console.log(i)
        }
    }

    const arr = ['a', 'b', 'c']
    for (let i = 0; i <arr.length; i++) {
        console.log(arr[i])
    }
}

test3()

/**
 * while반복문
 * - 조건식으로 반복여부 결정
 */
function test4() {
    let i = 0;
    // while (i<5) {
    //    console.log(i);
    //    i++; // i += 1
    //}

    while(true){
        if(i >= 5) {
            break;
        }
        console.log(i)
        i++;
    }
}

test4()

// for..in: 배열 인덱스와 객체 속성명을 순회하는 구문
function test5() {
    const arr = ['😂','😊','🤣'];


    // enumerable 여부 확인
    console.log(Object.getOwnPropertyDescriptor(arr, '0').enumerable)
    console.log(Object.getOwnPropertyDescriptor(arr, '1').enumerable)
    console.log(Object.getOwnPropertyDescriptor(arr, 'length').enumerable)

    // 배열의 인덱스를 키로 뽑음 (값은 arr[i]로 뽑음)
    for(let i in arr) {
        console.log(i, ':', arr[i])
    }

    let pet = {
        petname = '햄토리',
        type: '햄스터',
        weight: 0.5
    };

    for (let name in pet) {
        console.log (name, ':', pet[name])
    }
}

test5()

/**
 * for..of문
 * - Iterable객체의 요소를 순회
 * - array등의 요소를 직접 순회
 */

function test6() {
    const arr = ['😂','😊','🤣'];
    for (let fruit of arr) {
        console.log(fruit);
    } 
}

test6()