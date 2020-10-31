import React, { Fragment, useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//components
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Trips from './components/Trips'
import Events from './components/Events'
import EditEvent from './components/EditEvent'
import Modal from './components/Modal'

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  } 

async function isAuth(){
  try {
    const response = await fetch('http://localhost:3000/auth/is-verify', {
      method: 'GET',
      headers: {token: localStorage.token}
    });
    const parseResponse = await response.json()
    parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  } catch (err) {
    console.error(err.message);
  }
}

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/login' render=
              {props => 
                  !isAuthenticated ? 
                  (<Login {...props } setAuth={setAuth}/> ) : 
                  (<Redirect to='/dashboard' />)
                }
             /> 
            <Route exact path='/register' render=
              {props => 
                  !isAuthenticated ? 
                  (<Register {...props} setAuth={setAuth} />) : 
                  (<Redirect to='/login'/>)
                }
              />
            <Route exact path='/dashboard' render=
              {props => 
                  isAuthenticated ? 
                  (<Dashboard {...props} setAuth={setAuth}/>) : 
                  (<Redirect to='/login' />)
                }
              />
            <Route exact path='/trips' render=
              {props => 
                  isAuthenticated ? 
                  (<Trips {...props} setAuth={setAuth}/>) : 
                  (<Redirect to='/login' />)
                  }
              />
            <Route exact path='/events/:id' render=
              {props => 
                  isAuthenticated ? 
                  (<Events {...props} setAuth={setAuth}/>) : 
                  (<Redirect to='/login' />)
                  }
                />
            <Route exact path='/events/:id/update/' render=
              {props => 
                  isAuthenticated ? 
                  (<EditEvent {...props} setAuth={setAuth}/>) : 
                  (<Redirect to='/login' />)
                  }
                />
          </Switch>

        </div>
      </Router>
    </Fragment>
  );
}

export default App;
