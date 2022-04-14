import './CreatePalFormPage.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory} from "react-router-dom";
import { createPal } from "../../store/pals";
import statesArr from './StatesArr';

function CreatePalFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [palPic, setPalPic] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(createPal({title, description, palPic, price, address, city, state, country}))
    .then(() => history.push('/'))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  }
  console.log(errors)

  return (
    <>
      <div className='pals-page-container'></div>
        <form className='form-container' onSubmit={handleSubmit}>
          <div>Bio</div>
          <div>Introduction</div>
          <label>Title</label>
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
          <label>Country
            <select className='input' value={country} onChange={e => setCountry(e.target.value)}>
              <option>United States</option>
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

export default CreatePalFormPage;
