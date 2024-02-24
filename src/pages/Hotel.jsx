import React, { useRef, useState, useContext } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTag,
  faBanSmoking,
  faWheelchair,
  faXmark,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { LoginContext } from "../components/context/LoginContext";
import Reservationbtn from "../components/Reservationbtn";

const Hotel = () => {
  const { user } = useContext(LoginContext);
  const location = useLocation();
  const navgator = useNavigate();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  let comments = useRef(null);
  const [openSlider, setOpenSlider] = useState(false);
  const [sliderIndex, setSiderIndex] = useState(0);
  const [openReservation, setOpenReservation] = useState(false);

  const handleReservation = () => {
    if (user) {
      setOpenReservation(true);
    } else {
      navgator("/login");
    }
  };
  const close = () => {
    setOpenReservation(false);
  };
  const list = ["資訊&房價", "設施", "訂房須知", "房客評價"];
  const handleHover = (e) => {
    gsap.to(comments, {
      css: {
        display: "flex",
        opacity: 1,
      },
      ease: "power3.inOut",
    });
  };
  const handleHoverExit = (e) => {
    gsap.to(comments, {
      css: {
        display: "none",
        opacity: 0,
      },
      ease: "power3.inOut",
    });
  };

  const slideDirection = (direction) => {
    if (direction === "left") {
      sliderIndex === 0
        ? setSiderIndex(data.photos.length - 1)
        : setSiderIndex(sliderIndex - 1);
    } else {
      sliderIndex === data.photos.length - 1
        ? setSiderIndex(0)
        : setSiderIndex(sliderIndex + 1);
    }
  };

  return (
    <div>
      {/* 現在預定 */}
      {openReservation && (
        <Reservationbtn
          onClose={close}
          id={id}
          night={location.state.datesLength}
          pic={data.photos[0]}
        />
      )}
      {/* 點擊照片 */}
      {openSlider && (
        <div className="fixed w-full h-screen z-50 bg-black/80 flex justify-center items-center">
          <div className=" container max-w-screen-lg ">
            <div className="bg-slate-300 flex justify-between p-3 rounded-t-xl">
              <h1 className="text-2xl">{data.name}</h1>
              <span
                className="text-xl cursor-pointer"
                onClick={() => setOpenSlider(false)}
              >
                關閉 <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </span>
            </div>
            <div className="flex items-center justify-between bg-white p-5 rounded-b-xl ">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-4xl cursor-pointer flex-1 select-none"
                onClick={() => slideDirection("left")}
              />
              <img
                src={data.photos[sliderIndex]}
                alt=""
                className="w-[70%] rounded-xl select-none"
              />
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-4xl cursor-pointer flex-1 select-none"
                onClick={() => slideDirection("right")}
              />
            </div>
          </div>
        </div>
      )}
      <Navbar />

      <div className="container mx-auto max-w-screen-xl  py-20">
        <div className="flex gap-2">
          {list.map((i, index) => {
            return (
              <button className="bg-slate-300 p-4 rounded-xl" key={index}>
                {i}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between mt-8">
          <div>
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <p className="mt-2">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              {data.address}
            </p>
          </div>
          <div>
            <button
              className="bg-slate-500 p-3 rounded-xl block"
              onClick={handleReservation}
            >
              現在就預定
            </button>
            <button className="py-3 mt-2">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              買貴退差價
            </button>
          </div>
        </div>
        {/* 照片 */}
        <div className="grid grid-cols-4 gap-1 relative">
          <div
            className="absolute top-3 left-3 bg-black/30 p-3 rounded-lg opacity-0"
            ref={(el) => (comments = el)}
            onMouseEnter={(e) => handleHover(e)}
          >
            <div className="flex gap-3">
              <div className="bg-slate-300 flex items-center p-3 rounded-xl ml-2">
                <span className="text-xl">8.3</span>
              </div>
              <div>
                <p>非常好</p>
                <p className="text-gray-400">6992則評論</p>
              </div>
            </div>
          </div>
          {data?.photos?.slice(0, 8).map((i, index) =>
            index >= 7 ? (
              <div
                className="relative cursor-pointer"
                key={index}
                onClick={() => {
                  setSiderIndex(index);
                  setOpenSlider(true);
                }}
              >
                <img src={i} alt="" className="h-full" />
                <div className="bg-black/50 flex justify-center items-center w-full h-full absolute top-[0px]">
                  <span className="text-2xl text-white">
                    {data.photos.length} 張照片
                  </span>{" "}
                </div>
              </div>
            ) : (
              <div
                key={i}
                className={
                  index === 0
                    ? "col-span-3 row-span-3 cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => {
                  setSiderIndex(index);
                  setOpenSlider(true);
                }}
              >
                <img
                  onMouseEnter={(e) => (index === 0 ? handleHover(e) : "")}
                  onMouseOut={(e) => (index === 0 ? handleHoverExit(e) : "")}
                  src={i}
                  alt=""
                  className="h-full"
                />
              </div>
            )
          )}
        </div>
        {/* 介紹 */}
        <div className="grid grid-cols-6 gap-5  pt-10">
          <div className="col-span-4 flex flex-col gap-5">
            <p>{data.desc}</p>
          </div>
          <div className="col-span-2 bg-slate-300 flex flex-col gap-5 justify-between p-5">
            <h4 className="text-xl font-semibold">住宿特色</h4>
            <p>{data.distance}</p>
            <h4 className="text-2xl">
              TWD {location.state.totalHotelsPrice?.toLocaleString()}
            </h4>
            <button
              className="w-full p-3 bg-slate-500 rounded-lg"
              onClick={handleReservation}
            >
              現在就預定
            </button>
          </div>
        </div>
        {/* 熱門設施 */}
        <div className="grid grid-cols-6 pt-10">
          <div className="col-span-4">
            <h4 className="text-xl font-semibold">熱門設施</h4>
            <div className="bg-gray-200 h-1 my-2"></div>
            <span>
              <FontAwesomeIcon icon={faBanSmoking} />
              禁菸客房
            </span>

            <span>
              <FontAwesomeIcon icon={faWheelchair} />
              無障礙設施
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
