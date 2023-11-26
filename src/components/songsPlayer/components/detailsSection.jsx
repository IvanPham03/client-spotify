import React from "react";

import withUiActions from "../../../hoc/uiHoc";
import withStatus from "../../../hoc/statusHoc";

const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: "#aaa",
  fontSize: 12
};


const detailsSection = props => {
  return (
    <div className="details-section">
      <div className="add-remove-section">
        <p
          onClick={() => props.onAlbumClick(props.album)}
          className={
            "song-name mt-3" + (props.songName.length > 30 ? " overflow" : "" )
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
        {props.artists.map((artist, i) =>
          <span key={i}>
            <span
              className="artist text-base"
              onClick={() => props.onArtistClick(artist.uri.split(":")[2])}
            >
              {artist.user.username}
            </span>
            {i + 1 !== props.artists.length ? ", " : ""}
          </span>
        )}
      </div>
    </div>
  );
};

// export default withUiActions(withStatus(detailsSection));
export default detailsSection;
