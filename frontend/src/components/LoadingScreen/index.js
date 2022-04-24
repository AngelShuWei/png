import './LoadingScreen.css';
import loadingKirby from '../../assets/loading-kirby.gif';
import loadingText from '../../assets/loading-text.gif';

function LoadingScreen () {
  return (
    <div className='loading-screen-container'>
      <div><img className='loading-text' src={loadingText} alt='loading'/></div>
      <div><img className='loading-kirby-img' src={loadingKirby} alt='loading'/></div>
    </div>
  )
}

export default LoadingScreen;
