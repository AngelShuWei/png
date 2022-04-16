import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({isLoaded}) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) { //if there is a sessionUser
    sessionLinks = (
      <ProfileButton user={sessionUser} /> //only render the profile Button when there is a session user
    );
  } else { //else have these links in the navbar instead
    sessionLinks = (
      <>
        <LoginFormModal/>
        <SignupFormModal/>
      </>
    );
  }

  return (
    <nav className='navbar-c'>
      <div>
        <NavLink className='navlink-home' exact to="/">Home</NavLink>
      </div>
      <div>
        <NavLink className='navlink-ePal' exact to="/epals">ePal</NavLink>
      </div>
      <div>
        <NavLink className='navlink-my-ePal' exact to="/myepal">My ePal</NavLink>
      </div>
      <div>
        <NavLink className='navlink-apple-ePal' exact to="/applyepal">Become an ePal</NavLink>
      </div>
        {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
