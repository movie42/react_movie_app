import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Image = styled.div`
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w300/${props.bgUrl}`});
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Rating = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 200px;
  text-align: center;
  margin: auto;
  background-color: rgba(255, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  opacity: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  &:hover {
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.h5`
  font-weight: bold;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Year = styled.small`
  font-size: 10px;
  color: #d6313d;
`;

export const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
}) => (
  <>
    <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
      <Container>
        <ImageContainer>
          <Image bgUrl={imageUrl} />
          <Rating>평점 | {rating}</Rating>
        </ImageContainer>
        <Title>{title}</Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  </>
);
