import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Title from "./containers/Title/Title";
import SigninPage from "./containers/pages/SigninPage";
import SignupPage from "./containers/pages/SignupPage";
import HomePage from "./containers/pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path={["/home", ""]} exact render={HomePage} />
        <Route path="/mypage" exact render={() => <Title title="MYPAGE!" />} />
        <Route path="/signin" exact render={SigninPage} />
        <Route path="/signup" exact render={SignupPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
