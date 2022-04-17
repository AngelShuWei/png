import './SignupForm.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = ("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, nickname, bio, gender, profilePic }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
  return (
    <form onSubmit={handleSubmit}>
    <ul>
      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    </ul>
    <label>
      Email
      <input
        placeholder='Please enter your email'
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // required
      />
    </label>
    <label>
      Username
      <input
        placeholder='Please enter your username'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        // required
      />
    </label>
    <label>
      Password
      <input
        placeholder='Please enter your password'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // required
      />
    </label>
    <label>
      Confirm Password
      <input
        placeholder='Please confirm your password'
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        // required
      />
    </label>
    <label>
      Nickname
      <input
        placeholder='Please enter your nickname'
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        // required
      />
    </label>
    <label>
      Bio
      <textarea
        placeholder='Write a short bio to introduct yourself'
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        // required
      />
    </label>
    <label>
      Gender
      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option>Female</option>
        <option>Male</option>
        <option>Nonconforming</option>
        {/* required */}
      </select>
    </label>
    <label>
      Avatar
      <input
        placeholder='Please upload your avatar'
        type="text"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
        // required
      />
    </label>
    <button type="submit">Sign Up</button>
  </form>
  );
}

export default SignupForm;
