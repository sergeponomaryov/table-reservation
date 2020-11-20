import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'

import SignIn from './pages/sign-in/sign-in.component'
import SignUp from './pages/sign-up/sign-up.component'

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/sign-in" component={SignIn}></Route>
      <Route path="/sign-up" component={SignUp}></Route>
      <Route exact path="/" render={() => true ? (<Redirect to='/sign-in'></Redirect>) : null}></Route>
    </Switch>
    </div>
  );
}

export default App;
