import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #ff0000;
  font-weight: bolder;
`;

const Grid = styled.div`
  margin-top: 10px;
`;

const Section = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  childrend: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
