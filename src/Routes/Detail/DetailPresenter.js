import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Conatiner = styled.div`
  position: relative;
  padding: 20px 20px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  z-index: -1;
`;

const Data = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 2.5em;
  font-weight: bolder;
  color: white;
  margin-bottom: 5px;
`;

const ItemContainer = styled.div`
  color: white;
`;

const Year = styled.span`
  color: white;
`;
const Time = styled.span``;
const Genres = styled.span``;

const Overview = styled.p`
  padding-top: 10px;
  color: white;
  line-height: 25px;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const Video = styled.iframe`
  width: 1080px;
  height: 700px;
`;
const Divider = styled.span`
  color: white;
  margin: 0 5px;
`;

const ImdbContainer = styled.a`
  display: inline-block;
  background-color: #f4c518;
  padding: 5px 10px;
  width: 60px;
  border-radius: 6px;
  font-weight: bolder;
  margin-top: 10px;
`;

const DetailPresenter = ({ result, video, error, loading, isMovie }) =>
  loading ? (
    <Loader />
  ) : (
    <Conatiner>
      <Background
        bgUrl={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
      />
      <Title>{isMovie ? result.title : result.name}</Title>
      <Data>
        <ItemContainer>
          <Year>
            {isMovie
              ? result.release_date.substring(0, 4)
              : result.first_air_date.substring(0, 4)}
          </Year>
          <Divider>・</Divider>
          <Time>
            {isMovie
              ? `${result.runtime}min`
              : `${result.number_of_seasons}시즌 ${result.number_of_episodes}편`}
          </Time>
          <Divider>・</Divider>
          <Genres>
            {result.genres.map((value) => (
              <Divider>{value.name}</Divider>
            ))}
          </Genres>
        </ItemContainer>
        {isMovie ? (
          <ImdbContainer
            href={`https://imdb.com/title/${result.imdb_id}`}
            target="_blank"
          >
            IMDb
          </ImdbContainer>
        ) : null}
        <Overview>{result.overview}</Overview>
      </Data>
      <VideoContainer>
        <Video
          src={`https://youtube.com/embed/${video.results[0].key}`}
        ></Video>
      </VideoContainer>
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
