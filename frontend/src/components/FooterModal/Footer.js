import './Footer.css';
import sleepyKirby from '../../assets/sleepy-kirby.gif';
import React, {useState} from 'react';
import { Modal } from '../../context/Modal';

function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='sleepy-kirby-container' onClick={() => setShowModal(true)}>
        <img className='sleepy-kirby-gif' src={sleepyKirby} alt='sleepy-kirby'/>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='testing'>content here</div>
        </Modal>
      )}
    </>
  )
}

export default Footer;
