import './DmModal.css'
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function DmModal () {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
    <>
      <div className="mail-icon-container">
        <i className="fa-lg fa-solid fa-message" onClick = {openMenu}/>
      </div>
      {showMenu && (
        <div className='mail-menu-container'>
        <div className='mail-menu-container-triangle'></div>
        <div className='chat-top'>
          <span className='chat-text'>Chat</span>
          <span className='chat-new-message'>New Message</span>
        </div>
          <div className='line-div'></div>
          <form className='mail-form-container'>
          </form>
        </div>
      )}
    </>
  )

}

export default DmModal;
