import './App.css';
import React from "react";
import {Switch, Route} from 'react-router-dom'

import SignIn from './components/sign-in'
import SignUp from './components/sign-up'
import useAuth from './hooks/useAuth'
import RestaurantName from './components/restaurant-name';
import Dashboard from './components/dashboard';

function App() {
  const user = useAuth();
  const {restaurantName} = user || {}

  return (
    <div className="App">
    <Switch>
      <Route path="/sign-up" component={SignUp}></Route>
      <Route path="/" render={
        () => user ?
        (restaurantName ? <Dashboard /> : <RestaurantName />)
        : (<SignIn />)
      }></Route>
    </Switch>
    </div>
  );
}

export default App;
