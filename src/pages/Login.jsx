import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { LoginContext } from "../components/context/LoginContext";
import axios from "axios";
import {
  start_login,
  login_success,
  login_failure,
} from "../components/constants/actionTypes.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(LoginContext);
  const [loginData, setLoginData] = useState({
    account: undefined,
    password: undefined,
  });
  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    dispatch({ type: start_login });
    try {
      console.log(loginData);
      const res = await axios.post("/auth/login", loginData);
      console.log(res.data.userData);
      dispatch({ type: login_success, payload: res.data.userData });
      navigate("/");
    } catch (error) {
      console.log(error.respose);
      dispatch({ type: login_failure, payload: error.response.data });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="container max-w-[15%]">
          <h1 className="text-2xl font-bold">登入</h1>
          <input
            id="account"
            v-model="datamsg.username"
            type="text"
            placeholder="帳號"
            class="mt-8 block w-full p-3 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            onChange={handleChange}
          />
          <input
            id="password"
            v-model="datamsg.password"
            type="password"
            placeholder="密碼"
            class="my-5 block w-full p-3 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            onChange={handleChange}
          />

          <div class="mt-3">
            <div
              onClick={handleClick}
              class="w-full text-center bg-slate-500 hover:bg-slate-600 font-bold text-xl rounded-md p-4 cursor-pointer select-none"
            >
              登入
            </div>
          </div>
          <Link to="/register">
            <p className="hover:underline mt-5">註冊 & 創建一個帳號</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
