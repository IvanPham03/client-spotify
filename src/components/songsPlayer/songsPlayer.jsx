import React, { Component, useEffect, useRef, useState } from "react";

import "./songsPlayer.css";

import DetailSection from "./components/detailsSection";
import SongsControl from "./components/songsControl";
import SongSider from "./components/songSider";
import VolumeControl from "./components/volumeControl";
import withPlayer from "../../hoc/playerHoc";
import { useDispatch, useSelector } from "react-redux";
import {
  toogleShuffling,
  togglePlaying,
  toggleLooping
} from "../../redux-toolkit/slices/audioSlice";
const SongsPlayer = () => {
  const toSeconds = ms => ms / 1000;
  const dispatch = useDispatch();
  const track = useSelector(state => state.track.value);
  const audioMp3 = useSelector(state => state.audio.audioMp3);
  const playing = useSelector(state => state.audio.isPlaying);
  const looping = useSelector(state => state.audio.isLooping);
  const shuffling = useSelector(state => state.audio.isShuffling);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef();
  const audioRef = useRef(new Audio());

  const handlePlay = () => {
    dispatch(togglePlaying());
  };
  const handleShuffle = () => {
    dispatch(toogleShuffling());
  };
  const handleLoop = () => {
    dispatch(toggleLooping());
  };

  useEffect(
    () => {
      // nếu như tồn tại thì chỉ cần play tiếp, nếu không check tồn tại thì mỗi lần click nó sẽ lại gán một mp3
      if (audioRef.current && audioRef.current.src) {
        if (playing) {
          audioRef.current.play();
          setPosition(audioRef.current.currentTime);
          startTimer();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      } else {
        if (playing) {
          audioRef.current.src = audioMp3;
          audioRef.current.play();
          startTimer();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
      }
    },
    [playing]
  );
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(
      () => {
        // if (audioRef.current.ended) {
        //   handleNext();
        // } else {
        console.log(audioRef.current.currentTime);
        setPosition(audioRef.current.currentTime);
        // }
      },
      [1000]
    );
  };

  useEffect(
    () => {
      const handleLoadedMetadata = () => {
        // Lấy duration khi audio đã load
        setDuration(audioRef.current.duration);
      };

      if (audioRef.current) {
        audioRef.current.addEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener(
              "loadedmetadata",
              handleLoadedMetadata
            );
          }
        };
      }
    },
    [audioRef]
  );

  return (
    <div className="player-container">
      {track
        ? <DetailSection
            ids={track.id}
            // contains={this.props.contains}
            songName={track.name || ""}
            // album={this.props.currentSong.album.uri.split(":")[2]}
            artists={track.artists || []}
          />
        : null}
      <SongsControl {...{ playing, looping, shuffling, handlePlay }} />
      <SongSider
        isEnabled
        value={position / duration}
        position={position}
        duration={duration}
        onChange={value => audioRef.current.currentTime = Math.round(value * duration)}
      />
    </div>
  );
};
// class SongsPlayer extends Component {
//   // toSeconds = ms => ms / 1000;

//   render = () => {
//     // const position = this.toSeconds(this.props.trackPosition) || 0;
//     // const duration = this.props.currentSong
//     //   ? this.toSeconds(this.props.currentSong.duration_ms)
//     //   : 1;

//     const position = 0;
//     const duration = 300;
//     return (
//       <div className="player-container">
//         {/* {this.props.currentSong.id ? (
//           <DetailSection
//             ids={
//               this.props.currentSong.linked_from.id
//                 ? `${this.props.currentSong.linked_from.id},${
//                     this.props.currentSong.id
//                   }`
//                 : this.props.currentSong.id
//             }
//             contains={this.props.contains}
//             songName={this.props.currentSong.name || ''}
//             album={this.props.currentSong.album.uri.split(':')[2]}
//             artists={this.props.currentSong.artists || []}
//           />
//         ) : null} */}
//         <DetailSection
//           ids={"id001"}
//           contains={"contains 001"}
//           songName={"Cơn mưa ngang qua"}
//           album={"Chiều hôm qua đi nhậu"}
//           artists={"Nhóm nhạc Fivemen"}
//         />
// <SongsControl {...this.props} />
//         {/* <SongSider
//           isEnabled
//           value={position / duration}
//           position={position}
//           duration={duration}
//           onChange={value =>
//             this.props.seekSong(Math.round(value * duration * 1000))
//           }
//         /> */}
//         <SongSider
//           isEnabled
//           value={position / duration}
//           position={position}
//           duration={duration}
//           // onChange={value =>
//           //   this.props.seekSong(Math.round(value * duration * 1000))
//           // }
//         />
//         <VolumeControl />
//       </div>
//     );
//   };
// }

// export default withPlayer(SongsPlayer);
export default SongsPlayer;
