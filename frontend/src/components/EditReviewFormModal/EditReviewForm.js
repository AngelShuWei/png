import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory, useParams} from "react-router-dom";
import { updateReview } from "../../store/reviews";

function EditReviewForm({setShowModal, review}) {
  const dispatch = useDispatch();

  const { palId } = useParams(); //palId is a string here a

  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);
  const [errors, setErrors] = useState([]);

  const isFormValid = () => {
    return (rating >= 1);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(updateReview({ reviewId: review.id, palId, content, rating }))
    .then(() => setShowModal(false))
    .catch(async(res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })
  }

  return (
    <>
      <div className='review-modal-container'>
        <form className='review-form-container' onSubmit={handleSubmit}>
          <div className='review-form-text'>Edit a Review</div>
          <div className='review-form-content'>
            <label className='label-input'>Describe Your Experience</label>
              <textarea className='textarea' rows="4"
                placeholder='Write a public review(optional)'
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
          </div>
          {errors.map((error, idx) => <p className='errors' key={idx}>{error}</p>)}
          <div className="submit-button-container">
            {isFormValid() ?
              <button className='submit-button' type='submit'>Submit</button> :
              <button className='disabled-button' type='submit' disabled={!isFormValid()}>Submit</button>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default EditReviewForm;
