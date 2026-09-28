/**
 * 객체배열
 */
// 반려동물 객체 배열을 생성하고 출력하는 함수
const test1 = () => {
    const pets = [];  // 빈 배열 생성
    pets.push({
        name : '구리구리',
        breed : '푸들',
        weight : 3,  
        age : 10,
        color : ['white'],
        bark() {
            return this.weight < 10 ? '왈왈' : '멍멍';  // 몸무게에 따라 짖는 소리 반환
        }
    });
    pets.push({
        name : '애득',
        breed : '말티즈',
        weight : 4,  
        age : 9,
        color : ['white'],
        bark() {
            return this.weight < 10 ? '왈왈' : '멍멍';  // 몸무게에 따라 짖는 소리 반환
        }
    });
    pets.push({
        neme : '사랑이',  // name 오타로 인해 neme 속성으로 저장됨
        breed : '코카스파니엘',
        weight : 13,  
        age : 5,
        color : ['white', 'brown'],
        bark() {
            return this.weight < 10 ? '왈왈' : '멍멍';  // 몸무게에 따라 짖는 소리 반환
        }
    });

    console.log(pets);  // 객체 배열 전체 출력
};
test1();  // 함수 호출

/**
 * 생성자함수
 * - 객체생성을 위한 함수. new연산자와 함께 호출해야 한다.
 * - 관례적으로 생성자함수는 대문자로 시작!
 * - 함수선언식으로 작성 (함수표현식/화살표함수는 생성자함수로 사용불가)
 */
// new 연산자로 반려동물 객체를 생성하는 생성자 함수
function Pet(name, breed, weight, age, ...colors) {
    // this용법: 생성자함수안에서 this가 현재객체를 가리킨다.
    this.name = name;  // 이름 저장
    this.breed = breed;  // 품종 저장
    this.weight = weight;  // 몸무게 저장
    this.age = age;  // 나이 저장
    this.colors = colors;  // 색상 정보를 배열로 저장
    this.bark = function(){
        return this.weight < 10 ? '왈왈' : '멍멍';  // 몸무게에 따라 짖는 소리 반환
    }
}

// 생성자 함수로 반려동물 객체 배열을 만들고 출력하는 함수
const test2 = () => {
    const pets = [];  // 빈 배열 생성
    // pet = new Pet('구리구리', '푸들', 3, 10, 'white');
    // console.log(pet);
    pets.push(new Pet('구리구리', '푸들', 3, 10, 'white'));  // 첫 번째 객체 추가
    pets.push(new Pet('애득', '말티즈', 4, 9, 'white'));  // 두 번째 객체 추가
    pets.push(new Pet('사랑이', '코카스파니엘', 13, 5, 'white', 'brown'));  // 세 번째 객체 추가
    console.log(pets);  // 생성된 객체 배열 출력

    pets.forEach((pet) => {
        console.log(`${pet.name}이/가 ${pet.bark()} 짖는다.🐶`);  // 각 객체의 이름과 짖는 소리 출력
    });
}
test2();  // 함수 호출