import './EditProfileFormPage.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory, useParams} from "react-router-dom";
import { updateProfile } from '../../store/session';

function EditProfileFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userId } = useParams();

  const sessionUser = useSelector(state => state.session.user);

  const [nickname, setNickname] = useState(sessionUser.nickname);
  const [bio, setBio] = useState(sessionUser.bio);
  const [gender, setGender] = useState(sessionUser.gender);
  const [profilePic, setProfilePic] = useState(sessionUser.profilePic);
  const [isProfilePicUploaded, setIsProfilePicUploaded] = useState(true);

  // const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(updateProfile({ id:userId, nickname, bio, gender, profilePic }))
    .then(() => history.push(`/profile/${sessionUser.id}/edit`))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  }

  const updateProfilePic = (e) => {
    const file = e.target.files[0];
    if (file && file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setProfilePic(file);
      setIsProfilePicUploaded(false);
    }
  };

  //TO-DO;
  const isFormValid = () => {
    return (
      // email.length >= 6 &&
      // password.length >= 6 &&
      // confirmPassword.length >= 1 &&
      nickname.length >= 1 &&
      bio.length >= 10 &&
      gender.length >= 1 &&
      profilePic !== null)
  }

  return (
    <>
      <div className='profile-page-container'>
        <div className='profile-page-content'>
          <form className='form-container' onSubmit={handleSubmit}>

            <div className='profile-text'>Profile</div>
            <div className='avatar-text'>Avatar</div>

            <div className='profile-avatar-content'>
              <label className='avatar-input-label' htmlFor="avatar">
                {/* <div className='avatar-input-label-overlay'> */}
                {isProfilePicUploaded &&
                  <img className='signup-loaded-img' src={profilePic}/>
                }
                {!isProfilePicUploaded &&
                  <img className='signup-loaded-img' src={URL.createObjectURL(profilePic)}></img>
                }
                {/* </div> */}
              </label>

              <div className='avatar-img-req-text'>Avatar must be .JPG, .JPEG, .PNG, or .GIF.</div>

              <input className='input' id='avatar'
                type="file"
                onChange={updateProfilePic}
                style={{visibility:"hidden"}}
              />
            </div>

            <div className='profile-line-div'/>

              <label className='login-label-input'>
                Nickname
                <input className='input'
                  placeholder='Please enter your nickname'
                  type="text"
                  value={nickname}
                  maxLength={30}
                  onChange={(e) => setNickname(e.target.value)}
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
              />
              <div className='textarea-counter'>{bio.length}/500</div>
            </label>

            <label className='login-label-input'>
              Gender
              <select className='input' value={gender} onChange={e => setGender(e.target.value)} >
                <option value="" disabled>Select a gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Nonconforming</option>
              </select>
            </label>

            {errors.map((error, idx) => <p className='errors' key={idx}>{error}</p>)}

            {isFormValid() ?
              <button className='profile-submit-button' type='submit'>Save Changes</button> :
              <button className='profile-disabled-button' type='submit' disabled={true}>Save Changes</button>
            }

            <div className='line-div'/>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfileFormPage;
