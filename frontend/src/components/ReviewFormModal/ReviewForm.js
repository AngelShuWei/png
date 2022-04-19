import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory, useParams} from "react-router-dom";
import { createReview } from "../../store/reviews";

function ReviewForm({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { palId } = useParams(); //palId is a string here a

  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(createReview({ palId, content, rating }))
    .then(() => setShowModal(false))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  }

  return (
    <>
      <div>
        <form className='review-form-container' onSubmit={handleSubmit}>
          <label className='label-input'></label>
            <textarea className='textarea' rows="4"
              placeholder='optional review'
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
              />
            <div className='textarea-counter'>{content.length}/500</div>

          <label className='label-input'>Rating</label>
            <input className='input'
              placeholder='The rating range is 1 - 5'
              type="number"
              value={rating}
              onChange={e => setRating(e.target.value)}
            />
          {errors.map((error, idx) => <p className='errors' key={idx}>{error}</p>)}
          <button className='submit-button' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default ReviewForm;
