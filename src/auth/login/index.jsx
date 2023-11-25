import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../ass/meomeo.jpg";
import { useState } from "react";
import axiosInstance from "../../axios";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!email || !password) {
      setError('Email và Password không được để trống');
      return;
    }
    handleLogin()
  } 

  const handleLogin = async () =>{
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axiosInstance.post("api/Authenticate/login", data);
      console.log(response.data.token);
      localStorage.setItem('accessToken', response.data.token);
      if(response.status){
        alert("Đăng nhập thành công")
        navigate("/")
      }
      else{
        alert("Đăng nhập thất bại")
      }
    } catch (error) {
      console.error('POST error:', error);
    }
  }
  return (
    <div className="h-screen w-screen">
      <div className="w-full flex flex-wrap justify-center">
        {/* <!-- Login Section --> */}
        <div className="w-1/2 flex flex-col items-center mt-10">
          <div className="flex ">
            <Link to="/" className="text-xl w-20 h-20 block rounded">
              <img
                src={logo}
                alt="logo"
                className="rounded w-20 h-20 object-cover"
              />
              <p className="text-white text-center">FiveMen</p>
            </Link>
          </div>

          <div className="flex w-full flex-col justify-center my-8 pt-8 px-8 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <form className="flex flex-col pt-3" onSubmit={handleSubmit}>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email 
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={()=>setError("")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onFocus={()=>setError("")}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
              <input
                type="submit"
                value="Đăng nhập"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 rounded"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className="underline">
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
