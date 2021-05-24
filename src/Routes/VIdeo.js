import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { tvApi, movieApi } from "api";
import Loader from "Components/Loader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Video = styled.iframe`
  width: 720px;
  height: 480px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 40px;
  font-size: 20px;
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

const VideoContainer = ({
  location: { pathname },
  match: {
    params: { id },
  },
  history: { push },
}) => {
  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState(null);

  const parsedId = +id;
  const isMovie = pathname.includes("/movie/");

  const dataLoader = async () => {
    try {
      let results = null;
      if (isMovie) {
        ({
          data: { results },
        } = await movieApi.movieDetailVideo(parsedId));
      } else {
        ({
          data: { results },
        } = await tvApi.tvDetailVideo(parsedId));
      }
      setVideoData(results);
    } catch {
      setError("데이터를 찾을 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataLoader();
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
        동영상 닫기
      </CloseBtn>
      <Video src={`https://www.youtube.com/embed/${videoData[0].key}`}></Video>
    </Container>
  );
};

// VideoContainer.propTypes = {};

export default VideoContainer;
