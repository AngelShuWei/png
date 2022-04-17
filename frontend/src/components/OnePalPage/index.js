import './OnePalPage.css'
import userPalBg from '../../assets/user-pal-bg.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link} from "react-router-dom";
import { useEffect } from 'react';
import { loadAllUsers } from '../../store/users';

function OnePalPage() {
  const dispatch = useDispatch();
  const { palId } = useParams();

  const onePal = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.id === +palId;
  }));

  const allUsers = useSelector(state => Object.values(state.users).filter(user => {
    return  user.id === onePal[0].userId;
  }));

  return (
    <>
      <div className='pal-page-container'>
        <div className='one-pal-top'>
          <div><img className='one-pal-bg' src={userPalBg}></img></div>
          <div className='one-pal-top-content'></div>
        </div>
        <div className='one-pal-left-container'>
          <div className='one-pal-left-content'>
            <img className='one-pal-cover-pic' src={onePal[0].palPic}></img>
            <img className='one-pal-avatar-pic' src={allUsers[0]?.profilePic}></img>
            <div className='one-pal-nickname'>{allUsers[0].nickname}</div>
            <div className='one-pal-bio-text'>Bio:</div>
            <div className='one-pal-bio'>{allUsers[0].bio}</div>
          </div>
        </div>
        <div className='one-pal-right-container'>
          <div className='one-pal-services'>Services</div>
          <div className='one-pal-right-content'>
            <div className='one-pal-service-list'></div>
            <div className='one-pal-service-info'></div>
            <div className='one-pal-game-details'></div>
            <div className='one-pal-reviews'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OnePalPage;
