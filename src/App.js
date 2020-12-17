import logo from './logo.svg';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import './App.css';
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./Home"
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
