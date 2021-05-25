import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi } from "api";
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

const SeasonItemContainer = styled.div`
  margin-bottom: 30px;
`;
const SeasonItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 150px) minmax(auto, 1fr);
  grid-gap: 10px;
`;
const SeasonItem = styled.li``;

const SeasonInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2em;
`;

const SeasonPoster = styled.div`
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w300/${props.bgUrl}`});
  width: 150px;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 10px;
`;

const NullPoster = styled.div`
  width: 150px;
  height: 200px;
  background-color: #5e5e5e;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
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

const SeasonName = styled.h3`
  font-size: 1.2em;
  color: white;
`;

const SeasonInfom = styled.span`
  font-size: 0.7em;
  color: white;
  align-self: flex-start;
`;

const Title = styled.h2`
  font-size: 2.2em;
  font-weight: bolder;
  color: red;
  margin-bottom: 10px;
`;

const Season = ({
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
        return null;
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
      <SeasonItemContainer>
        <Title>시즌 정보</Title>
        <SeasonItemList>
          {data.seasons.map((value) => (
            <SeasonItem>
              <SeasonInfoContainer>
                {value.poster_path ? (
                  <SeasonPoster bgUrl={value.poster_path} />
                ) : (
                  <NullPoster>No Poster</NullPoster>
                )}
                {value.name && <SeasonName>{value.name}</SeasonName>}
                {value.air_date && (
                  <SeasonInfom>
                    방영일 : {`${value.air_date.split("-")[0]}`}년
                    {`${value.air_date.split("-")[1]}`}월
                    {`${value.air_date.split("-")[2]}`}일
                  </SeasonInfom>
                )}
                {value.episode_count && (
                  <SeasonInfom>에피소드 : {value.episode_count}</SeasonInfom>
                )}
              </SeasonInfoContainer>
            </SeasonItem>
          ))}
        </SeasonItemList>
      </SeasonItemContainer>
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

export default Season;
