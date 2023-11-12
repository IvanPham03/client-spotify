import React from "react";

import withUiActions from "../../../hoc/uiHoc";
import withStatus from "../../../hoc/statusHoc";

const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: "#aaa",
  fontSize: 12
};
const numberOfArtists = 2; // Số lượng nghệ sĩ bạn muốn hiển thị

const artistArray = [{name: "Trường đẹp trai", uri: "01"}, {name: "Trường đẹp khoai to", uri: "02"}];
// Điền thông tin nghệ sĩ vào mảng

const detailsSection = props => {
  const artists = 1000;
  return (
    <div className="details-section">
      <div className="add-remove-section">
        <p
          onClick={() => props.onAlbumClick(props.album)}
          className={
            "song-name" + (props.songName.length > 30 ? " overflow" : "")
          }
        >
          {props.songName}
        </p>
        {props.contains
          ? <i
              className="fa fa-check"
              aria-hidden="true"
              onClick={() => props.removeSong(props.ids, true)}
            />
          : <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={() => props.addSong(props.ids, true)}
            />}
      </div>
      <div className="artist-name" style={artistName}>
        {/* {props.artists.map((artist, i) => (
          <span key={i}>
            <span
              className="artist"
              onClick={() => props.onArtistClick(artist.uri.split(':')[2])}
            >
              {artist.name}
            </span>
            {i + 1 !== artists ? ', ' : ''}
          </span>
        ))} */}
        {artistArray.map((artist, i) =>
          <span key={i}>
            <span
              className="artist"
              onClick={() => props.onArtistClick(artist.uri.split(":")[2])}
            >
              {artist.name}
            </span>
            {i + 1 !== numberOfArtists ? ", " : ""}
          </span>
        )}
      </div>
    </div>
  );
};

// export default withUiActions(withStatus(detailsSection));
export default detailsSection
