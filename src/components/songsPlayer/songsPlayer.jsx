import React, { Component } from "react";

import "./songsPlayer.css";

import DetailSection from "./components/detailsSection";
import SongsControl from "./components/songsControl";
import SongSider from "./components/songSider";
import VolumeControl from "./components/volumeControl";
import withPlayer from "../../hoc/playerHoc";

class SongsPlayer extends Component {
  // toSeconds = ms => ms / 1000;

  render = () => {
    // const position = this.toSeconds(this.props.trackPosition) || 0;
    // const duration = this.props.currentSong
    //   ? this.toSeconds(this.props.currentSong.duration_ms)
    //   : 1;

    const position = 0;
    const duration = 300;
    return (
      <div className="player-container">
        {/* {this.props.currentSong.id ? (
          <DetailSection
            ids={
              this.props.currentSong.linked_from.id
                ? `${this.props.currentSong.linked_from.id},${
                    this.props.currentSong.id
                  }`
                : this.props.currentSong.id
            }
            contains={this.props.contains}
            songName={this.props.currentSong.name || ''}
            album={this.props.currentSong.album.uri.split(':')[2]}
            artists={this.props.currentSong.artists || []}
          />
        ) : null} */}
        <DetailSection
          ids={"id001"}
          contains={"contains 001"}
          songName={"Cơn mưa ngang qua"}
          album={"Chiều hôm qua đi nhậu"}
          artists={"Nhóm nhạc Fivemen"}
        />
        <SongsControl {...this.props} />
        {/* <SongSider
          isEnabled
          value={position / duration}
          position={position}
          duration={duration}
          onChange={value =>
            this.props.seekSong(Math.round(value * duration * 1000))
          }
        /> */}
        <SongSider
          isEnabled
          value={position / duration}
          position={position}
          duration={duration}
          // onChange={value =>
          //   this.props.seekSong(Math.round(value * duration * 1000))
          // }
        />
        <VolumeControl />
      </div>
    );
  };
}

// export default withPlayer(SongsPlayer);
export default SongsPlayer;
