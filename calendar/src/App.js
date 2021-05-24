import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Title from "./containers/Title/Title";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/home" exact render={() => <Title title="HOME!" />} />
        <Route path="/mypage" exact render={() => <Title title="MYPAGE!" />} />
        <Route path="/signin" exact render={() => <Title title="SIGNIN!" />} />
        <Route path="/signup" exact render={() => <Title title="SIGNUP!" />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
