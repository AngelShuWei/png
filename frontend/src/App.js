import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormModal';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));  //if there is user, then set load to true
  }, [dispatch]);

  return ( //if isLoaded is true, then load all of the routes
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        </Switch>
      )}
    </>
  );
}

export default App;
