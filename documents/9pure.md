# React.memo()

> 실습 컴포넌트
> [Poster](../src/Components/Poster.js)

아마 나같은 고민을 한 사람 분명 있을 것이라 생각한다. 자바스크립트에서 메모제이션을 처음 접했을 때 별생각 없다가 useCallback이나 useMemo을 처음 접하고 나서 '이거 뭔가 메모제이션이랑 비슷한데?'라고 어렴풋이 생각하게 됐다.
영화 API를 콘솔로 추적하다가 계속 똑같은 데이터를 반복해서 불러오는 것을 보고 '이럴 때 메모제이션을 사용하면 영화 API가 변경됐을 때만 다시 랜더링 하면 되는거 아닐까?'라고 생각했다. 하지만 이 고민은 얼마 안가서 폐기된다. 왜냐하면 성능 상에 아무런 득이 될 것이 없다고 생각이 들기 때문이다. 나의 생각의 결론은 이렇다.

1. 어차피 페이지가 변경될 때마다 리액트는 그림을 바꿔 그려주는 것이니까 생각해보면 이러나 저러나 똑같잖아? 결론적으로 페이지가 바뀌면 데이터도 바뀌기 때문에 당연히 새로 그려줘야한다.
2. 찾다보니 누군가 페이스북 리엑트 깃헙 이슈에 [Q: When should you NOT use React memo? #14463](https://github.com/facebook/react/issues/14463)라는 질문을 했다. 여기에서 [markerikson](https://github.com/facebook/react/issues/14463#issuecomment-448829902)이라는 유저의 답을 보면 props.children으로 컴포넌트를 설계했을 경우가 여기에 해당한다. 나같은 경우는 [Poster](../src/Components/Poster.js)컴포넌트를 [Section](../src/Components/Section.js) 컴포넌트가 감싸면서 children으로 받고 있기 때문에 React.memo()가 필요하지 않을 수 있다.
3. [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-ntp-icon)의 profiler를 사용해서 비교해보았을 때, 차이가 없다.

하지만 Toast UI에 올라온 [React.memo() 현명하게 쓰기](https://ui.toast.com/weekly-pick/ko_20190731)란 글을 보면 불필요한 렌더링을 건너 뛰기 위해 React.memo를 사용한다고 한다. 그러나 해당 경우는 나의 경우를 예로 들어 Poster 컴포넌트에서 views라는 prop을 실시간으로 불러와 랜더링 해야할 때, 불필요하게 컴포넌트의 모든 구성요소를 리렌더링 하는 경우를 말하는 듯 싶다. 그런데 그냥 가상으로 view를 불러오는 코드를 만들어 보면 컴포넌트 전체를 불러온다. 변경되는 데이터만 불러와야하는데...

```javascript
const Poster = ({ id, imageUrl, title, rating, year, isMovie = false })
  const [view, setView] = useState(0);
  const handleClick = useCallback(() => {
    return setView(view + 1);
  },[view])
  return (
    <>
      {console.log(`${id} ${title}render`)}
      <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
        <Container>
          <ImageContainer>
            <Image bgUrl={imageUrl} />
            <Rating>평점 | {rating}</Rating>
          </ImageContainer>
          <Title>{title}</Title>
          <Year>{year}</Year>
        </Container>
      </Link>
      {view}
      <button onClick={handleClick}>클릭</button>
    </>
  );
};
```

![뷰 데이터가 업데이트 될 때마다 prop 전체가 렌더링된다.](image/스크린샷%202021-11-27%20오후%202.28.44.png)
이게 적절한 예가 맞을까...?

컴포넌트를 다시 원래대로 돌려놓고 나서 노마드 커뮤니티에 질문을 올렸다. 답변이 달리는대로 다시 업데이트 해야겠다.

## 참고한 아티클

[useCallback과 React.Memo을 통한 렌더링 최적화](https://velog.io/@yejinh/useCallback%EA%B3%BC-React.Memo%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)
[React.memo() 현명하게 사용하기](https://ui.toast.com/weekly-pick/ko_20190731)
[Q: When should you NOT use React memo? #14463](https://github.com/facebook/react/issues/14463)
[React — 퓨어 컴포넌트는 언제 사용해야합니까?](https://ichi.pro/ko/react-pyueo-keomponeonteuneun-eonje-sayonghaeyahabnikka-95400930306416)
[React Top-Level API](https://reactjs.org/docs/react-api.html#reactmemo)
