import './App.css';
import React, { useContext } from "react";
import {Switch, Route, Redirect} from 'react-router-dom'

import SignIn from './pages/sign-in/sign-in.component'
import SignUp from './pages/sign-up/sign-up.component'
import useAuth from './hooks/useAuth'

function App() {
  const user = useAuth();
  console.log(user);
  // const {managerName, email} = user || {}

  return (
    <div className="App">
      {/* {user ?
      `Welcome ${user.managerName}`
      : "nobody"} */}
    <Switch>
      <Route path="/sign-in" component={SignIn}></Route>
      <Route path="/sign-up" component={SignUp}></Route>
      <Route exact path="/" render={() => true ? (<Redirect to='/sign-in'></Redirect>) : null}></Route>
    </Switch>
    </div>
  );
}

export default App;
