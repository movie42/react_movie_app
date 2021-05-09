import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const List = styled.ul`
  display: flex;
  &:hover {
    background-color: red;
  }
`;

const Item = styled.li`
  color: ${(props) => (props.current ? "red" : "inherit")};
`;

const OLink = styled(Link)``;

export default () => (
  <header>
    <List>
      <Item>
        <OLink to="/">MOVIE</OLink>
      </Item>
      <Item>
        <OLink to="/tv">TV</OLink>
      </Item>
      <Item>
        <OLink to="/search">SEARCH</OLink>
      </Item>
    </List>
  </header>
);
