import React, { useState } from "react";
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

const msToMinutesAndSeconds = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = (ms % 60000 / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const song = props => {
  const dispatch = useDispatch();
  const play = useSelector(state => state.audio.isPlaying);
  const track = useSelector(state => state.track.value);
  const [clickTrack, setClickTrack] = useState();
  const active = track.ID === props.item?.Track?.ID && play || track.ID ===  props.item?.id && play;
  const buttonClass = active ? "fa-pause-circle-o" : "fa-play-circle-o";
  const artists = props.item.artists ? props.item.artists.length : 0;


  const handleClickPlay = () => {
    dispatch(fetchAudioAndPlay(props.item.Track.ID));
    dispatch(fetchTrack(props.item.Track.ID));
    setClickTrack(props.item.Track.ID);
  };
  const handleClickPlay2 = () => {
    dispatch(fetchAudioAndPlay(props.item.id));
    dispatch(fetchTrack(props.item.id));
    setClickTrack(props.item.id);
  };

  const formatDate = dateString => {
    const dateTime = new Date(dateString);
    const dateOnly = dateTime.toISOString().split("T")[0]; // Lấy ngày
    return dateOnly;
  };

  console.log(props.item);
  console.log(props.songList);
  return props.songList == true
    ? <li className={"w-full user-song-item" + (active ? " active" : "")}>
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
            {props.item.Track.name !== null ? props.item.Track.name : ""}
          </p>
        </div>
        <div className="song-artist mt-2">
          <p>
            {props.item.Track.ArtistTracks.$values
              ? props.item.Track.ArtistTracks.$values.map((a, i) =>
                  <span key={i}>
                    <span
                      className="artist"
                      onClick={() => props.onArtistClick(a.id)}
                    >
                      {a.user.userName}
                    </span>
                    {props.item.Track.ArtistTracks.$values.length !== i + 1
                      ? <span>, </span>
                      : null}
                  </span>
                )
              : ""}
          </p>
        </div>
        <div className="song-explicit mt-2">
          {props.item.Track
            ? <p className="">
                {formatDate(props.item.Track.createAt)}
              </p>
            : null}
        </div>
        <div className="w-[100px] ml-6 mt-2">
          <p className="">5:00</p>
        </div>
      </li>
    : <li className={"user-song-item" + (active ? " active" : "")}>
        <div className="play-song -mt-2" onClick={handleClickPlay2}>
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
            {props.item.name !== null ? props.item.name : ""}
          </p>
        </div>
        <div className="song-artist mt-2">
          <p>
            {props.item.ArtistTracks
              ? props.item.map((a, i) =>
                  <span key={i}>
                    <span className="artist">
                      // onClick={() => props.onArtistClick(a.id)}
                      "update"
                    </span>
                    {props.item.Track.ArtistTracks.$values.length !== i + 1
                      ? <span>, </span>
                      : "update"}
                  </span>
                )
              : "updating"}
          </p>
        </div>
        <div className="song-explicit mt-2">
          {props.item
            ? <p className="">
                {formatDate(props.item.createAt)}
              </p>
            : null}
        </div>
        <div className="w-[100px] ml-9 mt-2">
          <p className="">5:00</p>
        </div>
      </li>;
};

export default song;
