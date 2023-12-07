import React, { useEffect, useState } from "react";
import { setaddPlaylist } from "../../redux-toolkit/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";

const addPlaylist = props => {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.addPlaylist);
  const playlists = useSelector(state => state.playlist.playlist);
  const [selectedValue, setSelectedValue] = useState();
  console.log(playlists);
  const trackId = useSelector(state => state.addPlaylist.trackId)
  const handleAddTrackToPlaylist = async() =>{
    try {
      console.log(trackId);
      console.log(selectedValue);
      console.log(playlists);
      const res = await axios.post(`tracks/${trackId}/add-to-playlist/${selectedValue}`)
      if(res){
        alert("Thêm bài hát thành công!")
        dispatch(setaddPlaylist(false))
      }
      else{
        alert("Thêm không thành công!")
      }
    } catch (error) {
      alert("Thêm không thành công!")
      console.log(error);
    }
  }
  useEffect(() => {
    if (playlists.length > 0) {
      setSelectedValue(playlists[0].id); // Đặt giá trị ban đầu là ID của playlist đầu tiên
    }
  }, [playlists]);
  return (
    <div className="max-w-sm">
      <div className={`playlist-Modal  ${modal ? "active" : ""}`}>
        <div className="modal-content max-w-sm">
          <div className="modal-title">
            <h4>Thêm vào danh sách</h4>
          </div>
          <div className="modal-body max-w-sm">
            <div>
              <div className="flex justify-center">
                <select
                  value={selectedValue} // Set giá trị của select bằng state
                  onChange={() => setSelectedValue(selectedValue)}
                  id="countries"
                  class="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mx-12 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {playlists.map((playlist, index) =>
                    <option key={index} value={playlist.id}>
                      {playlist.playlistName}
                    </option>
                  )}
                </select>
              </div>

              <div className="btn-section mt-5">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    dispatch(setaddPlaylist(false));
                  }}
                >
                  Huỷ
                </button>
                <button className="save-btn" onClick={()=>handleAddTrackToPlaylist()}>Thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${modal ? "active" : ""}`}
        onClick={() => {
          dispatch(setaddPlaylist(false));
        }}
      />
    </div>
  );
};

export default addPlaylist;
