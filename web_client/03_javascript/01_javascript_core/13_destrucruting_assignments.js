/**
 * 구조분해할당 Destructuring Assignment
 * - 배열/객체의 요소를 쉽게 변수에 대입하는 문법
 * - 배열은 인덱스기반으로, 객체는 속성명기반으로 처리
 */

/**
 * 배열 구조분해할당
 */
// 배열 구조분해할당의 다양한 문법을 확인하는 함수
const test1 = () => {
    const arr = [1, 2, 3];  // 구조분해할당에 사용할 배열
    const [a, b, c] = arr;  // 배열의 각 요소를 순서대로 변수에 저장
    console.log(a, b, c);  // 1 2 3 출력

    const [d, e] = arr;   // 앞에서 두 개 값만 추출
    console.log(d, e);  // 1 2 출력

    const [, f, g] = arr;  // 첫 번째 요소를 건너뛰고 추출
    console.log(f, g);  // 2 3 출력

    const [h, i, j=10, k=20] = arr;  // 값이 없으면 기본값 사용
    console.log(h, i, j, k);  // 1 2 3 20 출력

    const [l, ...m] = arr;  // 첫 요소와 나머지 요소 분리
    console.log(l, m);  // 1 [2, 3] 출력
};
test1();

/**
 * 매개변수부의 구조분해 할당
 */
// 함수 매개변수에서 배열 구조분해할당을 사용하는 함수
const test2 = () => {
    const foo = (name, [kor, eng, math]) => console.log(name, kor, eng, math);  // 배열 인자를 바로 분해해서 사용

    foo('신사임당', [99, 100, 78]);  // 모든 값이 있는 경우
    foo('홍길동', [99, 100]);  // math는 값이 없어 undefined가 됨
};
test2();

/**
 * 객체 구조분해 할당
 */
// 객체 구조분해할당과 중첩 객체 처리를 확인하는 함수
const test3 = () => {
    const obj = {
        a: 123,
        b: '겨울',
        c: true
    };  // 구조분해할당에 사용할 객체
    // const {a, b, c} = obj;
    // console.log(a, b, c);

    // const {a, b, x='🐸'} = obj;
    // console.log(a, b, x);
    
    // const {b, c} = obj;
    // console.log(b, c);

    // 변수명을 속성명과 다르게 처리
    const {a: num, b: season, c: bool} = obj;  // 속성값을 다른 변수명으로 저장
    console.log(num, season, bool);  // 123 겨울 true 출력

    // 중첩객체 처리
    const user = {
        id: 'honggd',
        name: {
            firstName: '길동',
            lastName: '홍'
        },
        sns: ['tiktok', 'thread', 'X']
    };  // 중첩 객체와 배열을 가진 객체
    const {
        id,
        name: {firstName, lastName},
        sns: [mainSns, subSns]
    } = user;  // 중첩 객체와 배열을 한 번에 구조분해
    console.log(id, firstName, lastName, mainSns, subSns);  // honggd 길동 홍 tiktok thread 출력

    // 나머지파라미터
    const {
        id: username, ...rest
    } = user;  // id를 따로 꺼내고 나머지는 rest 객체로 저장
    console.log(username, rest);  // honggd와 나머지 객체 출력
};
test3();

/**
 * 함수에서 객체 구조분해할당
 */
const handleId = ({id}) => console.log(id);  // 객체에서 id만 꺼내 출력
const handleName = ({name: {firstName, lastName}}) => console.log(firstName, lastName);  // 중첩 name 객체 분해 후 출력
const handleSns = ({sns: [mainSns, subSns]}) => console.log(mainSns, subSns);  // sns 배열에서 앞의 두 값 출력

// 객체를 함수에 전달하면서 구조분해할당하는 예제를 실행하는 함수
const test4 = () => {
    const user = {
        id: 'honggd',
        name: {
            firstName: '길동',
            lastName: '홍'
        },
        sns: ['tiktok', 'thread', 'X']
    };  // 함수에 전달할 사용자 객체
    handleId(user);  // id 출력
    handleName(user);  // 이름 출력
    handleSns(user);  // sns 앞 두 개 출력

};
test4();