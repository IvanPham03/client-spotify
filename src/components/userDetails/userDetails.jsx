import React, { useState } from "react";

import "./userDetails.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setPause } from "../../redux-toolkit/slices/audioSlice";
import meomeo from '../../utilities/ass/meomeo.jpg'
const header = props => {
  const navigate =  useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(state => state.user.user)
  const play = useSelector(state => state.audio.isPlaying)
  const dispatch = useDispatch()
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    localStorage.removeItem('accessToken')
    await dispatch(setPause())
    alert("Đăng xuất thành công!")
    navigate("/login")
  };
  const handleLogin = async() =>{
    await dispatch(setPause())
    navigate("/login")
  }
  return (
    <div className="mt-4 w-[100px]">
      <div onClick={toggleModal} className=" flex items-center gap-2">
        <img
          alt="user"
          className="h-10 w-10 fill rounded-full"
          src={meomeo}
        />
        <p className="">
          {user !== null ? user.username : "Tài khoản"}
        </p>
      </div>
      {isOpen &&
        <div className="dropdown text-right mt-2 bg-black rounded w-[100px]">
          <ul>
            <li className="p-2 hover:opacity-40">
              <button onClick={() => navigate("/dev")}>
                Cài đặt
              </button>
            </li>
            <li className="p-2 hover:opacity-40">
              {
                user !== null ? <button onClick={handleLogout}>Đăng xuất</button> : <button onClick={handleLogin}>Đăng nhập</button>
              }
            </li>
          </ul>
        </div>}
    </div>
  );
};

export default header;
