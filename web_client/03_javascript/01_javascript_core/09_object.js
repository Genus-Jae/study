import _ from 'lodash';

/**
 * 객체(object)
 * - Python dict와 유사
 * - (속성명: 속성값) 모음 객체
 * - 속성명: 식별자/문자열
 * - 속성값: 모든 타입 가능
 */

const test1 = () => {
    const obj = {
        name: '홍길동',
        age: 33,
        married: true,
        hobby: ['넷플릭스', '야식', '헬스'],
        pet: {
            name: '너구리',
            breed: '푸들'
        },
        123: 456,
        'user-id': 'honggd',
        123: 789
    };

    console.log(obj);

    // 빈 객체 생성 후 속성 3개 추가
    const obj2 = new Object();
    obj2.kor = 90;
    obj2.eng = 85;
    obj2.math = 80;
    console.log(obj2);

    // 속성 읽기
    // dot notation: . 활용
    // bracket notation: ['key'] 활용

    // 점 표기법
    console.log(obj.name);
    console.log(obj.age);
    console.log(obj.married);

    // 대괄호 표기법
    console.log(obj['name']);
    console.log(obj['age']);
    console.log(obj['married']);
    console.log(obj[123]);
    console.log(obj['user-id']);
    console.log(obj['parent']); // 없는 속성은 undefined

    obj.father = '홍길동 아버지';      // 속성 추가
    obj.father = '이름을 부르지못함';  // 속성 수정
    obj.father = null;                  // 속성값 제거
    delete obj.father;                  // 속성명 제거

    console.log(obj);
    console.log(obj.father);
};

test1();

/**
 * 메서드: 객체의 속성값이 함수인 경우
 * 메서드에서 객체의 다른 속성을 참조하려면 this 사용
 */

const test2 = () => {
    const user = {
        username: '홍길동',

        run: function () {
            console.log(`${this.username}이/가 달린다!`);
        },

        work: function () {
            console.log(`${this.username}이/가 일한다~`);
        },

        eat() {
            console.log(`${this.username}이/가 밥을 먹는다!`);
        }
    };

    user.run();
    user.work();
    user.eat();
};

test2();

/*
객체를 namespace로 사용하기
*/

const calculator = {
    plus(a, b) {
        return a + b;
    },

    minus(a, b) {
        return a - b;
    },

    multiply(a, b) {
        return a * b;
    },

    divide(a, b) {
        return a / b;
    },

    remainder(a, b) {
        return a % b;
    }
};

const test3 = () => {
    console.log(calculator.plus(10, 20));
    console.log(calculator.minus(10, 20));
    console.log(calculator.multiply(10, 20));
    console.log(calculator.divide(10, 20));
    console.log(calculator.remainder(10, 20));
};

test3();

/**
 * 반복 순회 처리
 * - for...in
 * - Object.keys()
 * - Object.values()
 * - Object.entries()
 */

const test4 = () => {
    const dish = {
        name: '청국장',
        price: 15_000,
        ingredients: ['청국장, 양파, 대파, 마늘, 두부']
    };

    // for...in
    for (let attr in dish) {
        console.log(attr, '->', dish[attr]);
    }

    // Object.keys()
    console.log(Object.keys(dish));

    Object.keys(dish).forEach((key, index, _arr) => {
        console.log(key, '->', dish[key]);
    });

    // Object.values()
    console.log(Object.values(dish));

    Object.values(dish).forEach((value) => console.log(value));
    Object.values(dish).forEach(console.log);

    // Object.entries()
    console.log(Object.entries(dish));

    Object.entries(dish).forEach((entry) => {
        const [key, value] = entry;
        console.log(key, '->', value);
    });
};

test4();

// 객체 병합
const test5 = () => {
    const obj1 = {
        name: 'banana',
        price: 1_000
    };

    const obj2 = {
        name: '바나나',
        price: 2_000,
        count: 10
    };

    // obj1 속성 복사
    const newObj = {};

    for (let key in obj1) {
        newObj[key] = obj1[key];
    }

    // obj2 속성 복사
    for (let key in obj2) {
        newObj[key] = obj2[key];
    }

    console.log(newObj);

    // Object.assign(newObj, obj1, obj2, ...)
    const newObj2 = Object.assign({}, obj1, obj2);
    console.log(newObj2);

    // 전개 연산자 병합
    const newObj3 = { ...obj1, ...obj2 };
    console.log(newObj3);
};

test5();

/**
 * 얕은 복사
 * 깊은 복사
 */

// 얕은 복사와 깊은 복사의 차이를 확인하는 함수
const test6 = () => {
    const obj1 = {
        name: '홍길동',
        tel: ['010-1234-1234', '010-5678-5678']
    };

    const obj2 = obj1; // 참조 복사
    obj2.name = '고길동';

    console.log(obj2);
    console.log(obj1);

    const obj3 = { ...obj1 }; // 전개 연산자로 얕은 복사
    obj3.name = '신길동';
    obj3.tel[0] = '010-8888-8888';

    console.log(obj3);
    console.log(obj1);

    const obj4 = _.cloneDeep(obj1); // 깊은 복사
    obj4.name = '김길동';
    obj4.tel[0] = '010-7777-7777';

    console.log(obj4);
    console.log(obj1);

    const extra = {
        name: '고길동',
        address: '서울 금천구 독산동'
    };

    const newObj = { ...obj1, ...extra };
    newObj.tel[0] = '010-4444-4444';

    console.log(newObj);
    console.log(obj1);

    const newObj2 = _.merge({}, obj1, extra);
    newObj2.tel[0] = '031-1234-1234';

    console.log(newObj2);
    console.log(obj1);
};

test6();