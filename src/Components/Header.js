import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const List = styled.ul`
  display: flex;
  &:hover {
    background-color: red;
  }
`;

const Item = styled.li`
  color: ${(props) => (props.current ? "red" : "inherit")};
  font-weight: ${(props) => (props.current ? "bolder" : "normal")};
`;

const OLink = styled(Link)``;

export default withRouter(({ location: { pathname } }) => (
  <header>
    <List>
      <Item current={pathname === "/"}>
        <OLink to="/">MOVIE</OLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <OLink to="/tv">TV</OLink>
      </Item>
      <Item current={pathname === "/search"}>
        <OLink to="/search">SEARCH</OLink>
      </Item>
    </List>
  </header>
));
