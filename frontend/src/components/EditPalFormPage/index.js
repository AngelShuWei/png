import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory, useParams} from "react-router-dom";
import { updatePal } from "../../store/pals";
import statesArr from '../CreatePalFormPage/StatesArr'

function EditPalFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { palId } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const pal = useSelector(state => state.pals[palId]);
  const allGames = useSelector(state => Object.values(state.games));

  const [gameId, setGameId] = useState(pal.Game.id);

  const [server, setServer] = useState(pal.server);
  const [rank, setRank] = useState(pal.rank);
  const [position, setPosition] = useState(pal.position);
  const [style, setStyle] = useState(pal.style);
  const [gameStatsPic, setGameStatsPic] = useState(pal.gameStatsPic);

  const nickname = useSelector(state => state.session.user.nickname);
  const [title, setTitle] = useState(pal.title);
  const [description, setDescription] = useState(pal.description);
  const [palPic, setPalPic] = useState(pal.palPic);
  const [price, setPrice] = useState(pal.price);
  const [address, setAddress] = useState(pal.address);
  const [city, setCity] = useState(pal.city);
  const [state, setState] = useState(pal.state);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(updatePal({ id:pal.id, gameId, server, rank, position, style, gameStatsPic, nickname, title, description, palPic, price, address, city, state }))
    .then(() => history.push('/epals'))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  }

  return (
    <>
      <div className='pals-page-container'></div>
        <form className='form-container' onSubmit={handleSubmit}>
          <div>Games</div>
          <div>Choose a Game
            {allGames.map(game => (  //want gameId because we will reference that in the backend
              <label htmlFor={game.id} key={game.id}>
                <div>{game.gameName}</div>
                <div>
                  <img src={game.gamePic}/>
                    <input id={game.id}
                      name='game' //binds all the inputs to one name so now can only select one out of the options
                      type="radio"
                      value={game.id} //radio's button's value
                      defaultChecked={game.id === gameId}
                      onChange={e => setGameId(e.target.value)}
                    />
                </div>
              </label>
            ))}
          </div>
          <div>Game Info</div>
          <label>Server
            <input className='input'
              placeholder='Please enter server'
              type='text'
              value={server}
              onChange={e => setServer(e.target.value)}
            />
          </label>
          <label>Rank
            <input className='input'
              placeholder='Please enter rank'
              type='text'
              value={rank}
              onChange={e => setRank(e.target.value)}
            />
          </label>
          <label>Position
            <input className='input'
              placeholder='Please enter your position'
              type='text'
              value={position}
              onChange={e => setPosition(e.target.value)}
            />
          </label>
          <label>Style
            <input className='input'
              placeholder='Please enter your playstyle'
              type='text'
              value={style}
              onChange={e => setStyle(e.target.value)}
            />
          </label>
          <label>Screenshot
            <input className='input'
              placeholder='Showcase your skills by uploading a screenshot'
              type='text'
              value={gameStatsPic}
              onChange={e => setGameStatsPic(e.target.value)}
            />
          </label>
          <div>Bio</div>
          <label>Introduction</label>
            <div>Use an eye-catching one-liner to gain potential clients</div>
            <input className='input'
              placeholder='This sentence will be shown on the ePal list. 10 characters minimum.'
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          <label>Detailed self-introduction
            <textarea className='textarea' rows="3"
              placeholder='10 characters minimum'
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <p className='textarea-counter'>{description.length}/500</p>
          </label>
          <label>Price
            <input className='input'
              placeholder='The price range is 2.00-999.999'
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </label>
          <label>Address</label>
            <input className='input'
              placeholder='Please enter your address'
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          <label>City
            <input className='input'
              placeholder='Please enter your city name'
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>State
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
          </label>
          <label>List Cover
            <input className='input'
              placeholder='Please upload your selfie here as the service cover image'
              type="text"
              value={palPic}
              onChange={e => setPalPic(e.target.value)}
            />
          </label>
          {errors.map((error, idx) => <p className='errors' key={idx}>{error}</p>)}
          <button type='submit'>Submit</button>
        </form>
    </>
  )
}
export default EditPalFormPage;