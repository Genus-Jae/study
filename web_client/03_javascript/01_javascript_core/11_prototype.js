function Pet(name, breed, weight, age, ...colors) {
    // this용법: 생성자함수안에서 this가 현재객체를 가리킨다.
    this.name = name;  // 이름 저장
    this.breed = breed;  // 품종 저장
    this.weight = weight;  // 몸무게 저장
    this.age = age;  // 나이 저장
    this.colors = colors;  // 색상들을 배열로 저장
}
// new Pet() 생성객체들의 부모 prototype객체에 메소드 등록
Pet.prototype.bark = function(){  // 생성된 객체들이 공통으로 사용할 짖기 메소드
    return this.weight < 10 ? '왈왈' : '멍멍';  // 몸무게에 따라 다른 소리 반환
};

// 생성자함수의 속성/메소드
Pet.address = '서울시 금천구 독산동';  // 생성자 함수 자체의 정적 속성
Pet.introduce = function(){  // 생성자 함수 자체의 정적 메소드
    console.log('저는 반려동물🐶🐸😺입니다.');  // 소개 문구 출력
};

/**
 * 자바스크립트 객체지향 언어
 * - prototype기반의 상속모델
 * - 모든 객체는 해당타입의 prototype를 상속받아 사용할 수 있다. 
 * 
 * - Constructor함수객체 Pet
 * - Prototype객체 Pet.prototype: 생성자함수와 함께 생성됨.
 * - 생성된 객체: new연산자로 생성자함수를 호출한 결과
 * 
 */
// 생성자 함수, 프로토타입, 생성 객체의 관계를 확인하는 함수
const test1 = () => {
    // 생성자함수객체 Pet
    console.log(Pet);  // 생성자 함수 자체 출력
    // 프로토타입객체 
    console.log(Pet.prototype);  // Pet의 prototype 객체 출력
    // 객체생성
    const pet = new Pet('구리구리', '푸들', 3, 10, 'white');  // Pet 객체 생성
    console.log(pet);  // 생성된 객체 출력

    console.log(pet.__proto__);  // 생성 객체의 프로토타입 객체 출력
    console.log(pet.__proto__ === Pet.prototype);  // 생성 객체의 프로토타입이 Pet.prototype과 같은지 확인

    // 프로토타입의 속성/메소드 작성 -> 자식객체 사용
    Pet.prototype.owner = '홍길동';  // 프로토타입에 공통 속성 추가
    console.log(pet.owner);   // 프로토타입에서 상속받은 owner 출력
    console.log(pet.bark());  // 프로토타입 메소드 호출

    // 생성자함수의 속성/메소드
    console.log(Pet.address);  // 생성자 함수의 정적 속성 출력
    Pet.introduce();  // 생성자 함수의 정적 메소드 호출
};

test1();  // 함수 실행

/**
 * 프로토타입 체인
 * - 모든 프로토타입객체는 부모 프로토타입객체를 상속한다. 
 * - 최상위 프로토타입객체는 Object.prototype객체이다.
 */
// 객체의 프로토타입 체인을 확인하는 함수
const test2 = () => {
    const pet = new Pet('구리구리', '푸들', 3, 10, 'white');  // 새 Pet 객체 생성
    console.log(pet);  // 생성 객체 출력
    console.log(pet.__proto__);  // Pet.prototype 출력
    console.log(pet.__proto__.__proto__);  // Object.prototype 출력

    console.log(pet.toString());  // Object.prototype에서 상속받은 toString 메소드 호출
};
test2();  // 함수 실행3