import './App.css';
import React from "react";
import {Switch, Route} from 'react-router-dom'

import SignIn from './pages/sign-in/sign-in.component'
import SignUp from './pages/sign-up/sign-up.component'
import useAuth from './hooks/useAuth'
import RestaurantName from './pages/restaurant-name/restaurant-name.component';
import Management from './pages/management/management.component';

function App() {
  const user = useAuth();
  const {restaurantName} = user || {}

  return (
    <div className="App">
    <Switch>
      <Route path="/sign-up" component={SignUp}></Route>
      <Route exact path="/" render={
        () => user ?
        (restaurantName ? <Management /> : <RestaurantName />)
        : (<SignIn />)
      }></Route>
    </Switch>
    </div>
  );
}

export default App;
