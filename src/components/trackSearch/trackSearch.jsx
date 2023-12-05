import React, { Component, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import withUiActions from '../../hoc/uiHoc';
import { fetchSearchData } from '../../store/actions/searchActions';
import { setView } from '../../redux-toolkit/slices/uiSlice';
import { fetchTrack } from '../../redux-toolkit/slices/searchSlice';

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
    dispatch(fetchTrack(e.target.value))
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
// class search extends Component {
//   render = () => (
//     <div className="track-search-container" style={container}>
//       <form>
//         <input
//           type="text"
//           placeholder="Search..."
//           style={input}
//           onChange={event => this.props.fetchSearchData(event.target.value)}
//           onClick={this.props.onSearch}
//         />
//       </form>
//     </div>
//   );
// }

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       fetchSearchData
//     },
//     dispatch
//   );
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(withUiActions(search));
