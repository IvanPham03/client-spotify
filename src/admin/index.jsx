import React, { useEffect } from "react";
import SideMenu from "./sideMenu/index";
import Main from "./main";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux-toolkit/slices/userSlice";
export const index = () => {
  const token  = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  useEffect(()=>{
    if(token){
      dispatch(fetchUser())
    }
  }, [])
  return (
    <div className="flex">
      <SideMenu />

      <div className="ml-2 mt-4 h-screen w-full mr-2">
        <Main />
       
      </div>
      
    </div>
  );
};

export default index;
