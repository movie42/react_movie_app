# JSX란?

> 출처  
> [JSX의 기본 규칙 알아보기](https://react.vlpt.us/basic/04-jsx.html)  
> [[React] Fragment란?](https://velog.io/@dolarge/React-Fragment%EB%9E%80)

JSX는 리엑트에서 생김새를 정의할 때, 사용하는 문법이다.

### 규칙

1. 태그는 꼭 닫혀있어야한다.
   - br 태그 등도 닫혀있어야한다.
   - 태그 사이 내용이 들어가지 않을 때, Self Closing 태그를 사용한다.

```javascript
function App() {
  return (
    <div>
      <Hello />
    </div>
  );
}
```

2. 두 가지 이상의 태그는 반드시 하나의 태그로 감싸져있어야한다.

- 불필요한 태그를 사용하게 될 수 있다. 그럴때는 Fragment를 사용하면 된다.(<React.Fragment></React.Fragment> 또는 <></>(short syntax))

```javascript
import React from "react";
import Login from "./Login";

function App() {
  return (
    <>
      <div>로그인</div>
      <Login />
    </>
  );
}
```

3. JSX 안에 자바스크립트 값 사용하기

{}로 감싸서 보여준다.

```javascript
function App() {
  const data = fetch("http://localhost5000", {});
  return (
    <>
      <div>로그인</div>
      <Login />
      <div>{data ? data : "데이터를 찾을 수 없습니다."}</div>
    </>
  );
}
```

4. style과 className

JSX에서 class와 css style을 적을 때.

class => className
background-color => backgroundColor

5. 주석

```
{/* 주석은 이렇게 작성한다.*/}
```
