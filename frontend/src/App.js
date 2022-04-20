import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {NavLink, Route, Switch} from 'react-router-dom';
import * as sessionActions from "./store/session";
// import { loadAllPals } from './store/pals';
// import { loadAllGames } from './store/games';
// import { loadAllUsers } from './store/users';
// import { loadAllReviews } from './store/reviews';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navigation from './components/Navigation';
import AllPalPage from './components/AllPalPage';
import CreatePalFormPage from './components/CreatePalFormPage';
import HomePage from './components/HomePage';
import OnePalPage from './components/OnePalPage';
import UserPalPage from './components/UserPalPage';
import EditPalFormPage from './components/EditPalFormPage';
import EditReviewForm from './components/EditReviewFormModal/EditReviewForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // dispatch(loadAllGames());
    // dispatch(loadAllUsers());
    // dispatch(loadAllPals());
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
          <ProtectedRoute exact path='/epals/:palId'>
            <OnePalPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/myepal'>
            <UserPalPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/myepal/:palId/edit'>
            <EditPalFormPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/applyepal'>
            <CreatePalFormPage/>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
