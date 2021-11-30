import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0;
`;

const Title = styled.h3`
  font-size: 25px;
  color: #ff0000;
  font-weight: bolder;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 150px));
  grid-gap: 3px;
  margin-top: 10px;
  justify-content: space-between;
`;

const Section = ({ key, title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid key={key}>{children}</Grid>
    </Container>
  );
};

// Section.propTypes = {
//   title: PropTypes.string.isRequired,
//   childrend: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ])
// };

export default Section;
