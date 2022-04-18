import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import ReviewForm from "./ReviewForm";

function ReviewFormModel() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className='submit-button' onClick={() => setShowModal(true)}>Leave a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm/>
        </Modal>
      )}
    </>
  );
};

export default ReviewFormModel;
