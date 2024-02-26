import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faToriiGate,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { LoginContext } from "../components/context/LoginContext";
import { logout } from "../components/constants/actionTypes.js";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(LoginContext);
  const location = useLocation();
  const submit =
    location.pathname !== "/register" && location.pathname !== "/login"
      ? true
      : false;
  const tag = [
    { icon: faBed, name: "住宿" },
    { icon: faPlane, name: "航班" },
    { icon: faCar, name: "租車" },
    { icon: faToriiGate, name: "景點/活動" },
    { icon: faTaxi, name: "機場計程車" },
  ];
  const [tagActive, setTagActive] = useState("住宿");

  const changeTag = (name) => {
    setTagActive(name);
    console.log(name);
    if (name === "住宿") navigate("/");
  };

  const handleClick = () => {
    dispatch({ type: logout });
    if (location.pathname.includes("back")) navigate("/");
  };
  return (
    <div className="bg-slate-700 py-5">
      <div className="container mx-auto max-w-screen-xl">
        <div className="lineOne flex justify-between items-center">
          <div className="left">
            <Link to="/">
              <span className="text-2xl font-bold cursor-pointer text-slate-100">
                Looking.com
              </span>
            </Link>
          </div>
          <div className="right flex items-center">
            <span className="text-white text-lg  mr-3">TWD</span>
            <button className="w-6 h-6 rounded-full bg-cover bg-center bg-flag  mr-10 "></button>
            {submit && (
              <div>
                {user ? (
                  <div className="flex items-center gap-4">
                    {user.isAdmin && (
                      <Link to="/backOrderslist">
                        <button className=" px-3 py-2 border border-white border-opacity-50 rounded-lg  text-white hover:bg-opacity-20 hover:bg-white ease-in-out duration-300">
                          進入後台
                        </button>
                      </Link>
                    )}
                    <span className="inline-block w-10 h-10 rounded-full bg-cover bg-mugShot"></span>
                    <span className="text-xl text-white">{user.username}</span>
                    <button
                      onClick={handleClick}
                      className="px-3 py-2 border border-white border-opacity-50 rounded-lg  text-white hover:bg-opacity-20 hover:bg-white ease-in-out duration-300"
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/register">
                      <button className="px-3 py-2 border border-white border-opacity-50 rounded-lg mr-3  text-white hover:bg-opacity-20 hover:bg-white ease-in-out duration-300">
                        註冊
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="px-3 py-2 border border-white border-opacity-50 rounded-lg  text-white hover:bg-opacity-20 hover:bg-white ease-in-out duration-300">
                        登入
                      </button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="lineTwo flex gap-7 mt-5 ">
          {submit &&
            tag.map((item) => (
              <div
                className={`px-4 py-2 text-white rounded-full cursor-pointer  hover:bg-opacity-10 hover:bg-white ${
                  tagActive === item.name
                    ? "border border-white bg-white bg-opacity-10"
                    : ""
                }`}
                key={item.name}
                onClick={() => changeTag(item.name)}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="ml-2">{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
