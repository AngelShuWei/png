import './UserPalPage.css';
import { NavLink, Route, Link, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditDeleteButton from './EditDeleteButton';

function UserPalPage() {
  const sessionUser = useSelector(state => state.session.user);
  const pals = useSelector(state => Object.values(state.pals));

  const userPals = pals.filter(pal => pal.userId === sessionUser.id);

  return (
    <>
      <div className='pals-page-container'>
        {userPals.map(userPal => (
          <div key={userPal.id}>
            <img className='user-pal-img' src={userPal.palPic}></img>
            <EditDeleteButton game={userPal}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserPalPage;
