import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 0 20px;
`;

const HomePresenter = ({ nowPlaying, upComing, popular, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => (
            <Poster
              ket={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              isMovie={true}
              year={movie.release_date && movie.release_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {upComing && upComing.length > 0 && (
        <Section title="Upcoming Playing">
          {upComing.map((movie) => (
            <Poster
              ket={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              isMovie={true}
              year={movie.release_date && movie.release_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Playing">
          {popular.map((movie) => (
            <Poster
              ket={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              isMovie={true}
              year={movie.release_date && movie.release_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

HomePresenter.propTyeps = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upComing: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default HomePresenter;
