import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePal } from '../../store/pals';

function EditDeleteButton({game}) {
  const dispatch = useDispatch();

  return (
    <div>
      <Link to={`/myepal/${game.id}/edit`}>
        <button>Edit Game</button>
      </Link>
      <button onClick={() => dispatch(deletePal(game.id))}>
        Delete Game
      </button>
    </div>
  )
}

export default EditDeleteButton;
