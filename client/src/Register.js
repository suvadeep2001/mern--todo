import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from "react-router-dom";

function Register() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setRedirect(true);
      });
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (
    <form action="" onSubmit={e => registerUser(e)}>
      <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  

    </form>
  );
}

export default Register;