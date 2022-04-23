import React, { useState, useEffect } from "react";
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useHistory, useParams} from "react-router-dom";
import { loadAllPals } from "../../store/pals";
import ReviewForm from "./ReviewForm";

function ReviewFormModel() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { palId } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const pals = useSelector(state => Object.values(state.pals));
  const userPals = pals.filter(pal => pal.id === +palId);

  // useEffect(() => {
  //   dispatch(loadAllPals());
  // }, [dispatch])

  return (
    <>
      {userPals[0].userId !== sessionUser.id &&
        <button className='add-review-button' onClick={() => setShowModal(true)}>Leave a Review</button>
      }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default ReviewFormModel;
