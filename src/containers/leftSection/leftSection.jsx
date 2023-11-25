import React, { Component } from 'react';
import {useDispatch } from 'react-redux';
import {setModal} from '../../redux-toolkit/slices/uiSlice'
import SiderMenu from '../../components/siderMenu/siderMenu';
import TrackCover from '../../components/trackCover/trackCover';
import NewPlaylist from './components/newplaylist';
import './leftSection.css';

// class LeftSection extends Component {
//   render() {
//     return (
//       <div className="left-section">
//         <SiderMenu />
//         <div className="buttom-section">
//           <NewPlaylist setModal={this.props.setModal} /> 
//           <TrackCover />
//         </div>
//       </div>
//     );
//   }
// }

const LeftSection  = () =>{
  const dispatch = useDispatch();
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

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       setModal
//     },
//     dispatch
//   );
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(LeftSection);


export default LeftSection