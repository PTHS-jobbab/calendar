import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SigninPage from "./containers/pages/SigninPage";
import SignupPage from "./containers/pages/SignupPage";
import HomePage from "./containers/pages/HomePage/HomePage";
import UserInfoPage from "./containers/pages/UserInfoPage";
import UserModifyPage from "./containers/pages/UserModifyPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/home" exact render={HomePage} />
          <Route path="/userinfo" exact render={UserInfoPage} />
          <Route path="/usermodify" exact render={UserModifyPage} />
          <Route path="/signin" exact render={SigninPage} />
          <Route path="/signup" exact render={SignupPage} />
          <Redirect from="" to="home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
