import React, { useEffect, useState } from "react";
import { Link, withRouter, Router, Route } from "react-router-dom";
import { movieApi, tvApi } from "api";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "Components/Message";
import Loader from "Components/Loader";
import Makers from "./Makers";
import Season from "./Season";
import VideoContainer from "./VideoContainer";

const Container = styled.div`
  position: relative;
  padding: 20px 40px;
  height: calc(100vh - 44px);
`;

const AllItemContainer = styled.div``;

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

const Title = styled.h3`
  font-size: 4em;
  font-weight: bolder;
  color: white;
  margin-bottom: 5px;
`;

const ItemContainer = styled.div`
  color: white;
  line-height: 22px;
`;

const Year = styled.div`
  color: white;
`;
const Time = styled.div``;
const Genres = styled.div``;

const Divider = styled.span`
  color: white;
  margin: 0 5px;
`;

const ImdbContainer = styled.a`
  display: inline-block;
  background-color: #f4c518;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: bolder;
  margin-left: 10px;
  color: black;
  &:hover {
    background-color: black;
    color: #f4c518;
  }
`;

const DetailMenu = styled.div``;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  background-color: ${(props) => (props.current ? "white" : "red")};
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: ${(props) => (props.current ? "red" : "white")};
  &:not(:first-child) {
    margin-left: 12px;
  }
  &:hover {
    background-color: white;
    color: red;
    font-weight: bolder;
  }
`;

const ALink = styled(Link)`
  display: block;
`;

const BtnContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

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
        console.log(data);
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
        <AllItemContainer>
          <Title>{adress ? item.title : item.name}</Title>
          <BtnContainer>
            <DetailMenu>
              <List>
                <Item
                  current={
                    adress
                      ? pathname === `/movie/${parsedId}/video`
                      : pathname === `/tv/${parsedId}/video`
                  }
                >
                  <ALink
                    to={
                      adress
                        ? `/movie/${parsedId}/video`
                        : `/tv/${parsedId}/video`
                    }
                  >
                    예고편 재생
                  </ALink>
                </Item>
                <Item
                  current={
                    adress
                      ? pathname === `/movie/${parsedId}/makers`
                      : pathname === `/tv/${parsedId}/makers`
                  }
                >
                  <ALink
                    to={
                      adress
                        ? `/movie/${parsedId}/makers`
                        : `/tv/${parsedId}/makers`
                    }
                  >
                    제작 정보
                  </ALink>
                </Item>
                {adress ? (
                  <></>
                ) : (
                  <Item current={pathname === `/tv/${parsedId}/season`}>
                    <ALink to={`/tv/${parsedId}/season`}>시즌 정보</ALink>
                  </Item>
                )}
              </List>
              <Route
                path={adress ? "/movie/:id/video" : "/tv/:id/video"}
                exact
                component={VideoContainer}
              />
              <Route
                path={adress ? "/movie/:id/makers" : "/tv/:id/makers"}
                exact
                component={Makers}
              />
              {adress ? (
                <></>
              ) : (
                <Route path={"/tv/:id/season"} exact component={Season} />
              )}
            </DetailMenu>

            <ImdbContainer
              href={
                adress
                  ? `https://imdb.com/title/${item.imdb_id}`
                  : item.homepage
              }
              target="_blank"
            >
              {adress ? "IMDb" : "HomePage"}
            </ImdbContainer>
          </BtnContainer>
          <ItemContainer>
            <Year>
              제작 연도 :
              {adress
                ? ` ${item.release_date.substring(0, 4)}`
                : ` ${item.first_air_date.substring(0, 4)}`}
            </Year>

            <Time>
              상영 시간 :
              {adress
                ? ` ${item.runtime}min`
                : ` ${item.number_of_seasons}시즌 ${item.number_of_episodes}편`}
            </Time>
            <Genres>
              장르 :
              {item.genres.map((value) => (
                <Divider> {value.name}</Divider>
              ))}
            </Genres>
          </ItemContainer>
        </AllItemContainer>
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
