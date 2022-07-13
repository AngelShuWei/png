import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';
import EditReviewForm from '../EditReviewFormModal';

function EditDeleteButton({review}) {
  const dispatch = useDispatch();

  return (
    <div className='one-pal-user-delete-edit-btn'>
      <EditReviewForm review={review}/>
      <button className='one-pal-user-delete-btn' onClick={() => dispatch(deleteReview(review.id))}>
        <i className="fa-sm fa-solid fa-trash-can"/> Delete</button>
    </div>
  )
}

export default EditDeleteButton;
