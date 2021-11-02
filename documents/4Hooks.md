# Hooks

> 참고  
> [리액트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks)  
> [React의 함수형 컴포넌트! (feat.Hooks)](https://velog.io/@solmii/React%EC%9D%98-%ED%95%A8%EC%88%98%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-feat.Hooks)  
> [Hook의 개요](https://ko.reactjs.org/docs/hooks-intro.html) > [[번역] 심층 분석: React Hook은 실제로 어떻게 동작할까?](https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/)

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
    tv: []
  });

  const getData = async () => {
    try {
      const {
        data: { results: movieSearch }
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvSearch }
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
