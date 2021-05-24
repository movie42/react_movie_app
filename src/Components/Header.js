import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const List = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: red;
  padding: 10px 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: white;
  }
  width: 80px;
  height: 90%;
  border-radius: 10px;
  font-size: 1.5em;
  color: ${(props) => (props.current ? "white" : "inherit")};
  font-weight: ${(props) => (props.current ? "bolder" : "normal")};
`;

const OLink = styled(Link)``;

const Header = withRouter(({ location: { pathname } }) => (
  <header>
    <List>
      <Item current={pathname === "/"}>
        <OLink to="/">영화</OLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <OLink to="/tv">TV</OLink>
      </Item>
      <Item current={pathname === "/search"}>
        <OLink to="/search">검색</OLink>
      </Item>
    </List>
  </header>
));

export default Header;
