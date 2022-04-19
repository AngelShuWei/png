import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import EditReviewForm from "./EditReviewForm";

function EditReviewFormModel({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='one-pal-user-edit-btn' onClick={() => setShowModal(true)}>
        <i className="fa-sm fa-solid fa-pen-to-square"/>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
};

export default EditReviewFormModel;
