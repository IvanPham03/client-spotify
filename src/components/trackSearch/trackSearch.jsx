import React, { Component, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import withUiActions from '../../hoc/uiHoc';
import { fetchSearchData } from '../../store/actions/searchActions';
import { setView } from '../../redux-toolkit/slices/uiSlice';
import { fetchTrack } from '../../redux-toolkit/slices/searchSlice';
import { searchTrack } from '../../redux-toolkit/slices/trackListSlice';

const container = {
  position: 'relative',
  top: '15px'
};


const trackSearch = () => {
  const dispatch = useDispatch()
  const handleClick = () =>{
    dispatch(setView('search'))
  }
  const handleSearch = async(e) =>{
    dispatch(searchTrack(e.target.value))
  }
  return (
    <div className="track-search-container" style={container}>
      <form>
        <input
          type="text"
          placeholder="Search..."
          // style={input}
          onChange={handleSearch}
          onClick={handleClick}
          className='rounded pl-3 pt-1 pb-1 pr-2 min-w-[200px] w-auto text-black'
        />
      </form>
    </div>
  )
}

export default trackSearch
