# 컴포넌트 반복

> 참고
> [[리액트를 다루는 기술] 6장 - 컴포넌트 반복](https://velog.io/@younho9/%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EB%8B%A4%EB%A3%A8%EB%8A%94-%EA%B8%B0%EC%88%A0-6%EC%9E%A5-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%B0%98%EB%B3%B5)  
> [리액트를 다루는 기술](http://www.yes24.com/Product/Goods/78233628?Acode=101)  
> [[React] 배열의 index를 key로 쓰면 안되는 이유](https://medium.com/sjk5766/react-%EB%B0%B0%EC%97%B4%EC%9D%98-index%EB%A5%BC-key%EB%A1%9C-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3ce48b3a18fb)

## 자바스크립트 배열의 map() 함수

리엑트에서 데이터를 반복할 때 map을 사용해서 데이터를 보여줄 수 있다.

[HomeContainer](/src/Routes/HomeContainer.js)

```javascript
{
  upComing.map((movie) => (
    <Poster
      id={movie.id}
      imageUrl={movie.poster_path}
      title={movie.title}
      rating={movie.vote_average}
      year={movie.release_date.substring(0, 4)}
      isMovie={true}
    />
  ));
}
```

### map() 함수

[MDN : Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

map을 사용하여 querySelectorAll에 유사 배열을 처리할 수 있다.

```javascript
const list = document.qeurySelectorAll(".checked");
const value = [].map.call(list, function (obj) {
  return obj.value;
});
```

그러나 Array.from()을 사용하면 더 쉽게 할 수 있다.

[MDN : Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

```javascript
const list = document.qeurySelectorAll(".checked");
const value = Array.from(list)
});
```

map에 하나의 인자만 받는 콜백을 사용하는 경우가 많다. 그러나 어떤 함수는 대게 두개 이산의 인자를 사용하는 경우가 있는데 이럴때 원하는 결과가 나오지 않을 수 있다.

> MDN에서 참고하고 있는 블로그
> [A JavaScript Optional Argument Hazard](http://www.wirfs-brock.com/allen/posts/166)

> parseInt
> [MDN : parseInt](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
> parseInt(string, radix)
> radix : string이 표현하는 정수를 나타내는 2와 36 사이의 진수. 주의 : 기본값이 10이 아닙니다.!

```javascript
["1", "2", "3"].map(parseInt);
//원하는 결과가 나오지 않는다.[1,NaN,NaN]

// 이런 함수를 만들어 map의 callback으로 보내거나
function returnInt(element) {
  return parseInt(element, 10);
}

// Number를 사용한다.
["1", "2", "3"].map(Number);
```

## 더 읽어보기

[[React] 배열의 index를 key로 쓰면 안되는 이유](https://medium.com/sjk5766/react-%EB%B0%B0%EC%97%B4%EC%9D%98-index%EB%A5%BC-key%EB%A1%9C-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3ce48b3a18fb)

[재조정(Reconciliation)](https://ko.reactjs.org/docs/reconciliation.html#recursing-on-children)

React가 key 속성을 지원하는 이유. key를 가지고 있다면 React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인한다. 트리 변환 작업이 효율적으로 수행되도록 하게 할 수 있다.

인덱스를 키로 사용하게 되면 아래와 같은 상황이 발생할 것이라고 경고하고 있다.

> "인덱스를 key로 사용 중 배열이 재배열되면 컴포넌트의 state와 관련된 문제가 발생할 수 있습니다. 컴포넌트 인스턴스는 key를 기반으로 갱신되고 재사용됩니다. 인덱스를 key로 사용하면, 항목의 순서가 바뀌었을 때 key 또한 바뀔 것입니다. 그 결과로, 컴포넌트의 state가 엉망이 되거나 의도하지 않은 방식으로 바뀔 수도 있습니다."
