import './AllPalPage.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Link } from 'react-router-dom';
import { loadAllPals } from '../../store/pals';

function AllPalPage() {
  const dispatch = useDispatch();

  const allPals = useSelector(state => Object.values(state.pals));

  useEffect(() => {
    dispatch(loadAllPals());
  }, [dispatch])

  return (
    <>
      <div className='pals-page-container'>
        <div className='for-you'>For You</div>
          <div className='pals-card-list'>
            {allPals.map(pal =>
              <div className='pal-card' key={pal.id}>
                <img className='pal-card-img' src={pal.palPic}/>
              </div>
            )}
          </div>
        </div>
    </>
  );
}

export default AllPalPage;
