# React로 movie app 만들기

> new update 2021.11.1  
> Deploying https://trusting-wilson-9143af.netlify.app

## 목차

- [React로 movie app 만들기](#react로-movie-app-만들기)
  - [목차](#목차)
  - [참조](#참조)
  - [React와 세팅](#react와-세팅)
    - [CRA 설치](#cra-설치)
    - [업데이트](#업데이트)
      - [CRA 업데이트](#cra-업데이트)
      - [npm 종속 패키지 최신 버전으로 업데이트 하기](#npm-종속-패키지-최신-버전으로-업데이트-하기)
  - [JSX란?](#jsx란)
    - [규칙](#규칙)
  - [컴포넌트 만들기](#컴포넌트-만들기)

## 참조

- 이 포트폴리오는 [노마드코더의 리액트 맴버십](https://nomadcoders.co/react-for-beginners)을 토대로 만들었다.(2021.5)
- 리액트를 다시 복습은 [clelab](https://clelab.io/course/react)을 참고해서 복습하였다.

## React와 세팅

[React - CRA (Create-React-App)](https://velog.io/@devmoonsh/React-CRA-Create-React-App)

### CRA 설치

1. 먼저 nodejs가 설치 되어있어야한다.

2. 터미널에서 프로젝트를 생성하고자 하는 위치에서 아래와 같이 입력한다.
   - my-project는 내가 원하는 이름으로 변경할 수 있다.

```
npx create-react-app my-project
```

3. npx가 안되면 먼저 npx를 설치하면 된다.

```
npm install npx -g
```

설치 후 확인은 npx -v 명령어를 실행하면 된다.

4. project로 이동한 뒤 npm start로 실행시키면 로컬 서버 주소를 확인 할 수 있다.

### 업데이트

#### CRA 업데이트

[Create React App-Based Projects를 버전 4 (CRA 4)로 업그레이드](https://ichi.pro/ko/create-react-app-based-projectsleul-beojeon-4-cra-4-lo-eobgeuleideu-237039965311398)
[공식문서 : Updating to New Releases](https://create-react-app.dev/docs/updating-to-new-releases/)
[CRA 깃 저장소](https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md)

나같은 경우는 이미 CRA가 설치된 상황이라 업데이트가 필요했다.

1. 터미널을 열고 프로젝트로 이동한뒤 아래 명령어를 입력한다.

```
npm install --save --save-exact react-scripts@latest
```

#### npm 종속 패키지 최신 버전으로 업데이트 하기

[package.json의 종속성을 최신버전으로 업데이트하는 방법](https://blog.stories.pe.kr/271)

## JSX란?

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

## 컴포넌트 만들기

> 출처  
> [[React JS] Components와 Props](https://medium.com/@lhg1628/react-js-components%EC%99%80-props-e5ff2033e612)  
> [누구든지 하는 리액트 4편:props와 state](https://velopert.com/3629)

1. 컴포넌트 정의해보기

```javascript
// 함수로 정의

function Hello(props) {
  return <h1>function Hello, {props.name}</h1>;
}

// Class로 정의

class Hello extends React.component {
  render() {
    return <h1>class Hello, {this.props.name}</h1>;
  }
}
```

2. Rendering of Components

[index.js](src/index.js)
[App.js](src/Components/App.js)

- user-defined된 엘리먼트 활용하여 정의한 함수 컴포넌트 렌더링 하기

```javascript
class Hello extends React.component {
  render() {
    return <h1>class Hello, {this.props.name}</h1>;
  }
}

let data = <Hello name="JO" />;

ReactDOM.render(data, document.querySelector("#root"));
```

3. Composing Components

위와 같은 방법은 속성값을 변경하여 재사용이 가능하다.

```javascript
function ReUse() {
  return (
    <>
      <Hello name="JO" />
      <Hello name="Ka" />
    </>
  );
}

ReactDOM.render(<ReUse />, document.querySelector("#root"));
```

4. Extracting Components

복잡하게 구성된 하나의 컴포넌트를 쪼갤수 있다.

5. Props 넘겨주기

Props는 상위 컴포넌트가 하위 컴포넌트에게 넘겨주는 일종의 변수들.

6. Props are Read-Only

- Props들은 오직 읽기만 가능하다. 자식 컴포넌트들이 이 props값들을 수정하는 것은 불가능하다.
- state는 컴포넌트 내부에서 선언하며 값을 변경할 수 있다.

7. 실습해보기

[Makers.js](src/Routes/Makers.js)를 컴포넌트를 이용하여 가독성이 좋은 코드로 만들어 본다.

- 먼저 반복되는 부분 찾기

  - 제목, data를 생성하여 브라우저에 출력하는 부분
  - 버튼

- MovieInfo 폴더를 만들고 InfoTitle.js, Maker.js 컴포넌트를 만든다.
- 컴포넌트를 불러와서 제목과 데이터를 전달하여 코드를 변경한다.

```javascript
// 수정 전
const Makers = ({
  location: { pathname },
  match: {
    params: { id }
  },
  history: { push }
}) => {
  // 생략

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <ItemContainer>
        <ProductionItemContainer></ProductionItemContainer>
        {/* 링크 버튼이라는 컴포넌트를 만들면 재사용이 가능할 것 같다.*/}
        <HomePage href={data.homepage}>홈페이지</HomePage>
        {/* 문제가 되는 부분 */}
        {isMovie ? null : (
          <ProductionItemContainer>
            <Title>제작자</Title>
            <ProductionItemList>
              {data.created_by.map((value) => (
                <ProductionItem>
                  <ProductionInfoContainer>
                    {value.name && (
                      <ProductionName>{value.name}</ProductionName>
                    )}
                  </ProductionInfoContainer>
                </ProductionItem>
              ))}
            </ProductionItemList>
          </ProductionItemContainer>
        )}

        <ProductionItemContainer>
          <Title>제작 국가</Title>
          <ProductionItemList>
            {data.production_countries.map((value) => (
              <ProductionItem>
                <ProductionInfoContainer>
                  {value.name && (
                    <ProductionName>{value.name}</ProductionName>
                  )}
                </ProductionInfoContainer>
              </ProductionItem>
            ))}
          </ProductionItemList>
        </ProductionItemContainer>

        {isMovie ? (
          <>
            <ProductionItemContainer>
              <Title>제작비</Title>
              <ProductionName>
                ${data.budget.toLocaleString("ko-KR")}
              </ProductionName>
            </ProductionItemContainer>
            <ProductionItemContainer>
              <Title>흥행수익</Title>
              <ProductionName>
                ${data.revenue.toLocaleString("ko-KR")}
              </ProductionName>
            </ProductionItemContainer>
          </>
        ) : (
          "null"
        )}

        <ProductionItemContainer>
          <Title>평점</Title>
          <ProductionName>{data.vote_average}</ProductionName>
        </ProductionItemContainer>
      </ItemContainer>
      <CloseBtn
        onClick={() => {
          if (isMovie) {
            push(`/movie/${parsedId}`);
          } else {
            push(`/tv/${parsedId}`);
          }
        }}
      >
        메인으로 돌아가기
      </CloseBtn>
    </Container>
  );
};
```
