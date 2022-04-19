import './OnePalPage.css'
import userPalBg from '../../assets/user-pal-bg.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link} from "react-router-dom";
import { loadAllReviews } from '../../store/reviews';
import { loadAllGames } from '../../store/games';
import { loadAllPals } from '../../store/pals';
import { loadAllUsers } from '../../store/users';
import ReviewFormModel from '../ReviewFormModal';
import EditDeleteButton from './EditDeleteButton';

function OnePalPage() {
  const dispatch = useDispatch();
  const { palId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const pals = useSelector(state => Object.values(state.pals));
  const users = useSelector(state => Object.values(state.users));
  const reviews = useSelector(state => Object.values(state.reviews));

  let onePal = [];
  let allUsers = [];
  let allReviews = [];

  if (isLoaded) { //need conditional because only when page is loaded then we can get the filters, otherwise can break page if trying to stuff without stuff being there in state
    onePal = pals.filter(pal => {
      return pal.id === +palId;
    });

    allUsers = users.filter(user => {
      return user.id === onePal[0].userId;
    });

    allReviews = reviews.filter(review => {
      return review.palId === +palId;
    });
  };

  //calculation to get avg ratings
  let sum = 0;
  allReviews.forEach(review => {
    sum += review.rating;
  })
  const avgSum = (sum / allReviews.length).toFixed(1);
  // end of calculation

  console.log(allReviews)

  useEffect(() => { //eliminates possibilities of race conditions because need to complete all dispatches before page will load
    dispatch(loadAllReviews())
    .then(() => dispatch(loadAllGames()))
    .then(() => dispatch(loadAllUsers()))
    .then(() => dispatch(loadAllPals()))
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {isLoaded && (
      <div className='pal-page-container'>
        <div className='one-pal-top'>
            <Link to='/epals'><div className='back'> {'<'} Back </div></Link>
          <div><img className='one-pal-bg' src={userPalBg}/></div>
          <div className='one-pal-top-content'></div>
        </div>
        <div className='one-pal-bottom'>
          <div className='one-pal-left-container'>
            <div className='one-pal-left-content'>
              <img className='one-pal-cover-pic' src={onePal[0]?.palPic}></img>
              <img className='one-pal-avatar-pic' src={allUsers[0]?.profilePic}></img>
              <div className='one-pal-nickname'>{allUsers[0]?.nickname}</div>
              <div className='one-pal-user-info'>
                <div className='one-pal-bio-text'>Bio:</div>
                <div className='one-pal-bio'>{allUsers[0]?.bio}</div>
              </div>
            </div>
          </div>
          <div className='one-pal-right-container'>
            <div className='one-pal-games'>Games</div>
            <div className='one-pal-service-list'><img className='service-list-img' src={onePal[0].Game.gamePic}/></div>
            <div className='one-pal-game-content'>
              <div className='one-pal-service-info'>{onePal[0]?.Game.gameName}</div>
              <div className='one-pal-long-description'>{onePal[0]?.description}</div>
              <div className='one-pal-game-stat'><img className='one-pal-game-stat-img' src={onePal[0]?.gameStatsPic}/></div>
            </div>
            <div className='one-pal-service-details-container'>
              <div className='one-pal-service-details-content'>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAD1JREFUKFNjZCARMILUHzn87DCItrGVsoXy/2Mzx8ZWipE8DaS4CmwDKYA8J5HsaZKdRLIGkp1EsgZSnAQAmkIwDRyYvHUAAAAASUVORK5CYII='/>
                <span className='one-pal-service-details-text'>Service Details</span>
              </div>
              <div className='one-pal-service-content'>
                <div className='one-pal-service-content-text'>
                  <div className='one-pal-rank'>
                    <div className='one-pal-rank-text'>Rank</div>
                    <div>{onePal[0]?.rank}</div>
                  </div>
                  <div className='one-pal-server'>
                    <div className='one-pal-server-text'>Server</div>
                    <div>{onePal[0]?.server}</div>
                  </div>
                  <div className='one-pal-style'>
                    <div className='one-pal-style-text'>Style</div>
                    <div>{onePal[0]?.style}</div>
                  </div>
                  <div className='one-pal-position'>
                    <div className='one-pal-position-text'>Position</div>
                    <div>{onePal[0]?.position}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='one-pal-reviews-container'>
              <div className='one-pal-reviews-details'>
                <i className="fa-xs fa-solid fa-star"/>
                {avgSum} · {allReviews.length} Review(s)
                <ReviewFormModel/>
              </div>
              <div className='one-pal-user-reviews'></div>
                {allReviews.map(review => (
                  <div className='one-pal-user-review-container' key={review.id}>
                    <img className='one-pal-user-review-profile-img' src={review.User.profilePic}/>
                    <span className='one-pal-user-review-user-nickname'>{review.User.nickname}</span>
                    <span className='one-pal-user-review-user-date'> · {review.createdAt}</span>
                    <div className='one-pal-user-review-user-rating'>
                      <i className="fa-xs fa-solid fa-star"/> {review.rating.toFixed(1)} score
                    </div>
                    <div className='one-pal-user-review-user-review'>{review.content}</div>
                    <EditDeleteButton review={review} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default OnePalPage;
