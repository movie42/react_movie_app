import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Conatiner = styled.div`
  position: relative;
  height: calc(100vh - 10px);
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  z-index: -1;
`;

const Data = styled.div``;

const Title = styled.h3``;

const ItemContainer = styled.div``;

const Year = styled.span``;
const Time = styled.span``;
const Genres = styled.span``;

const Overview = styled.p``;

const VideoContainer = styled.div``;
const Video = styled.iframe``;

const DetailPresenter = ({ result, video, error, loading, isMovie }) =>
  loading ? (
    <Loader />
  ) : (
    <Conatiner>
      <Background
        bgUrl={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
      />
      <VideoContainer>
        {console.log(video)}
        <Video
          src={`https://youtube.com/embed/${video.results[0].key}`}
        ></Video>
      </VideoContainer>
      <Data>
        <Title>{result.title}</Title>
        <ItemContainer>
          <Year>
            {isMovie
              ? result.release_date.substring(0, 4)
              : result.first_air_date.substring(0, 4)}
          </Year>
          <Time>
            {isMovie
              ? `${result.runtime}min`
              : `${result.number_of_seasons}시즌 ${result.number_of_episodes}편`}
          </Time>
          <Genres>{result.genres.map((value) => ` ${value.name}`)}</Genres>
        </ItemContainer>
        <Overview>{result.overview}</Overview>
      </Data>
      {error && <Message color="red" title={error} />}
    </Conatiner>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  video: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default DetailPresenter;
