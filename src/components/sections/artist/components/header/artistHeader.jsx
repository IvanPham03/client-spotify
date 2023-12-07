import React from "react";

import "./artistHeader.css";
import withPlayer from "../../../../../hoc/playerHoc";
import FollowBtn from "../../../../buttons/followButton/followArtist";
import meomeo from '../../../../../utilities/ass/meomeo.jpg'
const artistHeader = () => {
  return (
    <div>
      <div className="current-artist-header-container">
        <img
          alt="artist"
          className="current-artist-image"
          src={meomeo}
        />
        <div className="current-artist-info">
          <h3>
            "name"
          </h3>
          <div className="btns-section">
            <div>
               <button
                    className="main-pause-play-btn artist-button"
                    // onClick={pauseSong}
                  >
                    {"PAUSE"}
                  </button>
                {/* : <button
                    className="main-pause-play-btn artist-button"
                    onClick={() => playContext(artist.uri, 0)}
                  >
                    {"PLAY"}
                  </button>} */}
            </div>
            <div>
              <FollowBtn />
            </div>
            <div>
              <button className="menu-btn">···</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default artistHeader
// const artistHeader = ({
//   artist,
//   playing,
//   playContext,
//   pauseSong,
//   currentSong
// }) => (
//   <div>
//     <div className="current-artist-header-container">
//       <img
//         alt="artist"
//         className="current-artist-image"
//         src={artist.images && artist.images[0] ? artist.images[0].url : ''}
//       />
//       <div className="current-artist-info">
//         <h3>{artist.name}</h3>
//         <div className="btns-section">
//           <div>
//             {playing && artist.uri === currentSong.artists[0].uri ? (
//               <button
//                 className="main-pause-play-btn artist-button"
//                 onClick={pauseSong}
//               >
//                 {'PAUSE'}
//               </button>
//             ) : (
//               <button
//                 className="main-pause-play-btn artist-button"
//                 onClick={() => playContext(artist.uri, 0)}
//               >
//                 {'PLAY'}
//               </button>
//             )}
//           </div>
//           <div>
//             <FollowBtn following={artist.follows} />
//           </div>
//           <div>
//             <button className="menu-btn">···</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default withPlayer(artistHeader);
