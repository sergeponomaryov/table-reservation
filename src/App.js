import './App.css';
import React from "react";
import {Switch, Route} from 'react-router-dom'

import SignIn from './components/sign-in.component'
import SignUp from './components/sign-up.component'
import useAuth from './hooks/useAuth'
import RestaurantName from './components/restaurant-name.component';
import Dashboard from './components/dashboard.component';

function App() {
  const user = useAuth();
  const {restaurantName} = user || {}

  return (
    <div className="App">
    <Switch>
      <Route path="/sign-up" component={SignUp}></Route>
      <Route exact path="/" render={
        () => user ?
        (restaurantName ? <Dashboard /> : <RestaurantName />)
        : (<SignIn />)
      }></Route>
    </Switch>
    </div>
  );
}

export default App;
