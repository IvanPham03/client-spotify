import React, { Component, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import {
  fetchMoreSongs,
  movePlaylistSong
} from "../../../store/actions/playlistActions";

import Header from "./components/header/playlistHeader";
import Table from "../../songsTable/playlistTable/playlistTable";

import withStatus from "../../../hoc/statusHoc";
import Spinner from "../../spinner/spinner";

const Playlist = () => {
  const dispatch = useDispatch();
  // const playlist = useSelector(
  //   state =>
  //     state.playlistReducer.playlist ? state.playlistReducer.playlist : null
  // );
  // const fetching = useSelector(
  //   state => state.playlistReducer.fetchPlaylistPending
  // );
  const playlist = useSelector(state=> state.playlistTrack.playlist)
  if (playlist){
    console.log(playlist);
  }

  return (
    // <Spinner section loading={this.props.fetching}>
      <div className="player-container">
        <Header
          songs={playlist ? playlist.$values : []}
          // empty={
          //   this.props.playlist && this.props.playlist.tracks.items.length
          //     ? false
          //     : true
          // }
          // playlist={this.props.playlist || {}}
          // currentUri={this.props.currentUri}
          // playing={this.props.playing}
          // pauseSong={this.props.pauseSong}
          // playSong={() => this.props.playSong(this.props.playlist.uri, 0)}
          album = {false}
        />
        <Table
          // more={
          //   this.props.playlist && this.props.playlist.tracks.next
          //     ? true
          //     : false
          // }
          // playlist={this.props.playlist || {}}
          // fetchMoreSongs={this.props.fetchMoreSongs}
          // movePlaylistSong={this.props.movePlaylistSong}
          // current={this.props.currentSong}
          // playing={this.props.playing}
          // uri={this.props.playlist ? this.props.playlist.uri : ""}
          songs={playlist ? playlist.$values : []}
          // songList = {true}
          // pauseSong={this.props.pauseSong}
          // playSong={this.props.playSong}
        />
      </div>
    // </Spinner>
  );
};

// export default withStatus(Playlist);
// class Playlist extends Component {
//   render = () => {
//     return (
//       <Spinner section loading={this.props.fetching}>
//         <div className="player-container">
//           <Header
//             empty={
//               this.props.playlist && this.props.playlist.tracks.items.length
//                 ? false
//                 : true
//             }
//             playlist={this.props.playlist || {}}
//             currentUri={this.props.currentUri}
//             playing={this.props.playing}
//             pauseSong={this.props.pauseSong}
//             playSong={() => this.props.playSong(this.props.playlist.uri, 0)}
//           />
//           <Table
//             more={
//               this.props.playlist && this.props.playlist.tracks.next
//                 ? true
//                 : false
//             }
//             playlist={this.props.playlist || {}}
//             fetchMoreSongs={this.props.fetchMoreSongs}
//             movePlaylistSong={this.props.movePlaylistSong}
//             current={this.props.currentSong}
//             playing={this.props.playing}
//             uri={this.props.playlist ? this.props.playlist.uri : ""}
//             songs={this.props.playlist ? this.props.playlist.tracks.items : []}
//             pauseSong={this.props.pauseSong}
//             playSong={this.props.playSong}
//           />
//         </div>
//       </Spinner>
//     );
//   };
// }
// const mapStateToProps = state => {
//   return {
//     playlist: state.playlistReducer.playlist
//       ? state.playlistReducer.playlist
//       : null,
//     fetching: state.playlistReducer.fetchPlaylistPending
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       fetchMoreSongs,
//       movePlaylistSong
//     },
//     dispatch
//   );
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStatus(Playlist));


export default Playlist
