import React from "react";

import Button from "./controlButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAudioAndPlay,
  fetchAudioAndPlayRandom,
  toggleLooping,
  toogleShuffling
} from "../../../redux-toolkit/slices/audioSlice";
import { fetchTrack, fetchTrackRandom, remove } from "../../../redux-toolkit/slices/trackSlice";

const songsControl = props => {
  const dispatch = useDispatch();
  const isShuffling = useSelector(state => state.audio.isShuffling);
  const track = useSelector(state => state.track.value);
  const isLooping = useSelector(state => state.audio.isLooping);
  const pre = useSelector(state => state.track.pre)
  // console.log(isLooping);
  // console.log(isShuffling);

  const handleNext = async () => {
    console.log(track);
    console.log(isShuffling);
    if (isLooping) {
      try {
        await dispatch(fetchAudioAndPlay(track.id));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await dispatch(fetchAudioAndPlayRandom());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePrev = async() =>{
    if(pre.length >2){
      await dispatch(fetchAudioAndPlay(pre[pre.length-2].id));
      await dispatch(fetchTrack(pre[pre.length-2].id));
      await dispatch(remove(pre[pre.length-2].id))
      await dispatch(remove(pre[pre.length-1].id))
    }
    else{
      await dispatch(fetchAudioAndPlayRandom());
    }
   
  }
  return (
    <div className="song-control">
      <Button
        // onClick={() => props.shuffle(!props.shuffleActive)}
        onClick={() => dispatch(toogleShuffling())}
        className={"shuffle-song" + (isShuffling ? " active" : "")}
        icon="fa-random"
      />
      <Button
        className="back-song"
        icon="fa-step-backward reverse"
        onClick={() => handlePrev()}
      />
      <Button
        className="play-btn"
        onClick={props.playing ? props.handlePlay : props.handlePlay}
        icon={
          "play-btn " +
          (props.playing ? "fa-pause-circle-o" : "fa-play-circle-o")
        }
        playBtn
      />
      <Button
        className="next-song"
        icon="fa-step-forward forward"
        // onClick={props.nextSong}
        onClick={() => handleNext()}
      />
      <Button
        onClick={() =>
          // props.repeatContext(props.repeatActive ? 'off' : 'context')
          dispatch(toggleLooping())}
        className={"repeat-song" + (isLooping ? " active" : "")}
        icon="fa-retweet"
      />
    </div>
  );
};

export default songsControl;
