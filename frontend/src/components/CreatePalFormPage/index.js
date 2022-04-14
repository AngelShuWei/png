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

  return (
    <>
      <div className='pals-page-container'></div>
        <form className='form-container' onSubmit={handleSubmit}>
          <div>Bio</div>
          <div>Introduction</div>
          <label>Title</label>
          {/* <p className='errors'>{errors[0]}</p> */}
          <input className='input'
            placeholder='This sentence will be shown on the ePal list. 10 characters minimum.'
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label>Detailed self-introduction</label>
          {/* <p className='errors'>{errors[1]}</p> */}
          <textarea className='input'
            placeholder='10 characters minimum'
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label>Price</label>
          {/* <p className='errors'>{errors[2]}</p> */}
          <input className='input'
            placeholder='The price range is 2.00-999.999'
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <label>Address</label>
          {/* <p className='errors'>{errors[3]}</p> */}
          <input className='input'
            placeholder='Please enter your address'
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <label>City</label>
          {/* <p className='errors'>{errors[4]}</p> */}
          <input className='input'
            placeholder='Please enter your city name'
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <label>State
            <select className='input' value={state} onChange={e => setState(e.target.value)}>
              {statesArr.map(oneState => (
                <option
                  key={oneState.name}
                  value={oneState.name}
                >
                  {oneState.abbreviation}
                </option>
              ))}
            </select>
          </label>
          <label>Country
          {/* <p className='errors'>{errors[6]}</p> */}
            <select className='input' value={country} onChange={e => setCountry(e.target.value)}>
              <option>United States</option>
            </select>
          </label>
          <label>List Cover
            {/* <p className='errors'>{errors[7]}</p> */}
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
