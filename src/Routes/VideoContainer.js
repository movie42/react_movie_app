import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi, movieApi } from "api";
import Loader from "Components/Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 0;
`;

const Video = styled.iframe`
  width: 720px;
  height: 480px;
`;

const CloseBtn = styled.button`
  font-size: 20px;
  margin: 10px 0;
  padding: 5px 10px;
  background-color: red;
  border-radius: 5px;
  color: white;
  font-weight: bolder;
  border: 0;
  cursor: pointer;
  &:hover {
    color: red;
    background-color: white;
  }
`;

const Overview = styled.p`
  margin-top: 10px;
  padding-top: 10px;
  color: white;
  line-height: 27px;
  width: 720px;
`;

const VideoContainer = ({
  location: { pathname },
  match: {
    params: { id },
  },
  history: { push },
}) => {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [overview, setOverview] = useState("");
  const [error, setError] = useState(null);

  const parsedId = +id;
  const isMovie = pathname.includes("/movie/");

  const getData = async () => {
    try {
      let overview = null;
      let results = null;
      if (isMovie) {
        ({
          data: { results },
        } = await movieApi.movieDetailVideo(parsedId));
        ({
          data: { overview },
        } = await movieApi.movieDetail(parsedId));
      } else {
        ({
          data: { results },
        } = await tvApi.tvDetailVideo(parsedId));
        ({
          data: { overview },
        } = await tvApi.tvDetail(parsedId));
      }
      setVideoData(results);
      setOverview(overview);
    } catch {
      setError("데이터를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <CloseBtn
        onClick={() => {
          if (isMovie) {
            push(`/movie/${parsedId}`);
          } else {
            push(`/tv/${parsedId}`);
          }
        }}
      >
        메인으로 돌아가기
      </CloseBtn>
      <Video src={`https://www.youtube.com/embed/${videoData[0].key}`}></Video>
      <Overview>{overview}</Overview>
    </Container>
  );
};

// VideoContainer.propTypes = {};

export default VideoContainer;
