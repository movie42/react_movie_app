# React.memo

아마 나같은 고민을 한 사람 분명 있을 것이라 생각한다. 자바스크립트에서 메모제이션을 처음 접했을 때 별생각 없다가 useCallback이나 useMemo을 처음 접하고 나서 '이거 뭔가 메모제이션이랑 비슷한데?'라고 어렴풋이 생각하게 됐다.
영화 API를 콘솔로 추적하다가 계속 똑같은 데이터를 반복해서 불러오는 것을 보고 '이럴 때 메모제이션을 사용하면 영화 API가 변경됐을 때만 다시 랜더링 하면 되는거 아닐까?'라고 생각했다. 하지만 이 고민은 얼마 안가서 폐기된다. 왜냐하면 성능 상에 아무런 득이 될 것이 없다고 생각이 들기 때문이다. 나의 생각의 결론은 이렇다.

1. 메인 화면에 뿌려줘야하는 data가 적어도 60개가 넘는데(컴퓨터가 연산하기에는 껌인 숫자지만...) 그 중에서 변화되는 것을 비교하면, 그것을 비교하는데 드는 비용이 있을 것이다.
2. 비교하고나서 리액트는 '이거 변경 안된거니까 이전 데이터로 그냥 뿌려줘'라고 하면 다시 리액트는 이전 데이터로 값을 뿌린다.(물론 여기서 다시 랜더링을 안하는 것이면 문제가 되지 않겠지만) 어차피 페이지가 변경될 때마다 리액트는 그림을 바꿔 그려주는 것이니까 생각해보면 이러나 저러나 똑같잖아?

실무에서 어떤식으로 하는지 알 수는 없지만 컴퓨터가 충분히 좋은데 굳이 데이터를 불러오는데까지 React.memo를 사용할까 싶다.(취업하면 답을 얻게 될지도?)

하지만 Toast UI에 올라온 [React.memo() 현명하게 쓰기](https://ui.toast.com/weekly-pick/ko_20190731)란 글을 보면 불필요한 렌더링을 건너 뛰기 위해 React.memo를 사용한다고 한다.

하지만 React.memo를 사용하면 성능을 개선할 수 있는 컴포넌트가 분명 존재할 것이다. 예를 들어 서식 컴포넌트를 생성할 때, input 컴포넌트에 useMemo를 사용하면 불필요한 렌더링을 피할 수 있다.

react를 하다보니 이번 공부의 끝(React 말고)은 PureCompoenet, React.memo를 어느 상황에서 쓰고 쓰지 않을지 결정할 수 있는 경험 내지 레퍼런스를 모아야겠다는 생각이 들었다. 실무에서 나에게 누군가 가르켜줄수도 있지만 그렇지 못할 수도 있고 언젠가는 나 스스로 결정해야하는 순간이 올수도 있기 때문이다.

그래서 이번 공부의 방향을 다음과 같이 잡게 되었다.

1. PureComponent 또는 React.memo는 무엇인가?
2. 왜 모든 컴포넌트에서 pureComponent 또는 React.memo를 사용하면 안될까?
3. 그럼 어느 경우에 사용하거나 사용하지 않으면 될까? (1번을 잘 이해하면 2번은 자연스럽게 해결될 수도 있겠지?)

> 실습 컴포넌트
> [Poster](../src/Components/Poster.js)

## PureComponent

## React.memo

[useCallback과 React.Memo을 통한 렌더링 최적화](https://velog.io/@yejinh/useCallback%EA%B3%BC-React.Memo%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)

https://www.google.com/search?q=purecompoent+toastui&rlz=1C5CHFA_enKR950KR950&oq=purecompoent+toastui&aqs=chrome..69i57j0i333.7645j0j7&sourceid=chrome&ie=UTF-8

https://ui.toast.com/weekly-pick/ko_20190731

https://github.com/facebook/react/issues/14463

https://ichi.pro/ko/react-pyueo-keomponeonteuneun-eonje-sayonghaeyahabnikka-95400930306416

https://reactjs.org/docs/react-api.html

https://reactjs.org/docs/react-api.html#reactcomponent
