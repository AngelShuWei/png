import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import Footer from './Footer';

function FooterModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='footer-modal-button' onClick={() => setShowModal(true)}>Click Me!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Footer />
        </Modal>
      )}
    </>
  );
}

export default FooterModal;
