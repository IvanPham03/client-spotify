import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "../../axios";
import { setModal } from "../../redux-toolkit/slices/uiSlice";
import {
  fetchPlaylistsMenu,
  updatePlaylist
} from "../../store/actions/playlistActions";

import "./modal.css";
import song from "../../containers/mainSection/images/song.png";
import meomeo from "../../utilities/ass/meomeo.jpg";
import { useNavigate } from "react-router";
import { fetchPlaylist } from "../../redux-toolkit/slices/playlistSlice";
const modal = () => {
  const modal = useSelector(state => state.ui.modal);
  const [title, setTitle] = useState("Tên danh sách");
  const [description, setDescriptione] = useState("Mô tả");
  const [selectedValue, setSelectedValue] = useState('public');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  console.log(user);
  useEffect(
    () => {
      console.log(modal);
    },
    [modal]
  );

  const handleCreateplaylist = async () => {
    if (title) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return null; // Xử lý khi không tìm thấy token
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        };

        const data = {
          playlistName: title,
          playlistDescription: description,
          playlistPolicy: selectedValue
        };
        const response = await axios.post(`Playlist/create/${user.id}`, data, config);
        console.log(response);
        if (response) {
          alert(`Tạo ${title} thành công!`);
          dispatch(setModal(false))
          dispatch(fetchPlaylist(user.id))
        }
      } catch (error) {
        alert(`Tạo ${title} thất bại!`)
        console.log(error);
      }
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <div className={`playlist-Modal ${modal ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-title">
            <h4>Tạo mới danh sách bài hát</h4>
          </div>
          <div className="modal-body">
            <div className="title-input">
              <span>Tên danh sách</span>
              <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="Playlist name"
                maxLength="100"
                className="bg-slate-500"
              />
              <div className="counter">{`${title.length}/100`}</div>
              <select
                  value={selectedValue} // Set giá trị của select bằng state
                  onChange={() => setSelectedValue(selectedValue)}
                id="countries"
                class="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="private">Riêng tư</option>
                <option value="public">Công khai</option>
              </select>
              <div className="description">
                <div className="image">
                  <span>Image</span> <img alt="song" src={meomeo} />
                </div>
                <div className="text">
                  <span>Description</span>
                  <div className="counter">{`${description.length}/300`}</div>
                  <textarea
                    value={description}
                    onChange={event => setDescriptione(event.target.value)}
                    placeholder="Give your playlist a catchy description."
                    maxLength="300"
                    className="bg-slate-500"
                  />
                </div>
              </div>
              <div
                className={`error-message h-[100px] ${error ? "active" : ""}`}
              >
                <i className="fa fa-exclamation" aria-hidden="true" />
                <span className="text-sm">
                  Vui lòng nhập tên danh sách bài hát!
                </span>
              </div>
              <div className="btn-section mt-5">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    dispatch(setModal(false));
                  }}
                >
                  Cancel
                </button>
                <button className="save-btn" onClick={handleCreateplaylist}>
                  Tạo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${modal ? "active" : ""}`}
        onClick={() => {
          dispatch(setModal(false));
        }}
      />
    </div>
  );
};

export default modal;
