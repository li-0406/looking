import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: undefined,
    // email: undefined,
    password: undefined,
    checkpassword: undefined,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async () => {
    if (
      !registerData.username ||
      !registerData.password ||
      registerData.password !== registerData.checkpassword
    )
      return;
    try {
      const res = await axios.post("/auth/register", registerData);
      console.log(res);
      setError("");
      navigate("/login", res);
    } catch (error) {
      setError(error.response.data.Message);
      console.log(error.response.data.Message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <form className="container max-w-[15%]">
          <h1 className="text-2xl font-bold">建立帳戶</h1>
          <input
            id="username"
            type="text"
            placeholder="新帳號"
            className={`${
              !registerData.username ? "border-red-500" : "border-slate-300"
            } mt-8 block w-full p-3 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200  `}
            onChange={handleChange}
          />
          {!registerData.username && (
            <span className="text-red-700 font-bold pt-1 block">
              帳號為必填
            </span>
          )}
          <input
            id="password"
            type="password"
            placeholder="新密碼"
            className={`${
              !registerData.password ? "border-red-500" : "border-slate-300"
            } mt-8 block w-full p-3 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200  `}
            onChange={handleChange}
          />
          {!registerData.password && (
            <span className="text-red-700 font-bold pt-1 block">
              密碼為必填
            </span>
          )}
          <input
            id="checkpassword"
            type="password"
            placeholder="再次輸入密碼"
            className={`${
              registerData.password !== registerData.checkpassword
                ? "border-red-500"
                : "border-slate-300"
            } mt-8 block w-full p-3 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200  `}
            onChange={handleChange}
          />
          {registerData.password !== registerData.checkpassword &&
            registerData.checkpassword && (
              <span className="text-red-700 font-bold pt-1 block">
                輸入密碼不同
              </span>
            )}
          <div className="mt-3" onClick={handleClick}>
            <div className="w-full text-center bg-slate-500 hover:bg-slate-600 font-bold text-xl rounded-md p-4 cursor-pointer select-none">
              註冊
            </div>
          </div>
          <Link to="/login">
            <p className="hover:underline mt-5">已有帳號? 按這裡登入</p>
          </Link>
          {error && <p className="text-red-700 font-bold pt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
