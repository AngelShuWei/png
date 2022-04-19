import './AllPalPage.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Link } from 'react-router-dom';
import { loadAllPals } from '../../store/pals';
import { loadAllReviews } from '../../store/reviews';

function AllPalPage() {
  const dispatch = useDispatch();
  const allPals = useSelector(state => Object.values(state.pals));
  const reviews = useSelector(state => Object.values(state.reviews));

  // const allReviews = reviews.filter(review => {
  //   return review.palId === palId;
  // });
  // console.log("====", reviews);

  // //calc to get avg ratings
  // let sum = 0;
  // allReviews.forEach(review => {
  //   sum += review.rating;
  // })
  // const avgSum = (sum / allReviews.length).toFixed(1);
  // //end of calc

  useEffect(() => {
    dispatch(loadAllPals());
    dispatch(loadAllReviews());
  }, [dispatch])

  return (
    <>
      <div className='pals-page-container'>
        <div className='for-you'>For You</div>
          <div className='pals-card-list'>
            {allPals.map(pal =>
              <div className='pal-card' key={pal.id}>
                <Link to={`/epals/${pal.id}`}>
                  <div className='pal-card-top'>
                    <div className='pal-card-img'><img className='pal-card-img-size' src={pal.palPic}/></div>
                    <div className='pal-card-gamename'>
                      {pal.Game?.gameName}
                      <div className='shadow-arrow'/>
                    </div>
                    <div className='pal-card-nickname'>{pal.nickname}</div>
                    <div className='pal-card-rank-position'>
                      <div className='pal-card-rank'>{pal.rank}</div>
                      <div className='pal-card-position'>{pal.position}</div>
                    </div>
                    <div className='pal-card-title'>{pal.title}</div>
                  </div>
                  <div>
                    <span className='pal-card-footer'>{pal.price}/Game</span>
                    {/* <span>
                      {reviews.map(review => (
                        review.rating
                      ))}
                    </span> */}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
    </>
  );
}

export default AllPalPage;
