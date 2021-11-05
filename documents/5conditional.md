# 조건부 렌더링

[실습](https://codesandbox.io/s/condition-j0trd?file=/src/Hello.js)

1. 삼항 연산자

조건에 따라 다르게 보여지고 싶을 때 사용한다.

```javascript
const isTrue = true;

// 삼항 연산자
const output = isTure ? "Hello" : "bye";

console.log(output);
```

2. props의 값이 생략되어있으면 true값이 된다.

3. 참같은 값, 거짓같은 값

지금까지 난 왜 빈 배열과 빈 객체가 거짓같은 값인줄 알았던걸까
