import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import Favorites from "./pages/Favorites";

const PrivateRoute = ({ children, ...rest }) => {
  const token = useSelector((state) => state.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <PrivateRoute exact path="/feed">
          <Feed />
        </PrivateRoute>
        <PrivateRoute exact path="/favs">
          <Favorites />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
