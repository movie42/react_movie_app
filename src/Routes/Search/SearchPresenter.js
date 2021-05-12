import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Error from "Components/Error";

const Container = styled.div`
  padding: 0 20px;
`;

const Form = styled.form`
  margin-top: 20px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  font-size: 30px;
`;

const TVPresenter = ({
  movieSearch,
  tvSearch,
  error,
  loading,
  searchTerm,
  handleSubmit,
  updateTerm,
}) => (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="찾고 싶은 영화나 드라마 제목을 입력해주세요"
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieSearch && movieSearch.length > 0 && (
          <Section title="영화">
            {movieSearch.map((movie) => movie.title)}
          </Section>
        )}
        {tvSearch && tvSearch.length > 0 && (
          <Section title="드라마"> {tvSearch.map((tv) => tv.name)} </Section>
        )}
        {error && <Error text={error} />}
      </>
    )}
  </Container>
);

TVPresenter.propTypes = {
  movieSearch: PropTypes.array,
  tvSearch: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default TVPresenter;
