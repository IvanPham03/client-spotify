import React from "react";

import withUiActions from "../../../hoc/uiHoc";
import withStatus from "../../../hoc/statusHoc";
import { useDispatch, useSelector } from "react-redux";
import { setaddPlaylist } from "../../../redux-toolkit/slices/uiSlice";
import { setAddPlaylist } from "../../../redux-toolkit/slices/addPlaylist";

const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: "#aaa",
  fontSize: 12
};
const numberOfArtists = 2; // Số lượng nghệ sĩ bạn muốn hiển thị
// Điền thông tin nghệ sĩ vào mảng

const detailsSection = props => {
  const track = useSelector(state => state.track.value);

  const dispatch = useDispatch()
  const handleAddplaylist = () =>{
    dispatch(setaddPlaylist(true))
    dispatch(setAddPlaylist(track.id))
  }
  return (
    <div className="details-section mt-2">
      <div className="add-remove-section">
        <p
          // onClick={() => props.onAlbumClick(props.album)}
          className={
            "song-name" + (track.trackName.length > 30 ? " overflow" : "")
          }
        >
          {track.trackName}
        </p>
        {props.contains
          ? <i
              className="fa fa-check"
              aria-hidden="true"
              // onClick={() => props.removeSong(track.ID, true)}
            />
          : <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={() => handleAddplaylist()}
            />}
      </div>
      <div className="artist-name" style={artistName}>
        {track !== null
          ? track.userTracks.map((artist, i) =>
              <span key={i}>
                <span className="artist">
                {/* // onClick={() => props.onArtistClick(artist.uri.split(':')[2])} */}
                  {typeof artist === 'object' && artist.user !== null ? artist.user.username  : null}
                  {/* {console.log(artist)} */}
                </span>
                {i < track.userTracks.length - 2 ? ", " : ""}
              </span>
            )
          : null}
      </div>
    </div>
  );
};

// export default withUiActions(withStatus(detailsSection));
export default detailsSection;
