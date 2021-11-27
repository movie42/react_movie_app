import React, { useState, useEffect } from "react";
import { useInputs } from "hooks";
import PropTypes from "prop-types";
import { tvApi } from "api";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";

const Container = styled.div`
  padding: 0 10px;
`;

const TVContainer = () => {
  const [loading, setLoading] = useState(true);

  const [state, handleData] = useInputs({
    onTheAir: [],
    popular: [],
    topRated: [],
  });

  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const {
        data: { results: onTheAir },
      } = await tvApi.on_the_air();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: topRated },
      } = await tvApi.top_rated();
      handleData({ onTheAir, popular, topRated });
    } catch {
      setError("데이터를 찾을 수 없습니다.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const { onTheAir, popular, topRated } = state;

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {onTheAir && onTheAir.length > 0 && (
        <Section title="방영중">
          {onTheAir.map((tv) => (
            <Poster
              key={tv.id}
              id={tv.id}
              imageUrl={tv.poster_path}
              title={tv.name}
              rating={tv.vote_average}
              year={tv.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="인기 작품">
          {popular.map((tv) => (
            <Poster
              key={tv.id}
              id={tv.id}
              imageUrl={tv.poster_path}
              title={tv.name}
              rating={tv.vote_average}
              year={tv.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="탑 10">
          {topRated.map((tv) => (
            <Poster
              key={tv.id}
              id={tv.id}
              imageUrl={tv.poster_path}
              title={tv.name}
              rating={tv.vote_average}
              year={tv.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {error && <Message color="black" text={error} />}
    </Container>
  );
};

// TVContainer.propTypes = {
//   onTheAir: PropTypes.array,
//   popular: PropTypes.array,
//   topRated: PropTypes.array,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string
// };

export default TVContainer;
