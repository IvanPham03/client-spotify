import React, { useEffect, useState } from "react";
import moment from "moment";

import withUiActions from "../../../hoc/uiHoc";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAudio,
  setPlay,
  togglePlaying,
  fetchAudioAndPlay
} from "../../../redux-toolkit/slices/audioSlice";
import { fetchTrack } from "../../../redux-toolkit/slices/trackSlice";
import axios from '../../../axios'
const msToMinutesAndSeconds = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = (ms % 60000 / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const song = props => {
  const dispatch = useDispatch();
  const play = useSelector(state => state.audio.isPlaying);
  const track = useSelector(state => state.track.value);
  const [artist, setArtist] = useState(null)
  const [clickTrack, setClickTrack] = useState();
  // console.log(props);
  const active = track.id ===  props.item?.id && play;
  const buttonClass = active ? "fa-pause-circle-o" : "fa-play-circle-o";

  // const event = active
  //   ? props.pauseSong
  //   : () => props.playSong(props.uri, props.offset);

  const handleClickPlay = () => {
    dispatch(fetchAudioAndPlay(props.item.id));
    dispatch(fetchTrack(props.item.id));
    setClickTrack(props.item.id);
  };

  const formatDate = (dateString) => {
    // Extracting year, month, day, hours, minutes, and seconds from the input string
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    // Create a new Date object with the extracted date components
    const date = new Date(`${year}-${month}-${day}`);

    // Get the formatted date in dd-mm-yy format
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    
    return formattedDate;
  };
  const reqArtist = async(id) => {
    try {
      const response = await axios.get(`/api/Authenticate/users/${id}`)
      setArtist(response.data.username)
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(props.item);
  useEffect(() => {
    if( props.item.userTracks && props.item.userTracks.length > 0){
      if(props.item.userTracks[0].user && props.item.userTracks[0].user.id !== undefined){
        reqArtist(props.item.userTracks[0].user.id) 
      }
      else if(props.item.userTracks[0].user && props.item.userTracks[0].user !== undefined){
       reqArtist(props.item.userTracks[0].user) 
      }
      else if(props.item.userTracks[0] && props.item.userTracks[0] !== undefined){
        console.log("hihi" + props.item.userTracks[0]);
        reqArtist(props.item.userTracks[0]) 
       }
    }
  }, []);

  return <li className={"user-song-item" + (active ? " active" : "")}>
        <div className="play-song -mt-2" onClick={handleClickPlay}>
          <i className={`fa ${buttonClass} play-btn mt-1`} aria-hidden="true" />
          {active ? <i className="fa fa-volume-up" /> : null}
        </div>
        <div className="add-remove-section -mt-2 pb-2">
          {props.contains
            ? <i
                className="fa fa-check"
                aria-hidden="true"
                // onClick={props.onDelete}
              />
            : <i
                className="fa fa-plus"
                aria-hidden="true"
                // onClick={props.onAdd}
              />}
        </div>
        <div className="song-title mt-2">
          <p>
            {props.item.trackName !== null ? props.item.trackName : ""}
          </p>
        </div>
        <div className="song-artist mt-2">
          <p>
            <span>
              <span
                className="artist"
                // onClick={() => props.onArtistClick(a.id)}
              >
                {artist ? artist : "null"}
              </span>
            </span>
          </p>
        </div>
        <div className="song-explicit mt-2">
          {props.item
            ? <p className="">
                {formatDate(props.item.createAt)}
              </p>
            : null}
        </div>
        <div className="w-[100px] ml-12 mt-2">
          <p className="">5:00</p>
        </div>
      </li>
};

export default song;
