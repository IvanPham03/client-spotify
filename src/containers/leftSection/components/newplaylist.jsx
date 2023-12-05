import React from 'react';

import { useDispatch } from 'react-redux';
import { setModal } from '../../../redux-toolkit/slices/uiSlice';

const newplaylist = () => {
  const dispatch = useDispatch()
  const handleNewPlaylist = () =>{
    dispatch(setModal(true))
  }
  return (
    <div className="new-playlist" onClick={handleNewPlaylist}>
    <i className="fa fa-plus-circle" />
    New Playlist
  </div>
  )
}

export default newplaylist
// const button = props => (
  
// );

// export default button;
