import './SignupForm.css';
import ePalLogo from '../../assets/epal-logo.png'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom';

function SignupForm({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(sessionActions.signup({ email, username, password, nickname, bio, gender, profilePic }))
      .then(() => history.push('/epals'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(file);
  };

  return (
    <>
      <div className='login-modal-container'>
        <div className='login-modal-top'>
            {/* <div onClick={() => setShowModal(false)}><i className="fa-solid fa-xmark"/></div> */}
              {/* {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <LoginForm />
                </Modal>
              )} */}
            <div><img className='epal-logo' src={ePalLogo}/></div>
          </div>
        <div className='login-modal-wrapper'>
        <div className='signup-tab'>Sign Up</div>
        <div className='login-tab-line'/>
        <form className='login-form' onSubmit={handleSubmit}>
          <label className='login-label-input'>
            Email
            <input className='login-input'
              placeholder='Please enter your email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
              />
          </label>
          <label className='login-label-input'>
            Username
            <input className='login-input'
              placeholder='Please enter your username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // required
            />
          </label>
          <label className='login-label-input'>
            Password
            <input className='login-input'
              placeholder='Please enter your password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <label className='login-label-input'>
            Confirm Password
            <input className='login-input'
              placeholder='Please confirm your password'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // required
              />
          </label>
          <label className='login-label-input'>
            Nickname
            <input className='login-input'
              placeholder='Please enter your nickname'
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              // required
            />
          </label>
          <label className='login-label-input'>
            Bio
            <textarea className='textarea' id='signup' rows="4"
              placeholder='Write a short bio to introduce yourself (min 10 characters)'
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              // required
            />
            <div className='textarea-counter'>{bio.length}/500</div>
          </label>
          <label className='login-label-input'>
            Gender
            <select className='login-input' value={gender} onChange={e => setGender(e.target.value)} >
              <option value="" disabled>Select a gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Nonconforming</option>
              {/* required */}
            </select>
          </label>
          <label className='login-label-input'>
            Avatar
            <input className='login-input'
              // placeholder='Please upload your avatar'
              type="file"
              // value={profilePic}
              onChange={updateFile}
              // required
            />
          </label>
          {errors.map((error, idx) => <div className='errors' key={idx}>{error}</div>)}
          <div className='login-buttons'>
            <button className='login-submit-button' type="submit">Sign Up</button>
          </div>
          <div className='signup-tab-line'/>
        </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
