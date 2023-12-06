import React, { Component, useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import "./siderMenu.css";

import MenuItem from "./components/menuItem";
import {
  setView
} from "../../redux-toolkit/slices/uiSlice";
import {fetchPlaylistTrack} from '../../redux-toolkit/slices/playlistTrack'
import { fetchPlaylistOnly } from "../../redux-toolkit/slices/playlistOnly";

const sectionOne = [{ name: "Browse", view: "browse", id: 1 }];

const sectionTwo = [
  { name: "Podcast", view: "recently", id: 2 },
  { name: "Songs", view: "songs", id: 3 },
  { name: "Albums", view: "albums", id: 4 },
  { name: "Artists", view: "artists", id: 5 }
];

const SiderMenu = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("browse");
  const playlists = useSelector(state => state.playlist.playlist);
  if (playlists !== null) {
    console.log(playlists);
  }

  const generateItems = (items, playlist = false) => {
    return items.map(item =>
      <MenuItem
        key={item.id}
        title={item.name}
        active={active === item.id}
        onClick={() => setActiveClick(item, playlist)}
      />
    );
  };
  const generatePlaylist = (items, playlist = false) => {
    return items.map(
      item =>
        <MenuItem
          key={item.id}
          title={item.playlistName}
          active={active === item.id}
          onClick={() => setActiveClick(item, playlist)}
        />
      // <p key={item.ID}>{item.ID}</p>
    );
  };
  const setActiveClick = (item, playlist) => {
    setActive(item.id);
    if (playlist) {
      // dispatch(fetchPlaylistTrack(item.id));
      // dispatch(fetchPlaylistOnly(item.id))
      dispatch(setView('playlist'));
    } else {
      dispatch(setView(item.view || "songs"));
    }
  };
  return (
    <ul className="side-menu-container">
      {/* {generateItems(sectionOne)} */}
      <h3 className="library-header">Your Library</h3>
      {generateItems(sectionTwo)}
      <div className="user-playlist-container">
        <h3 className="library-header">Playlists</h3>
        {playlists !== null ? generatePlaylist(playlists, true) : ""}
      </div>
    </ul>
  );
};


export default SiderMenu;
