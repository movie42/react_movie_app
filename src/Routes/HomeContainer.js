import React, { useEffect, useState, useReducer } from "react";
import { movieApi } from "api";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";

const Container = styled.div`
  padding: 0 10px;
`;

const reducer = (state, action) => {
  const { nowPlaying, popular, upComing } = action;
  return {
    ...state,
    nowPlaying,
    popular,
    upComing
  };
};

const HomeContainer = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    nowPlaying: [],
    popular: [],
    upComing: []
  });

  const [error, setError] = useState(null);
  const getData = async () => {
    try {
      const {
        data: { results: nowPlaying }
      } = await movieApi.nowPlaying();
      const {
        data: { results: popular }
      } = await movieApi.popular();
      const {
        data: { results: upComing }
      } = await movieApi.upComing();
      dispatch({ nowPlaying, popular, upComing });
    } catch {
      setError("영화 정보를 찾을 수 없습니다.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const { nowPlaying, popular, upComing } = state;
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="상영중">
          {nowPlaying.map((movie) => (
            <Poster
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="가장 많이 보는 작품">
          {popular.map((movie) => (
            <Poster
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {upComing && upComing.length > 0 && (
        <Section title="개봉 예정작">
          {upComing.map((movie) => (
            <Poster
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {error && <Message color="black" text={error} />}
    </Container>
  );
};

export default HomeContainer;
