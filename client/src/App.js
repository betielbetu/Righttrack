import "./App.css";
import Login from "./Login/login";
import Logout from "./Login/logout";
import Register from "./Register/register";
import Food from "./Food/food";
import AddFood from "./Food/AddFood"

import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}>
          <Login />
        </Route>
        
          <Route path="/register" component={Register}>
            <Register />
          </Route>
          <Route path="/food" component={Food}>
            <Food />
          </Route>
          <Route path="/addfood" component={AddFood}>
            <AddFood />
          </Route>
          <Route exact path="/logout" component={Logout}>
          <Logout />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
