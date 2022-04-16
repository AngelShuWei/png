import './OnePalPage.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link} from "react-router-dom";
import { useEffect } from 'react';

function OnePalPage() {

  return (
    <>
      <div className='pals-page-container'></div>
    </>
  )
}

export default OnePalPage;
