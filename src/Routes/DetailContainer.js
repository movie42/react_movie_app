import React, { useEffect, useState } from "react";
import { Link, withRouter, Router, Route } from "react-router-dom";
import { movieApi, tvApi } from "api";
import PropTypes from "prop-types";
import styled from "styled-components";
import Video from "Routes/Video";
import Message from "Components/Message";
import Loader from "Components/Loader";

const Container = styled.div`
  position: relative;
  padding: 20px 20px;
  height: 100vh;
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

// const Video = styled.iframe`
//   width: 1080px;
//   height: 700px;
// `;

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

const DetailMenu = styled.div``;

const List = styled.ul``;

const Item = styled.li``;

const Detail = withRouter(
  ({
    location: { pathname },
    match: {
      params: { id },
    },
    history: { push },
  }) => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    const [adress, setAdress] = useState(false);

    useEffect(() => {
      fetchData();
    }, []);

    const parsedId = +id;

    const fetchData = async () => {
      const isMovie = pathname.includes("/movie/");

      try {
        if (isNaN(parsedId)) {
          return push("/");
        }
        let data = null;
        if (isMovie) {
          ({ data } = await movieApi.movieDetail(parsedId));
        } else {
          ({ data } = await tvApi.tvDetail(parsedId));
        }
        setItem(data);
        setAdress(isMovie);
      } catch (error) {
        setError("데이터를 불러 올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    return loading ? (
      <Loader />
    ) : (
      <Container>
        <Background
          bgUrl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        />
        <Title>{adress ? item.title : item.name}</Title>
        <Data>
          <ItemContainer>
            <Year>
              {adress
                ? item.release_date.substring(0, 4)
                : item.first_air_date.substring(0, 4)}
            </Year>
            <Divider>・</Divider>
            <Time>
              {adress
                ? `${item.runtime}min`
                : `${item.number_of_seasons}시즌 ${item.number_of_episodes}편`}
            </Time>
            <Divider>・</Divider>
            <Genres>
              {item.genres.map((value) => (
                <Divider>{value.name}</Divider>
              ))}
            </Genres>
          </ItemContainer>
          {adress ? (
            <ImdbContainer
              href={`https://imdb.com/title/${item.imdb_id}`}
              target="_blank"
            >
              IMDb
            </ImdbContainer>
          ) : null}
          <Overview>{item.overview}</Overview>
        </Data>
        <DetailMenu>
          <List>
            {adress ? (
              <Item current={pathname === `/movie/${parsedId}/video`}>
                <Link to={`/movie/${parsedId}/video`}>Video</Link>
              </Item>
            ) : (
              <Item current={pathname === `/tv/${parsedId}/video`}>
                <Link to={`/tv/${parsedId}/video`}>Video</Link>
              </Item>
            )}
          </List>
          {adress ? (
            <Route path="/movie/:id/video" component={Video} />
          ) : (
            <Route path="/tv/:id/video" component={Video} />
          )}
        </DetailMenu>

        {error && <Message color="red" title={error} />}
      </Container>
    );
  }
);

// Detail.propTypes = {
//   result: PropTypes.array,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string,
// };

export default Detail;
