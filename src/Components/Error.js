import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Text = styled.h3`
  font-size: 35px;
  font-weight: bolder;
  color: red;
`;

const Error = ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Error;
