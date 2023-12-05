import React, { useEffect, useState } from "react";
import Track from "../component/track";
import Album from "../component/album";
import Playlist from "../component/playlist";
import User from "../component/user";
import Dev from "../../Error/developing";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/slices/userSlice";
import { fetchTrack } from "../store/slices/trackSlice";
import { fetchPlaylist } from "../store/slices/playlistSlice";
import { fetchAlbum } from "../store/slices/albumSlice";
import EditPlaylist from "../component/playlist/modal/update";
export const index = () => {
  const dispacth = useDispatch();
  const [albumsUpdate, setAlbumsUpdate] = useState(null);
  const [playlistUpdate, setPlaylistUpdate] = useState(null);
  const [trackUpdate, setTrackUpdate] = useState(null);
  const [usersUpdate, setUserUpdate] = useState(null);
  const view = useSelector(state => state.uiAdmin.view);
  const playlists = useSelector(state => state.playlistAdmin.value);
  const albums = useSelector(state => state.albumAdmin.value);
  const tracks = useSelector(state => state.trackAdmin.value);
  const users = useSelector(state => state.userAdmin.value);
  const user = useSelector(state => state.user.user);

  const dataPlaylistModal = data => {
    // console.log(data);
    setPlaylistUpdate(data);
  };

  console.log(playlists);
  useEffect(
    () => {
      if (view === "playlist") {
        dispacth(fetchPlaylist(user.id));
        // setPlaylist(albums)
      } else if (view === "album") {
        dispacth(fetchAlbum());
        // setAlbums(albums)
      } else if (view === "track") {
        dispacth(fetchTrack());
        // setTrack(albums)
      } else if (view === "user") {
        dispacth(fetchUser());
        // setUser(albums)
      }
    },
    [view]
  );

  return (
    <div className="max-w-[1200px] overflow-x-auto">
      <EditPlaylist playlistUpdate={playlistUpdate} />
      {view === "dev" ? <Dev /> : null}
      {view === "playlist"
        ? <Playlist
            playlists={playlists}
            dataPlaylistModal={dataPlaylistModal}
          />
        : null}
      {view === "track" ? <Track tracks={tracks} /> : null}
      {view === "user" ? <User users={users} /> : null}
      {view === "album" ? <Album albums={albums} /> : null}
    </div>
  );
};

export default index;
