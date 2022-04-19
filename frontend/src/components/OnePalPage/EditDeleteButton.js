import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';
import EditReviewFormModel from '../EditReviewFormModal';

function EditDeleteButton({review}) {
  const dispatch = useDispatch();

  return (
    <div>
      <EditReviewFormModel review={review}/>
      <button onClick={() => dispatch(deleteReview(review.id))}>Delete</button>
    </div>
  )
}

export default EditDeleteButton;
