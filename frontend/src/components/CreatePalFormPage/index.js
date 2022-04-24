import './CreatePalFormPage.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory} from "react-router-dom";
import { createPal } from "../../store/pals";
import { loadAllGames } from '../../store/games';
// import { loadAllPals } from '../../store/pals';
// import { loadAllUsers } from '../../store/users';
import statesArr from './StatesArr';

function CreatePalFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allGames = useSelector(state => Object.values(state.games));

  const [gameId, setGameId] = useState("");

  const [server, setServer] = useState("");
  const [rank, setRank] = useState("");
  const [position, setPosition] = useState("");
  const [style, setStyle] = useState("");
  const [gameStatsPic, setGameStatsPic] = useState(null);

  const nickname = useSelector(state => state.session.user.nickname);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [palPic, setPalPic] = useState(null);
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gameStatsPicLoaded, setGameStatsPicLoaded] = useState(false);
  const [palPicLoaded, setPalPicLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(createPal({ gameId, server, rank, position, style, gameStatsPic, nickname, title, description, palPic, price, address, city, state }))
    .then(() => history.push('/epals'))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  }

  const updateFileGameStats = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGameStatsPic(file);
      setGameStatsPicLoaded(true);
    }
  };

  const updateFilePalPic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPalPic(file);
      setPalPicLoaded(true);
    }
  };

  // console.log(gameId > 0)
  // console.log(server.length >= 1)
  // console.log(rank.length >= 1 )
  // console.log(position.length >= 1)
  // console.log(style.length >= 1)
  // console.log('gamestatpics', gameStatsPic !== null)
  // console.log(title.length >= 1)
  // console.log(description.length >= 1)
  // console.log('palpic', palPic !== null)
  // console.log(price >= 0)
  // console.log(address.length >= 1)
  // console.log(city.length >= 1)
  // console.log(state.length >= 1);

  const isFormValid = () => {
    return (gameId > 0 && server.length >= 1 && rank.length >= 1 && position.length >= 1 && style.length >= 1 && gameStatsPic !== null && title.length >= 1 && description.length >= 1 && palPic !== null && price >= 2 && address.length >= 1 && city.length >= 1 && state.length >= 1)
  }

  window.onbeforeunload = function() {
    return "Data will be lost if you refresh/leave the page, are you sure?";
  };
  // const objErrors = Object.assign({}, errors)

  useEffect(() => {
    dispatch(loadAllGames());
    // dispatch(loadAllUsers());
    // dispatch(loadAllPals());
  }, [dispatch]);

  return (
    <>
      <div className='create-pal-page-container'>
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='choose-a-game-div'>Choose a Game</div>
          <div className='game-select'>
            {allGames.map(game => ( //needs to be a label so can click on the image. otherwise only can click on circle
                <label htmlFor={game.id} key={game.id}>
                  <img className='game-img' src={game.gamePic}/>
                    <div>{game.gameName}
                      <input id={game.id}
                        name='game' //binds all the inputs to one name so now can only select one out of the options
                        type="radio"
                        value={game.id}
                        onChange={e => setGameId(e.target.value)}
                        // required
                      />
                    </div>
                </label>
            ))}
          </div>

          <div className='game-info'>Game Info</div>
          <label className='label-input'>Server</label>
            <input className='input'
              placeholder='Please enter server'
              type='text'
              value={server}
              onChange={e => setServer(e.target.value)}
            />

          <label className='label-input'>Rank</label>
            <input className='input'
              placeholder='Please enter rank'
              type='text'
              value={rank}
              onChange={e => setRank(e.target.value)}
            />

          <label className='label-input'>Position </label>
            <input className='input'
              placeholder='Please enter your position'
              type='text'
              value={position}
              onChange={e => setPosition(e.target.value)}
            />

          <label className='label-input'>Style</label>
            <input className='input'
              placeholder='Please enter your playstyle'
              type='text'
              value={style}
              onChange={e => setStyle(e.target.value)}
            />

          <div className='screenshot-label'>Screenshot</div>
          <div className='intro-description'>Showcase your skills by uploading a screenshot</div>
            <label className='screenshot-input-label' htmlFor="screenshot">
              {!gameStatsPic &&
                <i className="fa-lg fa-regular fa-image"/>
              }
              {gameStatsPicLoaded && <i className="fa-solid fa-check"/>}
            </label>
              {gameStatsPic &&
                <img className='loaded-img' src={URL.createObjectURL(gameStatsPic)}/>
              }
            <input className='input' id='screenshot'
              type="file"
              onChange={updateFileGameStats}
              style={{visibility:"hidden"}}
            />

          <div className='bio-div'>Bio</div>
          <label className='intro-label'>Introduction</label>
            <div className='intro-description'>Use an eye-catching one-liner to gain potential clients</div>
            <input className='input'
              placeholder='This sentence will be shown on the ePal list. 10 characters minimum.'
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

          <label className='label-input' id='detailed-description'>Detailed self-introduction</label>
              <textarea className='textarea' rows="4"
                placeholder='10 characters minimum'
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className='textarea-counter'>{description.length}/500</div>

          <label className='label-input'>Price</label>
            <input className='input' id='price'
              placeholder='The price range is 2.00-999.00 per game'
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />

          <div className='list-cover-label'>List Cover</div>
            <div className='intro-description'>Please upload your selfie here as the service cover image</div>
              <label className='list-cover-input-label' htmlFor="cover">
                {!palPic &&
                  <i className="fa-lg fa-regular fa-image"/>
                }
                  {palPicLoaded && <i className="fa-solid fa-check"/>}
              </label>
                {palPic &&
                  <img className='loaded-img' src={URL.createObjectURL(palPic)}/>
                }
              <input className='input' id='cover'
                type="file"
                onChange={updateFilePalPic}
                style={{visibility:"hidden"}}
                // required
              />

          <div className='location-div'>Location</div>
          <label className='label-input'>Address</label>
            <input className='input'
              placeholder='Please enter your address'
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          <label className='label-input'>City</label>
            <input className='input'
              placeholder='Please enter your city name'
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

          <label className='state-label'>State</label>
            <select className='input' value={state} onChange={e => setState(e.target.value)}>
              <option value="" disabled>
              Select a state
              </option>
              {statesArr.map(oneState => (
                <option
                  key={oneState.abbreviation}
                  value={oneState.abbreviation}
                >
                  {oneState.abbreviation}
                </option>
              ))}
            </select>
          <div className='line-div'/>
          {errors.map((error, idx) => <p className='errors' key={idx}>{error}</p>)}
          {isFormValid() ?
            <button className='submit-button' type='submit'>Submit</button> :
            <button className='disabled-button' type='submit' disabled={true}>Submit</button>
          }
        </form>
      </div>
    </>
  )
}

export default CreatePalFormPage;
