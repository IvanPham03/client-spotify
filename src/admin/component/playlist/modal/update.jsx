import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalEdit } from "../../../../redux-toolkit/slices/uiSlice";
import axios from "../../../../axios";
import { fetchPlaylist } from "../../../store/slices/playlistSlice";
const update = props => {
  const dispacth = useDispatch();
  const modal = useSelector(state => state.ui.modal);
  const user = useSelector(state => state.user.user);
  const [create, setCreate] = useState(null);
  const [update, setUpdate] = useState(null);
  const [playlistName, setPlaylistName] = useState(null);
  const [playlistDescription, setPlaylistDescription] = useState(null);
  const handleClickCancel = () => {
    dispacth(setModalEdit(false));
  };

  const formatDateTime = dateTimeString => {
    // Tách ngày và thời gian từ chuỗi đầu vào
    const datePart = dateTimeString.substring(0, 8); // Lấy phần ngày: YYYYMMDD
    const timePart = dateTimeString.substring(9, 15); // Lấy phần thời gian: HHmmss

    // Tạo đối tượng Date từ các thành phần được tách
    const year = datePart.substring(0, 4);
    const month = datePart.substring(4, 6);
    const day = datePart.substring(6, 8);

    const hours = timePart.substring(0, 2);
    const minutes = timePart.substring(2, 4);
    const seconds = timePart.substring(4, 6);

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  };

  const handleSubmit = async () => {
    try {
      const playlistId =
        props.playlistUpdate !== null ? props.playlistUpdate.id : "";
      const userId = user.id;
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
        playlistDescription: playlistDescription,
        playlistName: playlistName,
        createAt: create,
        updateOn: update
      };

      if (playlistId !== "" && userId !== null) {
        const res = await axios.put(
          `Playlist/update/${playlistId}/by/${userId}`,
          data,
          {
            config
          }
        );
        if(res.data){
          alert("cập nhật thành công")
          dispacth(setModalEdit(false))
          dispacth(fetchPlaylist())
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => {
      if (modal) {
        setPlaylistDescription(props.playlistUpdate.playlistDescription);
        setPlaylistName(props.playlistUpdate.playlistName);
        setUpdate(formatDateTime(props.playlistUpdate.updateOn));
        setCreate(formatDateTime(props.playlistUpdate.createAt));
      }
    },
    [modal]
  );

  const handleDelete = async () => {
    try {
      const playlistId =
        props.playlistUpdate !== null ? props.playlistUpdate.id : "";
      const userId = user.id;
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

      if (playlistId !== "" && userId !== null) {
        const res = await axios.delete(
          `Playlist/${playlistId}/deleteBy/${userId}`,
          {
            config
          }
        );
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Xử lý sự kiện thay đổi giá trị của input
  const handleInputChange = event => {
    setCreate(event.target.value); // Cập nhật giá trị state từ sự kiện onChange
  };
  const handleInputUpdate = event => {
    setUpdate(event.target.value); // Cập nhật giá trị state từ sự kiện onChange
  };
  const handleInputDescription = event => {
    setPlaylistDescription(event.target.value); // Cập nhật giá trị state từ sự kiện onChange
  };
  const handleInputPlaylististname = event => {
    setPlaylistName(event.target.value); // Cập nhật giá trị state từ sự kiện onChange
  };
  return (
    <div>
      <div className={`playlist-Modal ${modal ? "active" : ""}`}>
        <div className="modal-content mt-14">
          <div className="text-center my-5">
            <h1 className="text-2xl">Thông tin</h1>
          </div>
          <div className="modal-body mb-5">
            <form class="mx-2 mt-5">
              <div class="mb-5 flex justify-between">
                <label
                  for="id"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  readOnly
                  value={
                    props.playlistUpdate !== null ? props.playlistUpdate.id : ""
                  }
                />
              </div>
              <div class="mb-5 flex justify-between">
                <label
                  for="playlistName"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên
                </label>
                <input
                  type="text"
                  id="playlistName"
                  onChange={handleInputPlaylististname}
                  value={playlistName !== null ? playlistName : ""}
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-5 flex justify-between">
                <label
                  for="playlistDescription"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mô tả
                </label>
                <input
                  type="text"
                  onChange={handleInputDescription}
                  id="playlistDescription"
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  value={
                    playlistDescription !== null ? playlistDescription : ""
                  }
                />
              </div>
              <div class="mb-5 flex justify-between">
                <label
                  for="imgPlaylist"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="imgPlaylist"
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  value={
                    props.playlistUpdate !== null
                      ? props.playlistUpdate.imgPlaylist
                      : ""
                  }
                />
              </div>

              <div class="mb-5 flex justify-between">
                <label
                  for="createAt"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Thời gian tạo
                </label>
                <input
                  type="datetime-local"
                  id="createAt"
                  value={create !== null ? create : ""}
                  onChange={handleInputChange}
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-5 flex justify-between">
                <label
                  for="updateOn"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Thời gian chỉnh sửa
                </label>
                <input
                  type="datetime-local"
                  id="updateOn"
                  value={update !== null ? update : ""}
                  onChange={handleInputUpdate}
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-5 flex justify-between">
                <label
                  for="user"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Người tạo
                </label>
                <input
                  readOnly
                  type="text"
                  id="user"
                  value={
                    props.playlistUpdate !== null ? props.playlistUpdate.id : ""
                  }
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>
              <div class="mb-5 flex justify-between">
                <label
                  for="playlistPolicy"
                  class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hiển thị
                </label>
                <input
                  type="text"
                  id="playlistPolicy"
                  class="max-w-sm shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  readOnly
                  value={
                    props.playlistUpdate !== null
                      ? props.playlistUpdate.playlistPolicy
                      : ""
                  }
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClickCancel}
                  type="button"
                  class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Xoá
                </button>

                <button
                  type="btn"
                  onClick={handleSubmit}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${modal ? "active" : ""}`}
        // onClick={this.onCancel}
      />
    </div>
  );
};

export default update;

//    {/* Open the modal using document.getElementById('ID').showModal() method */}
{
  /* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */
}
