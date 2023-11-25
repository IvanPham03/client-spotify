import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../ass/meomeo.jpg";
import { useState } from "react";
import axiosInstance from "../../axios";
const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isStrongPassword = (password) => {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự, bao gồm ký tự hoa, thường và ký tự đặc biệt
    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return strongPasswordRegex.test(password);
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!email || !password || !confirmPassword || !name) {
      setError('Email và Password không được để trống');
      return;
    }
    if( password !== confirmPassword){
      setError('Mật khẩu không khớp');
    }
    if(!isStrongPassword(password)){
      setError('Mật khẩu có ít nhất 8 ký tự, bao gồm ký tự hoa, thường và ký tự đặc biệt');
    }
    handleRegister()
  } 
  const handleRegister = async() =>{
    const data = {
      Email: email,
      Password: password,
      UserName: name
    };
    try {
      const response = await axiosInstance.post("api/Authenticate/register", data);
      if(response.status){
        alert("Đăng ký thành công")
        navigate("/login")
      }
      setError("Vui lòng kiểm tra lại thông tin")
    } catch (error) {
      console.error('POST error:', error);
    }
  }
  return (
    <div className="w-full flex flex-wrap justify-center">
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

        <div className="w-full flex flex-col justify-center my-8 pt-8 px-8 lg:px-32">
          <p className="text-center text-3xl">Join Us.</p>
          <form
            className="flex flex-col pt-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col pt-4">
              <label htmlFor="name" className="text-lg">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                onFocus={()=>setError("")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@gmail.com"
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

            <div className="flex flex-col pt-4">
              <label htmlFor="confirm-password" className="text-lg">
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Password"
                onFocus={()=>setError("")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
            <input
              type="submit"
              value="Register"
              className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 rounded"
            />
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
