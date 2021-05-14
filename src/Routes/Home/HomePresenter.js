import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  padding: 0 10px;
`;

const HomePresenter = ({ nowPlaying, popular, upComing, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="상영중">
          {nowPlaying.map((movie) => movie.title)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="가장 많이 보는 작품">
          {popular.map((movie) => movie.title)}
        </Section>
      )}
      {upComing && upComing.length > 0 && (
        <Section title="개봉 예정작">
          {upComing.map((movie) => movie.title)}
        </Section>
      )}
      {error && <Message color="black" text={error} />}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upComing: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default HomePresenter;
