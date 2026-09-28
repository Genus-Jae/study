/**
 * class는 생성자함수의 개선된 문법
 * - class 선언을 통해 타언어의 상속모델과 흡사하게 작성
 * - 생성자함수/프로토타입객체에 대한 선언을 함께 작성
 */
class Pet {
    static address = '서울시 금천구 독산동';  // 클래스 자체가 가지는 정적 속성
    static introduce(){  // 클래스 자체가 호출하는 정적 메소드
        console.log('저는 반려동물🐶🐸😺입니다.');  // 소개 문구 출력
    }

    constructor(name, breed, weight, age, ...colors){
        this.name = name;  // 이름 저장
        this.breed = breed;  // 품종 저장
        this.weight = weight;  // 몸무게 저장
        this.age = age;  // 나이 저장
        this.colors = colors;  // 색상들을 배열로 저장
    }
    // 몸무게에 따라 짖는 소리를 반환하는 메소드
    bark(){
        return this.weight < 10 ? '왈왈' : '멍멍';  // 소형견/대형견 소리 구분
    }
}

// Pet 객체를 생성하고 클래스의 정적 속성/메소드를 확인하는 함수
const test1 = () => {
    const pet = new Pet('구리구리', '푸들', 3, 10, 'white');  // Pet 객체 생성
    console.log(pet);  // 생성된 객체 출력
    console.log(pet.bark());   // bark 메소드 호출 결과 출력
    console.log(pet.__proto__);  // 객체의 프로토타입 확인

    console.log(Pet.address);  // 클래스의 정적 속성 출력
    Pet.introduce();  // 클래스의 정적 메소드 호출
};
test1();

class Person {
    constructor(name, age) {
        this.name = name;  // 이름 저장
        this.age = age;  // 나이 저장
    }
    sayHello(){
        console.log(`안녕하세요? ${this.age}세 ${this.name}입니다.`);  // 자기소개 출력
    }
}

class Dev extends Person {
    constructor(name, age, ...langs) {
        super(name, age);  // 부모 클래스 생성자 호출
        this.langs = langs;  // 사용할 언어 목록 저장
    }

    // 부모 메소드를 확장하여 개발자 소개까지 출력하는 메소드
    sayHello(){
        super.sayHello();  // 부모의 sayHello 먼저 호출
        console.log(`저는 ${this.langs} 개발자입니다.`);  // 개발 언어 소개 출력
    }
}

// Person과 Dev 객체를 생성하고 상속 및 오버라이딩을 확인하는 함수
const test2 = () => {
    const person = new Person('홍길동', 33);  // Person 객체 생성
    console.log(person);  // person 객체 출력
    person.sayHello();  // person 인사말 출력

    const dev = new Dev('신사임당', 48, 'Python', "Javascript");  // Dev 객체 생성
    console.log(dev);  // dev 객체 출력
    dev.sayHello();  // 오버라이딩된 인사말 출력
    
};
test2();