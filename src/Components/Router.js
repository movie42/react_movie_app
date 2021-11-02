import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/HomeContainer";
import TV from "Routes/TVContainer";
import Search from "Routes/SearchContainer";
import Detail from "Routes/DetailContainer";

const Routes = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/search" exact component={Search} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/tv/:id" component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default Routes;
