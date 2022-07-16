import React from "react";
import { Switch, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Login from "./Pages/Login";
export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
      </Switch>
    </div>
  );
}
