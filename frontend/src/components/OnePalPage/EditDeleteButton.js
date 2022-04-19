import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';

function EditDeleteButton({review}) {
  const dispatch = useDispatch();

  return (
    <div>
      {/* <Link to={`/myepal/${game.id}/edit`}>
        <button>Edit</button>
      </Link> */}
      <button onClick={() => dispatch(deleteReview(review.id))}>Delete</button>
    </div>
  )
}

export default EditDeleteButton;
