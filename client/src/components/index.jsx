import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import actions from "../store/actions/channels";

import Home from "./home";
import Channel from "./channel";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchAllChannels());
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/:name">
        <Channel />
      </Route>
    </Switch>
  );
}

export default App;
