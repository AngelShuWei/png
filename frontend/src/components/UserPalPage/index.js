import './UserPalPage.css';
import { NavLink, Route, Link, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPals } from '../../store/pals';
// import { loadAllReviews } from '../../store/reviews';
// import { loadAllGames } from '../../store/games';
// import { loadAllUsers } from '../../store/users';
import EditDeleteButton from './PalEditDeleteButton';

function UserPalPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const pals = useSelector(state => Object.values(state.pals));

  const userPals = pals.filter(pal => pal.userId === sessionUser.id);


  // useEffect(() => {
  //   dispatch(loadAllReviews());
  //   dispatch(loadAllGames());
  //   dispatch(loadAllUsers());
  //   dispatch(loadAllPals());
  // }, [dispatch]);

  return (
    <>
        <div className='user-pal-page-container'>
          <div className='user-pal-my-services-text'>My Services</div>
          {userPals.map(userPal => (
            <div key={userPal.id}>
              <Link to={`/epals/${userPal.id}`}>
                <div className='user-pal-game-container'>
                  <img className='user-pal-img' src={userPal.Game.gamePic}></img>
                  <div className='user-pal-gamename'>{userPal.Game.gameName}</div>
                </div>
              </Link>
              {/* <EditDeleteButton game={userPal}/> */}
            </div>
          ))}
        </div>
    </>
  )
}

export default UserPalPage;
