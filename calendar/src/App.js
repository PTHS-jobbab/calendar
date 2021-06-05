import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Title from "./containers/Title/Title";
import SigninPage from "./containers/pages/SigninPage";
import SignupPage from "./containers/pages/SignupPage";
import HomePage from "./containers/pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/home" exact render={HomePage} />
          <Route
            path="/mypage"
            exact
            render={() => <Title title="MYPAGE!" />}
          />
          <Route path="/signin" exact render={SigninPage} />
          <Route path="/signup" exact render={SignupPage} />
          <Redirect from="" to="home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
