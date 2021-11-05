# 이벤트 제어하기

> 참고  
> [이벤트 제어하기](https://reactjs-kr.firebaseapp.com/docs/handling-events.html) > [[리액트를 다루는 기술] 4장 - 이벤트 핸들링](https://velog.io/@younho9/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EB%8B%A4%EB%A3%A8%EB%8A%94-%EA%B8%B0%EC%88%A0-4%EC%9E%A5-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%B8%EB%93%A4%EB%A7%81)

## JSX에서 이벤트를 다루는 방법

- React 이벤트는 소문자 대신 camelCase를 사용한다.
- JSX에 문자열 대신 함수를 전달한다.
- DOM 요소에만 이벤트를 설정할 수 있다.
- React의 기본 동작을 막기 위해서는 반드시 preventDefault를 명시적으로 호출해야한다.

```javascript
import React, { useState } from "react";

function Event() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  function updateTerm(e) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="찾고 싶은 영화나 드라마 제목을 입력해주세요"
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
    </Container>
  );
}

export default Event;
```
