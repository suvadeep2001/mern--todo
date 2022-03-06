import './App.css';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {useState,useEffect} from 'react';
import Register from "./Register";
import UserContext from "./UserContext";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [email,setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
      .then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => setEmail(''));
  }

  return (
    <UserContext.Provider value={{email,setEmail}}>
      <BrowserRouter>
        <nav>
          <Link to={'/'}><button type="button" class="btn btn-primary">Home</button></Link>
          {!email && (
            <>
              <Link to={'/login'}><button type="button" class="btn btn-success">Login</button></Link>
              <Link to={'/register'}><button type="button" class="btn btn-info">Register</button></Link>
            </>
          )}
          {!!email && (
            <a onClick={e => {e.preventDefault();logout();}}><button type="button" class="btn btn-dark">Logout</button></a>
          )}
        </nav>
        <main>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/login'} component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
