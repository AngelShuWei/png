import './HomePage.css';
import fundyBg from '../../assets/fundy-bg.jpg';
import puffyBg from '../../assets/puffy-bg.jpg';
import nemesisBg from '../../assets/lol-nemesis-bg.jpg';
import vkimmBg from '../../assets/vkimm-bg.jpg';
import IMLSBg from '../../assets/IMLS-bg.jpg';
import supCaitlinBg from '../../assets/supcaitlin-bg.jpg';
import tilterellaBg from '../../assets/tilterella-bg.jpg';
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

  const sessionUser = useSelector(state => state.session);

  const allPals = useSelector(state => Object.values(state.pals));

  const league = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.Game.gameName === 'League of Legends';
  }));

  const valorant = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.Game.gameName === 'Valorant';
  }));

  const apex = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.Game.gameName === 'Apex Legends';
  }));

  const [imgNum, setImgNum] = useState(0);

  const imgBg = [fundyBg, puffyBg, nemesisBg, vkimmBg, IMLSBg, supCaitlinBg, tilterellaBg];

  // useEffect(() => {
  //   dispatch(loadAllPals());
  // }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      setImgNum(e => {
        if (e + 1 === 7) {
          e = 0
          return e
        } else {
          return e + 1
        }
      })
    }, 3500)
    return () => clearInterval(interval)
  }, []);

  return (
    <>
      <div className="home-page-container">
        <div className='home-page-top-container'>
          <div className='home-page-top-content'>
            <div className='home-page-top-content-title'>Teammates On-Demand</div>
            <div className='home-page-top-content-subtitle'>Hire and play with the most engaging gamers, creators, and pros!</div>
            {!sessionUser.user &&
            <button className='home-page-submit-button' onClick={() => setShowModal(true)}>Start now</button> }
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <SignupForm />
                </Modal>
              )}
          </div>
          <div className='slider-container'>
            <div className='slider-imgs'>
              <img className='slides' src={imgBg[imgNum]}/>
              {/* <img className='sliding-bg' src={fundyBg}/>
              <img className='sliding-bg' src={puffyBg}/>
              <img className='sliding-bg' src={nemesisBg}/>
              <img className='sliding-bg' src={vkimmBg}/>
              <img className='sliding-bg' src={IMLSBg}/>
              <img className='sliding-bg' src={supCaitlinBg}/>
              <img className='sliding-bg' src={tilterellaBg}/>
              */}
            </div>
          </div>
        </div>
        <div className='home-page-middle-container'>
          <div className='mission-statement-container'>
            <div className='mission-statement'>"Our mission here at pals n' gamers is to ensure that you never battle alone. Need a coach or pal to bring your gameplay to the next level? Look no further because png is the place for you. Welcome to your new battleground."</div>
          </div>
          <div className='home-page-middle-title'> {allPals.length} ePals are ready to battle alongside you</div>
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
