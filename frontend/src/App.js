import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {NavLink, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navigation from './components/Navigation';
import AllPalPage from './components/AllPalPage';
import CreatePalFormPage from './components/CreatePalFormPage';
import HomePage from './components/HomePage';
import { loadAllPals } from './store/pals';
import { loadAllGames } from './store/games';
import { loadAllGameStats } from './store/gameStats';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllPals());
    dispatch(loadAllGames());
    dispatch(loadAllGameStats());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));  //if there is user, then set load to true
  }, [dispatch]);

  return ( //if isLoaded is true, then load all of the routes
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage/>
          </Route>
          <Route exact path='/epals'>
            <AllPalPage/>
          </Route>
          <ProtectedRoute exact path='/applyepal'>
            <CreatePalFormPage/>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
