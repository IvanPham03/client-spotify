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
import TrackUpdate from "../component/track/update";
import AlbumUpdate from "../component/album/update";
import UserUpdate from "../component/user/update";
export const index = () => {
  const dispacth = useDispatch();
  const [albumsUpdate, setAlbumsUpdate] = useState(null);
  const [playlistUpdate, setPlaylistUpdate] = useState(null);
  const [trackUpdate, setTrackUpdate] = useState(null);
  const [userUpdate, setUserUpdate] = useState(null);
  const view = useSelector(state => state.uiAdmin.view);
  const playlists = useSelector(state => state.playlistAdmin.value);
  const albums = useSelector(state => state.albumAdmin.value);
  const tracks = useSelector(state => state.trackAdmin.value);
  const users = useSelector(state => state.userAdmin.value);
  const user = useSelector(state => state.user.user);
  const playlistModal = useSelector(state => state.ui.modal);
  const trackModal = useSelector(state => state.ui.track);
  const albumModal = useSelector(state => state.ui.album);
  const userModal = useSelector(state => state.ui.user);
  const dataPlaylistModal = data => {
    // console.log(data);
    setPlaylistUpdate(data);
  };

  const dataTrackModal = data => {
    // console.log(data);
    setTrackUpdate(data);
  };
  const dataAlbumModal = data => {
    console.log(data);
    setAlbumsUpdate(data);
  };
  const dataUserModal = data => {
    console.log(data);
    setUserUpdate(data);
  };
  useEffect(
    () => {
      if (view === "playlist") {
        dispacth(fetchPlaylist(user.id));
      } else if (view === "album") {
        dispacth(fetchAlbum());
      } else if (view === "track") {
        dispacth(fetchTrack());
      } else if (view === "user") {
        dispacth(fetchUser());
      }
    },
    [view]
  );

  return (
    <div className="max-w-[1200px] overflow-x-auto">
      {playlistModal === true
        ? <EditPlaylist playlistUpdate={playlistUpdate} />
        : null}
      {trackModal === true ? <TrackUpdate trackUpdate={trackUpdate} /> : null}
      {userModal === true ? <UserUpdate userUpdate={userUpdate} /> : null}
      {albumModal === true ? <AlbumUpdate albumUpdate={albumsUpdate} /> : null}

      {view === "dev" ? <Dev /> : null}
      {view === "playlist"
        ? <Playlist
            playlists={playlists}
            dataPlaylistModal={dataPlaylistModal}
          />
        : null}
      {view === "track"
        ? <Track tracks={tracks} dataTrackModal={dataTrackModal} />
        : null}
      {view === "user" ? <User users={users} dataUserModal={dataUserModal} /> : null}
      {view === "album"
        ? <Album albums={albums} handleAlbumdata={dataAlbumModal} />
        : null}
    </div>
  );
};

export default index;
