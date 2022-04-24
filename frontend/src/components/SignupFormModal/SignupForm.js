import './SignupForm.css';
import pngLogo from '../../assets/png-logo.png'
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
  const [profilePicLoaded, setProfilePicLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  // console.log(email.length >= 1)
  // console.log(username.length >= 1)
  // console.log(password.length >= 1)
  // console.log(confirmPassword.length >= 1)
  // console.log(nickname.length >= 1)
  // console.log(bio.length >= 1)
  // console.log(gender.length >= 1)
  // console.log(profilePic !== null)

  const isFormValid = () => {
    return (email.length >= 1 &&
      username.length >= 4 &&
      password.length >= 6 &&
      confirmPassword.length >= 1 &&
      nickname.length >= 1 &&
      bio.length >= 10 &&
      gender.length >= 1 &&
      profilePic !== null)
  }

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
    if (file) {
      setProfilePic(file);
      setProfilePicLoaded(true);
    }
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
            <div><img className='png-logo' src={pngLogo}/></div>
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
              maxLength={256}
              onChange={(e) => setEmail(e.target.value)}
              />
          </label>

          <label className='login-label-input'>
            Username
            {username.length < 4 &&
                <div className='alert'>4 characters minimum</div>
            }
            <input className='login-input'
              placeholder='Please enter your username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={30}
              // required
            />
          </label>

          <label className='login-label-input'>
            Password
            {password.length < 6 &&
                <div className='alert'>6 characters minimum</div>
            }
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
              maxLength={30}
              onChange={(e) => setNickname(e.target.value)}
              // required
            />
          </label>

          <label className='login-label-input'>
            Bio
            {bio.length < 10 &&
                <div className='alert'>10 characters minimum</div>
            }
            <textarea className='textarea' id='signup' rows="4"
              placeholder='Write a short bio to introduce yourself (min 10 characters)'
              type="text"
              value={bio}
              maxLength={500}
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

          <div className='upload-an-avatar-text'>Upload an Avatar
            <label className='avatar-input-label' htmlFor="avatar">
              {!profilePic &&
                <i className="fa-lg fa-regular fa-image"/>
              }
              {/* {profilePicLoaded && <i className="fa-solid fa-check"/>} */}
              {profilePic &&
                <img className='signup-loaded-img' src={URL.createObjectURL(profilePic)}/>
              }
              </label>
          </div>
              <input className='input' id='avatar'
                type="file"
                onChange={updateFile}
                style={{visibility:"hidden"}}
              />

          {errors.map((error, idx) => <div className='errors' key={idx}>{error}</div>)}
          <div className='login-buttons'>
            {isFormValid() ?
              <button className='login-submit-button' type="submit">Sign up</button> :
              <button className='disabled-login-button' type='submit' disabled={true}>Sign up</button>
            }
          </div>
          <div className='signup-tab-line'/>
        </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
