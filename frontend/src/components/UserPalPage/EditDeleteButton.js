import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePal } from '../../store/pals';

function EditDeleteButton({game}) {
  const dispatch = useDispatch();
  console.log(game.id)

  return (
    <div>
      <button onClick={() => dispatch(deletePal(game.id))}>
        Delete Game
      </button>
    </div>
  )
}

export default EditDeleteButton;
