import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtrack, fetchTrack } from "./redux-toolkit/slices/trackSlice";
import Spinner from "./components/spinner/spinner";
import LeftSection from "./containers/leftSection/leftSection";
import MainSection from "./containers/mainSection/mainSection";
import RightSection from "./containers/rightSection/rightSection";
import { fetchAudio } from "./redux-toolkit/slices/audioSlice";
import { fetchUser } from "./redux-toolkit/slices/userSlice";
import { fetchPlaylist } from "./redux-toolkit/slices/playlistSlice";
import "./App.css";

// function component
const App = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTrack("01a5291f-9318-44d2-aaed-0d748675acd5"));
        await dispatch(fetchAudio("01a5291f-9318-44d2-aaed-0d748675acd5"));
        if(token){
          // console.log("hello");
          await dispatch(fetchUser());
        }
        // Delay 1 giây trước khi đặt loading thành false
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Dispatch failed:", error);
        // Xử lý lỗi nếu các dispatch không thành công
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="app">
      <Spinner loading={loading}>
        <LeftSection />
        <MainSection />
        <RightSection />
      </Spinner>
    </div>
  );
};

export default App;
