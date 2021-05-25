import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi, movieApi } from "api";
import Loader from "Components/Loader";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 10px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 0;
  overflow: auto;
  scroll-behavior: smooth;
`;

const CloseBtn = styled.button`
  display: inline-block;
  font-size: 20px;
  padding: 5px 10px;
  background-color: red;
  border-radius: 5px;
  color: white;
  font-weight: bolder;
  border: 0;
  cursor: pointer;
  &:hover {
    color: red;
    background-color: white;
  }
`;

const ItemContainer = styled.div``;

const ProductionItemContainer = styled.div`
  margin-bottom: 30px;
`;
const ProductionItemList = styled.ul``;
const ProductionItem = styled.li``;
const ProductionInfoContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 2.2em;
`;

const HomePage = styled.a`
  display: inline-block;
  padding: 5px 6px;
  font-size: 1.8em;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const ProductionName = styled.h3`
  font-size: 2em;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.2em;
  font-weight: bolder;
  color: red;
  margin-bottom: 7px;
`;
const Makers = ({
  location: { pathname },
  match: {
    params: { id },
  },
  history: { push },
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const parsedId = +id;
  const isMovie = pathname.includes("/movie/");

  const dataLoader = async () => {
    try {
      let data = null;
      if (isMovie) {
        ({ data } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data } = await tvApi.tvDetail(parsedId));
      }
      setData(data);
    } catch {
      setError("데이터를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataLoader();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <ItemContainer>
        <ProductionItemContainer>
          <Title>제작</Title>
          <ProductionItemList>
            {data.production_companies.map((value) => (
              <ProductionItem>
                <ProductionInfoContainer>
                  {value.name && <ProductionName>{value.name}</ProductionName>}
                </ProductionInfoContainer>
              </ProductionItem>
            ))}
          </ProductionItemList>
        </ProductionItemContainer>
        <HomePage href={data.homepage}>홈페이지</HomePage>
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
                  {value.name && <ProductionName>{value.name}</ProductionName>}
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

// VideoContainer.propTypes = {};

export default Makers;
