import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import AllPalPage from './components/AllPalPage'
import * as sessionActions from "./store/session";
import { loadAllPals } from './store/pals';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllPals());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));  //if there is user, then set load to true
  }, [dispatch]);

  return ( //if isLoaded is true, then load all of the routes
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/epals'>
            <AllPalPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
