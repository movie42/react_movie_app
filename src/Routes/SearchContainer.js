import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { movieApi, tvApi } from "api";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Poster from "Components/Poster";
import Message from "Components/Message";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);

  const getData = async () => {
    try {
      const {
        data: { results: movieSearch },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvSearch },
      } = await tvApi.search(searchTerm);

      setMovieData(movieSearch);
      setTvData(tvSearch);
    } catch {
      setError("정보를 찾을 수 없습니다.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getData();
    }
  };

  const updateTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [searchTerm]);

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
          {movieData && movieData.length > 0 && (
            <Section title="영화">
              {movieData.map((movie) => (
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
          {tvData && tvData.length > 0 && (
            <Section title="드라마">
              {tvData.map((tv) => (
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
          {movieData && movieData.length === 0 && tvData.length === 0 && (
            <Message text="검색어를 찾을 수 없습니다." color="#5e5e5e" />
          )}
        </>
      )}
    </Container>
  );
};

export default SearchContainer;
