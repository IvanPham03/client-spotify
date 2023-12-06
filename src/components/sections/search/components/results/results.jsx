import React from "react";

import ResultGroup from "./resultGroup";
import { useSelector } from "react-redux";
import Song from '../../../../songsTable/items/song'
const results = () => {
  const songs = useSelector(state => state.trackList.value);
  console.log(songs);
  const artists = useSelector(state => state.search.playlist);
  const albums = useSelector(state => state.search.album);
  const playlists = useSelector(state => state.search.artist);
  console.log(songs);
  return (
    <div className="table-container mt-10">
      <div className="results-table">
        <div>
        {songs.map((item, i) => (
                <Song
                  // onAdd={() => {
                  //   props.changeSongStatus(i, true);
                  //   props.addSong(item.track ? item.track.id : item.id);
                  // }}
                  // onDelete={() => {
                  //   props.changeSongStatus(i, false);
                  //   props.removeSong(item.track ? item.track.id : item.id);
                  // }}
                  // removeDate={props.removeDate}
                  // added_at={item.track ? item.added_at : ""}
                  // contains={props.songsStatus[i]}
                  // item={item.track || item}
                  // key={item.track ? item.track.id + i : item.id + i}
                  // id={item.track ? item.track.id : item.id}
                  // uri={props.uri}
                  // offset={i}
                  // current={props.current}
                  // playing={props.playing}
                  // pauseSong={props.pauseSong}
                  // playSong={props.playSong}
                  item = {item}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default results;
// const results = ({
//   songs,
//   artists,
//   albums,
//   playlists,
//   changeMode,
//   onAlbumClick,
//   onArtistClick,
//   onPlaylistClick
// }) => (
//   <div className="table-container">
//     <div className="results-table">
//       <div className="search-results">
//         {songs.length ? (
//           <ResultGroup
//             items={songs}
//             onClick={onAlbumClick}
//             changeMode={changeMode}
//             type="Songs"
//           />
//         ) : null}
//         {artists.length ? (
//           <ResultGroup
//             changeMode={changeMode}
//             items={artists}
//             onClick={onArtistClick}
//             type="Artists"
//           />
//         ) : null}
//         {albums.length ? (
//           <ResultGroup
//             changeMode={changeMode}
//             items={albums}
//             onClick={onAlbumClick}
//             type="Albums"
//           />
//         ) : null}
//         {playlists.length ? (
//           <ResultGroup
//             changeMode={changeMode}
//             items={playlists}
//             onClick={onPlaylistClick}
//             type="Playlists"
//           />
//         ) : null}
//       </div>
//     </div>
//   </div>
// );

// export default withUiActions(results);
