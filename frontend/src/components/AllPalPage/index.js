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
      <div>
        {allPals.map(pal =>
          <div key={pal.id}>
            <img src={pal.palPic}/>
          </div>
        )}
      </div>
    </>
  );
}

export default AllPalPage;
