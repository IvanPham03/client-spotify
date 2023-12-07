import React, { Component, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {setModal} from '../../redux-toolkit/slices/uiSlice'
import SiderMenu from '../../components/siderMenu/siderMenu';
import TrackCover from '../../components/trackCover/trackCover';
import NewPlaylist from './components/newplaylist';
import './leftSection.css';
import {fetchPlaylist} from '../../redux-toolkit/slices/playlistSlice'

const LeftSection  = () =>{
  const dispatch = useDispatch();
  const user = useSelector(s=>s.user.user)
  // console.log(user);
  useEffect(()=>{
    if(user){
      dispatch(fetchPlaylist(user.id))
    }
  }, [])
  return (
    <div className="left-section">
      <SiderMenu />
      <div className="buttom-section">
        <NewPlaylist setModal={dispatch(setModal)} /> 
        <TrackCover />
      </div>
    </div>
  );

}


export default LeftSection