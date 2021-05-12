import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Error from "Components/Error";

const Container = styled.div``;

const TVPresenter = ({ onTheAir, popular, topRated, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {onTheAir && onTheAir.length > 0 && (
        <Section title="방영중">{onTheAir.map((tv) => tv.name)}</Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="많이 찾는 작품 들">
          {popular.map((tv) => tv.name)}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="탑 10">{topRated.map((tv) => tv.name)}</Section>
      )}
      {error && <Error text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  onTheAir: PropTypes.array,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
