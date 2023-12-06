import React, { Component } from "react";

import { connect, useDispatch, useSelector } from "react-redux";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import Browse from "../../components/sections/browse/browser";
import Songs from "../../components/sections/songList/songList";
import Playlist from "../../components/sections/playlist/playlist";
import Artist from "../../components/sections/artist/artist";
import Album from "../../components/sections/album/album";
import Search from "../../components/sections/search/search";
import Albums from "../../components/sections/top/albums";
import Artists from "../../components/sections/top/artists";
import Modal from "../../components/playlistModal/modal";
import defaultProfile from "./images/profile.png";
import meomeo from '../../utilities/ass/meomeo.jpg'
import "./mainSection.css";

const MainSection = () => {
  let img = defaultProfile;
  const user = useSelector(state => state.user.user)
  const view  = useSelector(state => state.ui.view)
  return (
    <div className="main-section">
      <Header username={user ? user.userName : "user"} img={meomeo} />
      <Modal />
      <div className="main-section-container">
        {/* {view === "browse" ? <Browse /> : null} */}
        {view === "playlist" ? <Playlist /> : null}
        {view === "recently" ? <Songs recently /> : null}
        {view === "songs" ? <Songs /> : null}
        {view === "artist" ? <Artist /> : null}
        {view === "album" ? <Album /> : null}
        {view === "search" ? <Search /> : null}
        {view === "albums" ? <Albums /> : null}
        {view === "artists" ? <Artists /> : null}
      </div>
      <Footer />
    </div>
  );
};

export default MainSection;
