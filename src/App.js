import './App.css';
import React, {useContext} from "react";
import { Context } from "./store";
import {Switch, Route} from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import SignIn from './components/sign-in'
import SignUp from './components/sign-up'
import useAuth from './hooks/useAuth'
import RestaurantName from './components/restaurant-name';
import Dashboard from './components/dashboard';

function App() {
  const user = useAuth();
  const [state, dispatch] = useContext(Context);
  const {firebaseLoading, restaurantName} = state;

  return (
    <div className="App">
    { firebaseLoading ?
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
    <CircularProgress />
    </Grid>
    :
    <Switch>
      <Route path="/sign-up" component={SignUp}></Route>
      <Route path="/" render={
        () => user ?
        (restaurantName ? <Dashboard /> : <RestaurantName />)
        : (<SignIn />)
      }></Route>
    </Switch>
    }
    </div>
  );
}

export default App;
