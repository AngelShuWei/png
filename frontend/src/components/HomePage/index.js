import './HomePage.css';
import nemesisBg from '../../assets/lol-nemesis-bg.jpg';
import lolCard from '../../assets/lol-card.png';
import valorantCard from '../../assets/valorant-card.png';

function HomePage() {
  return (
    <>
      <div className="home-page-container">
        <div className='home-page-top-container'>
          <div className='home-page-top-content'>
            <div className='home-page-top-content-title'>Teammates On-Demand</div>
            <div className='home-page-top-content-subtitle'>Hire and play with the most engaging gamers, creators, and pros!</div>
            <button className='home-page-submit-button'>Start now</button>
          </div>
          <div><img className='sliding-bg' src={nemesisBg}/></div>
        </div>
        <div className='home-page-middle-container'>
          <div className='home-page-middle-title'>100,000 ePals are ready to battle alongside you</div>
          <div className='home-page-middle-game-cards'>
            <div className='lol-card'>
              <div className='lol-card-text'>League of Legends</div>
              <div></div>
              <img className='lol-card-img' src={lolCard}/>
            </div>
            <div className='valorant-card'>
              <div className='valorant-card-text'>Valorant</div>
              <div></div>
              <img className='valorant-card-img' src={valorantCard}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
