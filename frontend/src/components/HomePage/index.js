import './HomePage.css';
import nemesisBg from '../../assets/lol-nemesis-bg.jpg';
import lolCard from '../../assets/lol-card.png';
import valorantCard from '../../assets/valorant-card.png';
import apexCard from '../../assets/apex-card-bg.png'
import SignupForm from '../SignupFormModal/SignupForm';
import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadAllPals } from '../../store/pals';

function HomePage() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const league = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.Game.gameName === 'League of Legends';
  }));

  const valorant = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.Game.gameName === 'Valorant';
  }));

  const apex = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.Game.gameName === 'Apex Legends';
  }));

  console.log(apex)

  useEffect(() => {
    dispatch(loadAllPals());
  }, [dispatch])
  return (
    <>
      <div className="home-page-container">
        <div className='home-page-top-container'>
          <div className='home-page-top-content'>
            <div className='home-page-top-content-title'>Teammates On-Demand</div>
            <div className='home-page-top-content-subtitle'>Hire and play with the most engaging gamers, creators, and pros!</div>
            <button className='home-page-submit-button' onClick={() => setShowModal(true)}>Start now</button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <SignupForm />
                </Modal>
              )}
          </div>
          <div><img className='sliding-bg' src={nemesisBg}/></div>
        </div>
        <div className='home-page-middle-container'>
          <div className='home-page-middle-title'>100,000 ePals are ready to battle alongside you</div>
          <div className='home-page-middle-game-cards'>
            <div className='lol-card'>
              <div className='lol-card-text'>League of Legends</div>
              <div className='lol-card-epal-count'>{league.length} ePals</div>
              <img className='lol-card-img' src={lolCard}/>
            </div>
            <div className='valorant-card'>
              <div className='valorant-card-text'>Valorant</div>
              <div className='valorant-card-epal-count'>{valorant.length} ePals</div>
              <img className='valorant-card-img' src={valorantCard}/>
            </div>
          </div>
          <div className='home-page-middle-game-cards'>
            <div className='apex-card'>
              <div className='apex-card-text'>Apex</div>
              <div className='apex-card-epal-count'><span className='apex-count'>{apex.length}</span> ePals</div>
              <img className='apex-card-img' src={apexCard}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
