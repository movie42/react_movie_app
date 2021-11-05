# 사용자의 입력을 효과적으로 받는 폼 만들기(form)

## [컴포넌트 제대로 만들기](https://hyunseob.github.io/2019/06/02/react-component-the-right-way/)

리액트로 만들어진 앱의 가장 최소한의 단위는 컴포넌트이기 때문에 컴포넌트는 중요한 구성요소이다. 따라서, 잘 작동하는 리액트 앱을 만들기 위해서는

- 작고 단단한 컴포넌트 만들기
- 컴포넌트간의 관계를 정의하고 유기적으로 연결하는 것

### 컴포넌트란?

데이터를 받아서 DOM Node에 출력하는 함수.

### Form

#### UnControlled Component

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
        <input type="email" placeholder="이메일" onChange={handleEmail} />
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
    password: "",
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
