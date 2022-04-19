import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import EditReviewForm from "./EditReviewForm";

function EditReviewFormModel({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
};

export default EditReviewFormModel;
