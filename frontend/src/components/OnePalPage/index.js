import './OnePalPage.css'
import userPalBg from '../../assets/user-pal-bg.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link} from "react-router-dom";

function OnePalPage() {
  const { palId } = useParams();

  const onePal = useSelector(state => Object.values(state.pals).filter(pal => {
    return pal.id === +palId;
  }));

  console.log(onePal)

  const allUsers = useSelector(state => Object.values(state.users).filter(user => {
    return user.id === onePal[0].userId;
  }));

  return (
    <>
      <div className='pal-page-container'>
        <div className='one-pal-top'>
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
            <div className='one-pal-services'>Games</div>
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
                Review(s)
              </div>
              <div className='one-pal-user-reviews'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OnePalPage;
