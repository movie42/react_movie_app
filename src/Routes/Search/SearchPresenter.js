import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 0 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 1.5em;
  width: 100%;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  error,
  searchTerm,
  loading,
  handleSubmit,
  updateTerm,
}) => (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="찾으려는 영화 또는 TV 프로그램을 입력해주세요."
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Result">
            {movieResults.map((movie) => (
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
        {tvResults && tvResults.length > 0 && (
          <Section title="tv Result">
            {tvResults.map((show) => (
              <Poster
                ket={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_name}
                rating={show.vote_average}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults &&
          movieResults &&
          tvResults.length === 0 &&
          movieResults.length === 0 && (
            <Message text="Nothing Found" color="#2e2e2e" />
          )}
      </>
    )}
  </Container>
);

SearchPresenter.prototype = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
