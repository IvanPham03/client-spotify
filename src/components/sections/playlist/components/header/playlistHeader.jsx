import React from 'react';
import moment from 'moment';

import './playlistHeader.css';
import defaultCover from '../../../../../containers/mainSection/images/playlist.png';
import meomeo from '../../../../../utilities/ass/meomeo.jpg'
import FollowBtn from '../../../../buttons/followButton/followPlaylist';
import withUiActions from '../../../../../hoc/uiHoc';
import { useSelector } from 'react-redux';


export const playlistHeader = props => {
  const album = props.album
  const playlist = useSelector(state => state.playlistOnly.value)
  console.log(playlist);
  return (
   <div className="playlist-title-container">
    {/* {!album && playlist.mine ? (
      <div className="playlist-image-container edit" onClick={showModal}>
        <img alt="playlist-cover" className="playlist-image" src={img} />
        <i className="fa fa-pencil" aria-hidden="true" />
      </div>
    ) : ( */}
      <div className="playlist-image-container">
        <img alt="playlist-cover" className="playlist-image" src={meomeo} />
      </div>
    {/* )} */}
    <div className="playlist-info-container">
      <p className="playlist-text">{album ? 'ALBUM' : 'PLAYLIST'}</p>
      <h3
        className="header-title playlist"
        // onClick={!album && playlist.mine ? showModal : null}
      >
        { playlist !== null ? playlist.name : ""}
      </h3>
      {!album && (
        <p className="created-by">
          {'Created by: '}
          <span className="lighter-text">{playlist !== null ? playlist.User.userName: ""}</span> - {props.songs.length} songs
        </p>
      )}
      {album && (
        <div>
          <div className="created-by">
            <div className="artist">
              By:{' '}
              {playlist.artists
                ? playlist.artists.map((a, i) => (
                    <span key={i}>
                      <span
                        onClick={() => onArtistClick(a.id)}
                        className="artist-link"
                      >
                        {a.name}
                      </span>
                      {playlist.artists.length - 1 === i ? '' : ', '}
                    </span>
                  ))
                : ''}
            </div>
            <span className="lighter-text">
              {' '}
              {moment(playlist.release_date).format('YYYY')}
            </span>{' '}
            - {playlist.total_tracks || 0} songs
          </div>
        </div>
      )}
      {!album && (
        <div className="followers">
          <div>FOLLOWERS</div>
          {/* {playlist.followers ? playlist.followers.total : 0} */}
        </div>
      )}
      <div className="btns-section">
        <div>
          {/* {!empty && ( */}
            <button
              // onClick={event}
              className="main-pause-play-btn artist-button"
            >
              {/* {playingPlaylist ? 'PAUSE' : 'PLAY'} */}
              PLAY
            </button>
          {/* )} */}
        </div>
        <div>
          <FollowBtn />
        </div>
      </div>
    </div>
  </div>)

}


export default playlistHeader
// const playlistHeader = ({
//   playlist,
//   album = false,
//   onArtistClick,
//   playSong,
//   pauseSong,
//   playing,
//   showModal,
//   currentUri,
//   empty = false
// }) => {
//   const img =
//     playlist.images && playlist.images.length !== 0
//       ? playlist.images[0].url
//       : defaultCover;

//   const owner = playlist.owner
//     ? playlist.owner.display_name || playlist.owner.id
//     : '';

//   const songs = playlist.tracks ? playlist.tracks.total : '0';

//   const playingPlaylist = currentUri === playlist.uri && playing;

//   const event = playingPlaylist ? pauseSong : playSong;

//   return (
//     <div className="playlist-title-container">
//       {!album && playlist.mine ? (
//         <div className="playlist-image-container edit" onClick={showModal}>
//           <img alt="playlist-cover" className="playlist-image" src={img} />
//           <i className="fa fa-pencil" aria-hidden="true" />
//         </div>
//       ) : (
//         <div className="playlist-image-container">
//           <img alt="playlist-cover" className="playlist-image" src={img} />
//         </div>
//       )}
//       <div className="playlist-info-container">
//         <p className="playlist-text">{album ? 'ALBUM' : 'PLAYLIST'}</p>
//         <h3
//           className="header-title playlist"
//           onClick={!album && playlist.mine ? showModal : null}
//         >
//           {playlist.name}
//         </h3>
//         {!album &&
//           playlist.description && (
//             <p
//               className="description"
//               onClick={!album && playlist.mine ? showModal : null}
//             >
//               {playlist.description}
//             </p>
//           )}
//         {!album && (
//           <p className="created-by">
//             {'Created by: '}
//             <span className="lighter-text">{owner}</span> - {songs} songs
//           </p>
//         )}
//         {album && (
//           <div>
//             <div className="created-by">
//               <div className="artist">
//                 By:{' '}
//                 {playlist.artists
//                   ? playlist.artists.map((a, i) => (
//                       <span key={i}>
//                         <span
//                           onClick={() => onArtistClick(a.id)}
//                           className="artist-link"
//                         >
//                           {a.name}
//                         </span>
//                         {playlist.artists.length - 1 === i ? '' : ', '}
//                       </span>
//                     ))
//                   : ''}
//               </div>
//               <span className="lighter-text">
//                 {' '}
//                 {moment(playlist.release_date).format('YYYY')}
//               </span>{' '}
//               - {playlist.total_tracks || 0} songs
//             </div>
//           </div>
//         )}
//         {!album && (
//           <div className="followers">
//             <div>FOLLOWERS</div>
//             {playlist.followers ? playlist.followers.total : 0}
//           </div>
//         )}
//         <div className="btns-section">
//           <div>
//             {!empty && (
//               <button
//                 onClick={event}
//                 className="main-pause-play-btn artist-button"
//               >
//                 {playingPlaylist ? 'PAUSE' : 'PLAY'}
//               </button>
//             )}
//           </div>
//           <div>
//             {!album &&
//               !playlist.mine && <FollowBtn following={playlist.follows} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withUiActions(playlistHeader);
