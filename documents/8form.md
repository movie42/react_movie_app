# 사용자의 입력을 효과적으로 받는 폼 만들기(form)

> 참조
> [컴포넌트 제대로 만들기](https://hyunseob.github.io/2019/06/02/react-component-the-right-way/)

리액트로 만들어진 앱의 가장 최소한의 단위는 컴포넌트이기 때문에 컴포넌트는 중요한 구성요소이다. 따라서, 잘 작동하는 리액트 앱을 만들기 위해서는

- 작고 단단한 컴포넌트 만들기
- 컴포넌트간의 관계를 정의하고 유기적으로 연결하는 것

> 불필요한 랜더링이 일어나는 것
> 불필요한 랜더링이 다시 일어나는 것이 어떤 상황에서 발생하는지 이해하고 이 상황을 어떻게 해결할 것인지 이해하는 것이 이번 공부의 핵심이다.

### 컴포넌트란?

데이터를 받아서 DOM Node에 출력하는 함수.

### 상태란?

> 출처  
> [React 컴포넌트의 상태란? - 더 북](https://thebook.io/006961/part01/ch04/01/)

컴포넌트의 변경 가능한 데이터 저장소다. 독립적이면서 기능 중심적인 UI와 논리 블럭이다. 변경 가능하다는 것은 상태 값을 변경할 수 있다는 것이다.
상태 데이터는 react에서 뷰의 렌더링이 갱신 될 때 동적 정보를 출력하기 위해 사용된다.

### Form

#### UnControlled Component

상태를 직접 react에서 제어하지 않는다. 프로그래머가 상태를 제어해야할 일이 없을 때 쓰면 좋다.

> 더 찾아보기
> 언제 상태를 제어할 필요가 없을까?

상태를 제어하지 않는다는 것은 동적 데이터를 리엑트에서 제어하지 않는다는 것을 의미한다. 이렇게 되면 Native DOM의 동작에 의존하게 된다.

```javascript
import React from "react";

const Form = () => {
  let email, password;

  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleEmail(e) {
    email = e.target.value;
  }

  function handlePassword(e) {
    password = e.target.value;
  }

  return (
    <>
      {conosle.log("render")}
      <from onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handlePassword}
        />
      </from>
    </>
  );
};

export default Form;
```

#### Controlled Component

```javascript
import React, { useState } from "react";

const Form = () => {
  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const { email, password } = value;

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleEmail(e) {
    setValue({ ...value, email: e.target.value });
  }
  function handlePassword(e) {
    setValue({ ...value, password: e.target.value });
  }

  return (
    <>
      {console.log("render")}
      <from onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePassword}
        />
      </from>
    </>
  );
};

export default Form;
```

## 그밖의 아티클

[Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)
[번역](http://develophotograph.blogspot.com/2018/10/controlled-and-uncontrolled-component.html)
