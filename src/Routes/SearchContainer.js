import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { movieApi, tvApi } from "api";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";
import { useInputs } from "../hooks";

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

const SearchContainer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, handleData] = useInputs({
    movie: [],
    tv: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      const {
        data: { results: movieSearch },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvSearch },
      } = await tvApi.search(searchTerm);

      handleData({ movie: movieSearch, tv: tvSearch });
    } catch {
      setError("정보를 찾을 수 없습니다.");
      setLoading(false);
      handleData({ movie: [], tv: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const updateTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [searchTerm]);

  const { movie, tv } = state;

  return (
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
          {movie && movie.length > 0 && (
            <Section title="영화">
              {movie.map((movie) => (
                <Poster
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : null
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tv && tv.length > 0 && (
            <Section title="드라마">
              {tv.map((tv) => (
                <Poster
                  id={tv.id}
                  imageUrl={tv.poster_path}
                  title={tv.name}
                  rating={tv.vote_average}
                  year={
                    tv.first_air_date ? tv.first_air_date.substring(0, 4) : null
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message color="black" text={error} />}
          {movie && movie.length === 0 && tv.length === 0 && (
            <Message text="검색어를 찾을 수 없습니다." color="#5e5e5e" />
          )}
        </>
      )}
    </Container>
  );
};

export default SearchContainer;
