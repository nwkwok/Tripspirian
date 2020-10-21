import React from 'react';
import {BrowserRouter as Router, Route, Switch} from react-router-dom;
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login}/> 
        <Route exact path='/signup' component={Signup}/>
      </Switch>
    </Router>
  );
}

export default App;
