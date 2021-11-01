import React from "react";
import styled from "styled-components";

const CommonBtn = styled.button`
  display: inline-block;
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

const LinkBtn = styled.a`
  display: inline-block;
  padding: 5px 6px;
  font-size: 1.8em;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  margin-bottom: 20px;
  &:hover {
    background-color: white;
    color: black;
  }
`;

export const CommonButton = ({ func, title }) => {
  return <CommonBtn onClick={func}>{title}</CommonBtn>;
};

export const LinkButton = ({ href, title }) => {
  return <LinkBtn href={href}>{title}</LinkBtn>;
};
