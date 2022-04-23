import './Navigation.css';
import pngLogo from '../../assets/png-logo.png'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation({isLoaded}) {
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);

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
    <nav className='navbar-container'>
      <div className='navbar-content'>
        <NavLink className='navlink-home' exact to="/"><img className='png-logo' id='navbar' src={pngLogo}/></NavLink>
        <div><NavLink className='navlink-ePal' exact to="/epals">ePal</NavLink></div>
      </div>
      <div className='navbar-content'>
        {sessionUser &&
          <div>
            <NavLink className='navlink-apply-ePal' exact to="/applyepal">Become an ePal</NavLink>
          </div>
        }
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
