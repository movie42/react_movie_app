# Hooks

> 참고  
> [리액트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)  
> [React의 함수형 컴포넌트! (feat.Hooks)](https://velog.io/@solmii/React%EC%9D%98-%ED%95%A8%EC%88%98%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-feat.Hooks)  
> [Hook의 개요](https://ko.reactjs.org/docs/hooks-intro.html)  
> [[번역] 심층 분석: React Hook은 실제로 어떻게 동작할까?](https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/)

## 목차

- [Hooks](#hooks)
  - [목차](#목차)
  - [개요](#개요)
  - [useState](#usestate)
    - [여러개의 상태를 변경 할 때](#여러개의-상태를-변경-할-때)
      - [여러개의 useState](#여러개의-usestate)
      - [바꿔보기](#바꿔보기)
  - [useEffect](#useeffect)
    - [뒷정리하기](#뒷정리하기)
  - [useContext](#usecontext)
  - [useReducer](#usereducer)
    - [불변성](#불변성)
    - [useReducer 사용하기](#usereducer-사용하기)
  - [useMemo](#usememo)
    - [적용해보기](#적용해보기)
    - [함수의 메모제이션](#함수의-메모제이션)
  - [useCallback](#usecallback)
  - [useRef](#useref)
  - [커스텀 훅](#커스텀-훅)
    - [useInput](#useinput)
  - [리엑트 훅의 작동 원리](#리엑트-훅의-작동-원리)

## 개요

Hooks는 리액트 v16.8부터 새롭게 도입되었다.

## useState

[Using the State Hook](https://ko.reactjs.org/docs/hooks-state.html)

함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.

```javascript
import React, { useState } from "react";

const Form = () => {
  const [value, setValue] = useState("");

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form>
        <input value={value} onChange={handleInput} />
      </form>
    </>
  );
};
```

- setValue는 상태를 만들때 쓴다.
- value는 setValue에 의해 변한 상태값이다.

### 여러개의 상태를 변경 할 때

- useState를 여러개 사용할 수 있다.
- 하나의 useState를 선언한 뒤 여러개의 상태를 관리 할 수 있다.

[여러개로 선언된 useState를 하나로 바꿔보기](../src/Routes/SearchContainer.js)

#### 여러개의 useState

```javascript
const SearchContainer = () => {
  // 여러개의 useState로 선언되어있다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // 이중에 movie와 tv 데이터를 담는 부분을 변경해보고자 한다.
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);

  // 중략...
};
```

#### 바꿔보기

```javascript
const SearchContainer = () => {
  // 중략
  const [datas, setDatas] = useState({
    movie: [],
    tv: [],
  });

  const getData = async () => {
    try {
      const {
        data: { results: movieSearch },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvSearch },
      } = await tvApi.search(searchTerm);

      setDatas({ movie: movieSearch, tv: tvSearch });
    } catch {
      setError("정보를 찾을 수 없습니다.");
      setLoading(false);
      setDatas({ movie: [], tv: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [searchTerm]);

  // 중략
};
```

- react의 불변성을 지키기 위해서는 기존 상태에 직접 접근해서 수정하지 않아야한다.

## useEffect

[Using the Effect Hook](https://ko.reactjs.org/docs/hooks-effect.html)

useEffect는 componentDidMount나 componentDidUpdate와 비슷한 역할을 한다.

```javascript
// searchTerm의 변화에 따라 영화 데이터를 계속 요청한다.
useEffect(() => {
  getData();
}, [searchTerm]);

// searchTerm이 확정 되고 난 뒤에 form 데이터가 제출 되면 영화 데이터를 한번만 요청한다.
useEffect(() => {
  getData();
}, []);
```

위의 코드에서 useEffect를 사용하여 searchTerm의 상태가 변할 때마다 getData 함수를 실행하는 코드를 작성했다. 이렇게 하면 마치 입력 값에 따라 실시간으로 데이터를 불러오는 것처럼 느껴진다. 하지만 이건 내부적으로 봤을 때, 상태가 변할 때마다 getData 함수를 실행해서 api를 여러번 요청하는 것이기 때문에 데이터 주는 쪽에서 부담이 될 수도 있다.

이렇게 실시간으로 업데이트 되는 것이 부담되면 searchTerm이 변할 때마다 실행하지 않고, 값이 한번만 실행 되도록 두번째 파라미터 값을 비어있는 []로 놔두면 된다.

### 뒷정리하기

> 참고
> [리액트의 Hooks 완벽 정복하기 : 2.3 뒷정리하기](https://velog.io/@velopert/react-hooks) > [React 공식문서 useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)

만약, 언마운트 될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두번째 파라미터에 비어있는 배열을 넣으면 된다.

## useContext

> 참고
> [리액트의 Hooks 완벽 정복하기 : useReducer](https://velog.io/@velopert/react-hooks) > [React 공식문서 useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)

useContext를 이용해서 [배경 테마를 바꾸는 버튼](https://codesandbox.io/s/usehooks-od3bw?file=/src/UseContext.js)을 만들어보았다. useState를 사용하여 버튼을 누를 때마다 value값이 변하게 한다.

```javascript
// useState를 사용해서 상태값을 변경해준다.
import React, { useState } from "react";
import ContextSample from "./UseContext";

export default function App() {
  const [value, setValue] = useState("black");

  const handleContext = () => {
    return value === "black" ? setValue("white") : setValue("black");
  };

  return (
    <>
      <button onClick={handleContext}>button</button>
      <ContextSample value={value} />
    </>
  );
}
```

넘겨 받은 value값을 createContext에 넣어 context를 생성하고 변수에 대입된 이 값을 useContext 함수에 넣어서 버튼을 클릭할 때마다 변화하게 한다.

```javascript
import React, { createContext, useContext } from "react";

const ContextSample = ({ value }) => {
  const createTheme = createContext(value);
  const theme = useContext(createTheme);
  const style = {
    width: "100vw",
    height: "100vh",
    background: theme,
  };
  return <div style={style} />;
};

export default ContextSample;
```

라이트 다크모드를 만들거나 모바일에서 햄버거 메뉴를 만들때 사용하면 유용할 것 같다.

## useReducer

### 불변성

> 참고
> [리액트의 Hooks 완벽 정복하기 : useReducer, velopert](https://velog.io/@velopert/react-hooks)

useReducer는 기존 바닐라 자바스크립트의 Array.prototype.reduce()와 비슷하게 작동하는 것 같다. 다른 점은 배열이 아니더라도 동작한다.

React Hook을 공부하면서 계속 불변성에 대한 이야기가 나오는데 그 부분에 대해서 블로그를 찾아보았다.

> 함수의 불변성이란 무엇일까?  
> [변하지 않는 상태를 유지하는 방법, 불변성, 출처 : Evans Library](https://evan-moon.github.io/2020/01/05/what-is-immutable/)
> "사실 불변성이 이야기하는 상태의 변경이라는 것은 단순한 변수의 재할당을 이야기하는 것이 아니다. 정확히 말하면 **메모리에 저장된 값을 변경하는 모든 행위를 의미하며, 여기에 변수의 재할당과 같은 행위도 포함되는 것이다.**" - 블로그 글 중

불변성을 지키라는건 아래 코드와 같은 것을 말하는게 아닐까? 블로그 글을 보고 내가 직접 작성해본 코드라 불변성을 지킨 코드인지 정확하지는 않다.

```javascript
// 변이성

let a = 1;
function f(num) {
  return (a = num + 1);
}
const newA = f(a);
console.log(a); //2
console.log(newA); //2

// 불변성이란 이런것일까?

let b = 1;
const sum1 = function (num) {
  return num + 1;
};
const newNum = sum1(b);
console.log(b); // 1
console.log(newNum); //2

const str = "안녕하십니까.";

const subStringFunction = function (s, f) {
  return f();
};

const newStr = subStringFunction(str, () => str.substring(0, 2));
console.log(str); // 안녕하십니까
console.log(newStr); // 안녕

// 객체

const newUser = function (data, name) {
  // 객체 내부에 있는 객체까지 깊은 복사가 되지 않는다.
  const newUserObj = Object.assign({}, data);
  newUserObj.name = name;

  return newUserObj;
};

// 만약 내부 객체까지 전부 깊은 복사를 하려면 handleDeepCopyObj를 사용하면 된다.
// const handleDeepCopyObj = (data) => {
//   if (data === {} || typeof data !== "object") {
//     return data;
//   }
//   const copyObj = {};
//   for (let key in data) {
//     copyObj[key] = handleDeepCopyObj(data[key]);
//   }
//   return copyObj;
// };

const userAngel = { name: "Angel", age: 23, nation: "Asian" };
const userDevil = newUser(userAngel, "devil");
console.log(userAngel);
console.log(userDevil);
```

### useReducer 사용하기

위에 useState를 객체로 할당해서 [SearchContainer](../src/Routes/SearchContainer.js)movie와 tv로 나눴었는데 useReducer를 사용해서 비슷한 방법으로 [TVContainer](../src/Routes/TVContainer.js)의 useState를 useReduce로 바꿔보았다. 작동은 잘한다.

**그럼 useState와 useReducer의 차이는 무엇일까?**

> "useReducer가 useState보다 더 적합한 상황은 여러개의 부수적인 값들(예를 들면, 객체의 프로퍼티들)을 포함하거나, 이전의 상태에 다음 상태가 의존하는 경우 상태 관련 로직이 복잡해질 수 있는데, 이때는 useState보다 useReducer가 적합합니다."
> [출처](https://haeguri.github.io/2019/10/13/react-hooks-basic/#4-useReducer)

만약, 내 어플리케이션에서 영화 정보를 이전 상태에 의지한 상태에서 불러오는 것이라면 useReducer가 적합할 수 있다. 예를들어 왓챠에서 '보고싶어요'를 눌렀을 때, 유저 정보에 그 영화 정보를 이전 상태에 의존해서 새로운 값을 넣는 것이라고 할 수 있다.

그럼 reducer를 사용해서 검색 결과를 누적해서 불러올 수 있을까? 시험삼아 SearchContainer에 적용해보았다. 그런데 동작을 하지 않는다. 이유가 뭘까?(아직은 모름)

## useMemo

함수형 컴포넌트 내부에서 발생하는 연산 최적화를 할 수 있다. useMemo는 함수의 메모제이션과 비슷한 기능을 하는 것으로 보인다. 피보나치 수열을 함수의 메모제이션을 사용해서 구하는 방법이 있는데 이것도 변한 값에 대해서만 연산을 수행한다.

> [실습 예제](https://codesandbox.io/s/usehook-usememo-eei77?file=/src/Average.js)
> 출처 : [리엑트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)

### 적용해보기

나의 코드를 보면 movieDB에서 한번 불러온 정보를 페이지를 변경할 때마다 계속 불러오는 것을 알 수 있다.

### 함수의 메모제이션

> 출처 : [모던 자바스크립트 입문, 8장 함수](http://www.yes24.com/Product/Goods/59410698)

```javascript
function memo(f) {
  const cache = {};
  return function (x) {
    if (x in cache) {
      console.log("이미 저장된 값이다.");
      return cache[x];
    }
    console.log("새로 저장해야할 값다.");
    cache[x] = f(x);
    return cache[x];
  };
}

const memoFibo = memo(function (num) {
  if (num < 2) return num;
  return memoFibo(num - 1) + memoFibo(num - 2);
});

memoFibo(100);
```

## useCallback

useCallback은 useMemo와 비슷하다. 주로 렌더링 성능을 최적화해야하는 상황에서 사용한다. useCallback을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성할 수 있다.

> [실습 예제](https://codesandbox.io/s/usehook-usememo-eei77?file=/src/Average.js)  
> "숫자, 문자열, 객체 처럼 일반 값을 재사용하기 위해서는 useMemo 를, 그리고 함수를 재사용 하기 위해서는 useCallback 을 사용하세요."  
> 출처 : [리엑트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)

"컴포넌트가 렌더링 될 때"라는 말이 계속 나오는데 그 때가 언제인지(시점) 헷갈린다.

[React 렌더링 이해 및 최적화 (With Hook)](https://medium.com/vingle-tech-blog/react-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f255d6569849)

## useRef

> [실습 예제](https://codesandbox.io/s/useref-tfwrd?file=/src/Average.js)  
> 출처 : [리엑트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)

## 커스텀 훅

### useInput

> [실습 예제](../src/hooks.js)  
> 출처 : [리엑트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)

## 리엑트 훅의 작동 원리

> [아티클 실습]()
> 출처 :[[번역] 심층 분석: React Hook은 실제로 어떻게 동작할까?](https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/)
