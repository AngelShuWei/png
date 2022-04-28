import './ProfileButton.css'
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="nav-user-profile-button" onClick= {openMenu}>
        {/* <i className= "fas fa-user-circle" /> */}
        <img className='nav-user-profile-img' src={user.profilePic || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'}/>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='profile-dropdown-top'>
            <img className='profile-dropdown-img' src={user.profilePic || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'}/>
            <div>{user.nickname}</div>
          </div>
          <div className='profile-dropdown-bottom'>
            <NavLink className='my-epal-button' exact to="/myepal">My ePal</NavLink>
            <NavLink className='edit-profile-button' exact to={`/profile/${sessionUser.id}/edit`}>Edit Profile</NavLink>
            <div className='logout-button' onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
