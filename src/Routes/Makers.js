import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tvApi, movieApi } from "api";
import Loader from "Components/Loader";
import Maker from "Components/MovieInfo/Maker";
import { LinkButton, CommonButton } from "Components/ButtonStyle";

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

const ItemContainer = styled.div``;

const Makers = ({
  location: { pathname },
  match: {
    params: { id }
  },
  history: { push }
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

  function handleLink() {
    if (isMovie) {
      push(`/movie/${parsedId}`);
    } else {
      push(`/tv/${parsedId}`);
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <ItemContainer>
        <Maker title="제작" data={data.production_companies} />
        <LinkButton href={data.homepage} title="홈페이지" />
        <Maker title="제작자" data={data.created_by} />
        <Maker title="제작 국가" data={data.production_countries} />
        <Maker title="제작비" data={data.budget} marker="$" />
        <Maker title="흥행수익" data={data.revenue} marker="$" />
        <Maker title="평점" data={data.vote_average} />
      </ItemContainer>
      <CommonButton func={handleLink} title="메인으로 돌아가기" />
    </Container>
  );
};

// VideoContainer.propTypes = {};

export default Makers;
