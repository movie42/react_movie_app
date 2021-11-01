import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h2`
  font-size: 2.2em;
  font-weight: bolder;
  color: red;
  margin-bottom: 7px;
`;

const InfoTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default InfoTitle;
