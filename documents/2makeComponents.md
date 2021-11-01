# 컴포넌트 만들기

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
