import './LoginForm.css'
import pngLogo from '../../assets/png-logo.png'
import React, {useState} from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const isFormValid = () => {
    return (credential.length >= 1 && password.length >= 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({credential, password}))
      .then(() => history.push('/epals'))
      .catch(async (res) => { //if there is an error, then skip the res.ok and get the response
        const data = await res.json(); //parse the data again because we skipped the res.ok
        if (data && data.errors) setErrors(data.errors); //set the new Errors
      });
  }

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({credential: "demo@user.io", password: "password"}))
      .then(() => history.push('/epals'))
      .catch(async (res) => { //if there is an error, then skip the res.ok and get the response
        const data = await res.json(); //parse the data again because we skipped the res.ok
        if (data && data.errors) setErrors(data.errors); //set the new Errors
      });
  }

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
        <div className='login-tab'>Log In</div>
        <div className='login-tab-line'/>
          <form className='login-form' onSubmit={handleSubmit}>
            <label className='login-label-input'>
              Username or Email
              <input className='login-input'
                placeholder='Please enter your Username or Email'
                type="text"
                value={credential}
                onChange={e => setCredential(e.target.value)}
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
            {errors.map((error, idx) => <div className='errors' key={idx}>{error}</div>)}
            <div className='login-buttons'>
            {isFormValid() ?
              <button className='login-submit-button' type="submit">Log in</button> :
              <button className='disabled-login-button' type='submit' disabled={true}>Log in</button>
            }
              <button className='login-submit-button' type="submit" onClick={handleDemo}>Demo User</button>
            </div>
            <div className='login-tab-line'/>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
