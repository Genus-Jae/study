import readline from 'readline'

/**
 * 단축평가 
 * - 표현식 평가중에 결과가 확정된 경우, 이후 연산을 수행하지 않음
 * - ||: 좌항이 true인 경우 우항을 검사하지 않음.
 * - &&: 좌항이 false인 경우 우항을 검사하지 않음.
 */

function test1() {
    // or ||
    console.log('apple' || 'banana') // 좌항이 true라 좌항에서 종결
    console.log(''||'banana')        // 좌항이 false라 우항까지 출력

    const fruit = 'apple' || 'banana'
    console.log('fruit');

    // and &&
    console.log('apple' && 'orange') // 좌항이 true라 우항 출력
    console.log("" && "orange")      // 좌항이 false라서 빈 문자열 출력
}

test1()

function get_user_num() {
    const rl = readline.createInterface({
        input: ProcessingInstruction.stdin,   // 표준 입력 사용
        output: ProcessingInstruction.stdout  // 표준 출력 사용
    });
    rl.question('숫자를 하나 입력하세요', (answer) => {
        answer = Number(answer) || 1000; // 입력값이 없거나 0/NaN면 값 1000 저장
        console.log(`이력하신 숫자는 ${answer}입니다.`);
        rl.close(); // 인터페이스 종료
    });
}

get_user_num();

/**
 * 단축평가를 이용한 if문 처리
 * - 조건식 && 실행문: true경우만 실행 
 * - 조건식 || 실행문: false경우만 실행
 */

function test2(num) {
    num % 2 == 0 && console.log('${num}은 짝수입니다.')
    num % 2 == 0 || console.log('${num}은 홀수입니다.')
}
test2(3)
test2(100)

// optional chaining
function test3(user) {
    // user객체가 존재하면, username 속성값을 사용
    // user객체가 존재하지 않으면, null값을 대입
    // const username = user && user.username
    const username = user?.username;
    console.log(`username = ${username}`)
}
test3({username: 'sinsa'})
test3({})
test3(null)