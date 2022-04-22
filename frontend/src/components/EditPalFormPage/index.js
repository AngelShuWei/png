import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory, useParams} from "react-router-dom";
import { loadAllPals, updatePal } from "../../store/pals";
import { loadAllGames } from '../../store/games';
import statesArr from '../CreatePalFormPage/StatesArr'

function EditPalFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { palId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  // let pal;
  // let allGames;

  // let gameId;
  // let setGameId;

  // let server;
  // let setServer;

  // let rank;
  // let setRank;

  // let position;
  // let setPosition;
  // let style;
  // let setStyle;
  // let gameStatsPic;
  // let setGameStatsPic;

  // let nickname;
  // let title;
  // let setTitle;
  // let description;
  // let setDescription;
  // let palPic;
  // let setPalPic;
  // let price;
  // let setPrice;
  // let address;
  // let setAddress;
  // let city;
  // let setCity;
  // let state;
  // let setState;
  // let errors;

  // if (isLoaded) {
  // }
  const pal = useSelector(state => state.pals[palId]);
  const allGames = useSelector(state => Object.values(state.games));

  const [gameId, setGameId] = useState(pal?.Game?.id);

  const [server, setServer] = useState(pal?.server);
  const [rank, setRank] = useState(pal?.rank);
  const [position, setPosition] = useState(pal?.position);
  const [style, setStyle] = useState(pal?.style);
  const [gameStatsPic, setGameStatsPic] = useState(pal?.gameStatsPic);

  const nickname = useSelector(state => state.session.user.nickname);
  const [title, setTitle] = useState(pal?.title);
  const [description, setDescription] = useState(pal?.description);
  const [palPic, setPalPic] = useState(pal?.palPic);
  const [price, setPrice] = useState(pal?.price);
  const [address, setAddress] = useState(pal?.address);
  const [city, setCity] = useState(pal?.city);
  const [state, setState] = useState(pal?.state);
  const [gameStatsPicLoaded, setGameStatsPicLoaded] = useState(true);
  const [palPicLoaded, setPalPicLoaded] = useState(true);
  const [errors, setErrors] = useState([]);

  console.log('gamestatspic----', gameStatsPic);
  console.log('palpic====', palPic)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(updatePal({ id:pal.id, gameId, server, rank, position, style, gameStatsPic, nickname, title, description, palPic, price, address, city, state }))
    .then(() => history.push(`/epals/${palId}`))
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

  const isFormValid = () => {
    return (gameId > 0 && server.length >= 1 && rank.length >= 1 && position.length >= 1 && style.length >= 1 && gameStatsPic !== null && title.length >= 1 && description.length >= 1 && palPic !== null, price >= 2 && address.length >= 1 && city.length >= 1 && state.length >= 1);
  }

  useEffect(() => {
    dispatch(loadAllPals())
    dispatch(loadAllGames())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {isLoaded && (
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
                        defaultChecked={game.id === gameId}
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
                {gameStatsPic ?
                  <img className='loaded-img' src={gameStatsPic}/> :
                  <img className='loaded-img' src={URL.createObjectURL(gameStatsPic)}/>
                }
              <input className='input' id='screenshot'
                placeholder='Showcase your skills by uploading a screenshot'
                type='file'
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
              <div className='textarea-counter'>{description?.length}/500</div>

          <label className='label-input'>Price</label>
            <input className='input' id='price'
              placeholder='The price range is 2.00-999.00'
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
                  <img className='loaded-img' src={palPic}/>
                }
                <input className='input'
                  placeholder='Please upload your selfie here as the service cover image'
                  type="file" id='cover'
                  onChange={updateFilePalPic}
                  style={{visibility:"hidden"}}
                />

          <div className='location-div'>Location</div>
          <label className='label-input'>Address</label>
            <input className='input'
              placeholder='Please enter your address'
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          <label className='label-input'>City </label>
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
      )}
    </>
  )
}
export default EditPalFormPage;
