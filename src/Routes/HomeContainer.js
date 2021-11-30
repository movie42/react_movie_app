import React, { useEffect, useState } from "react";
import { useInputs } from "hooks";
import { movieApi } from "api";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import useData from "../useData";
const Container = styled.div`
  padding: 0 10px;
`;

const HomeContainer = () => {
  const [loading, setLoading] = useState(true);
  const { movie, error } = useData();

  // const [state, dispatch] = useInputs({
  //   nowPlaying: [],
  //   popular: [],
  //   upComing: []
  // });

  // const [error, setError] = useState(null);

  // const getData = async () => {
  //   try {
  //     const {
  //       data: { results: nowPlaying }
  //     } = await movieApi.nowPlaying();

  //     const {
  //       data: { results: popular }
  //     } = await movieApi.popular();
  //     const {
  //       data: { results: upComing }
  //     } = await movieApi.upComing();
  //     dispatch({ nowPlaying, popular, upComing });
  //   } catch {
  //     // setError("영화 정보를 찾을 수 없습니다.");
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const { nowPlaying, popular, upComing } = state;

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {movie && movie.results.length > 0 && (
        <Section title="테스트">
          {movie.results.map((value) => {
            return (
              <Poster
                key={value.id}
                id={value.id}
                imageUrl={value.poster_path}
                title={value.title}
                rating={value.vote_average}
                year={value.release_date.substring(0, 4)}
                isMovie={true}
              />
            );
          })}
        </Section>
      )}
      {/* {nowPlaying && nowPlaying.length > 0 && (
        <Section title="상영중">
          {nowPlaying.map((movie) => (
            <>
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            </>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="가장 많이 보는 작품">
          {popular.map((movie) => (
            <Poster
              key={movie.id}
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
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )} */}
      {error && <Message color="black" text={error} />}
    </Container>
  );
};

// HomeContainer.propTypes = {
//   nowPlaying: PropTypes.array,
//   popular: PropTypes.array,
//   upComing: PropTypes.array,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string
// };

export default HomeContainer;
