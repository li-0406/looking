import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../hooks/useFetch";
import { OptionsContext } from "./context/OptionsContext.js";
import { LoginContext } from "./context/LoginContext.js";
import axios from "axios";
import format from "date-fns/format";
import useCreateOrder from "../hooks/useCreateOrder.js";
import { ReservationDatesList } from "../datesCalcualate.js";
import Toast from "./Toast.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Reservationbtn = ({ onClose, id, night, pic }) => {
  const navgate = useNavigate();
  const { data, loading, error } = useFetch(`/rooms/findHotel/${id}`);

  const { date, options } = useContext(OptionsContext);
  const { user } = useContext(LoginContext);
  console.log(data);

  const { datesList } = ReservationDatesList(
    date[0].startDate,
    date[0].endDate
  );

  const [roomNumber, setRoomNumber] = useState([]);
  const [roomTitle, setRoomTitle] = useState([]);
  const [orderData, setOrderData] = useState({
    userId: user._id,
    userName: user.username,
    hotelId: id,
    RoomNumberId: [],
    RoomTitle: [],
    RoomPic: pic,
    ReservationDates: [
      {
        startDate: date[0].startDate,
        endDate: date[0].endDate,
      },
    ],
    totalPrice: 0,
    options: {
      adult: options.adult,
      children: options.children,
      rooms: options.room,
    },
  });

  const [open, setOpen] = useState(false);

  const updatedReservationDates = async () => {
    console.log(roomNumber);
    try {
      await Promise.all(
        roomNumber.map(async (i) => {
          const res = await axios.put(`/rooms/reservartiondates/${i}`, {
            dates: datesList,
          });
          console.log(res);
        })
      );
    } catch (error) {
      console.log("上傳日期失敗");
    }
  };

  const handleCheckBox = (e, room) => {
    //總額
    setOrderData((item) => {
      const factor = e.target.checked ? 1 : -1;
      const newTotalPrice = item.totalPrice + factor * room.price * night;
      return { ...item, totalPrice: newTotalPrice };
    });

    setRoomNumber(
      e.target.checked
        ? [...roomNumber, e.target.value]
        : roomNumber.filter((i) => i !== e.target.value)
    );
    setRoomTitle(
      e.target.checked
        ? [...roomTitle, room.title]
        : roomTitle.filter((i) => i !== room.title)
    );
    setCreateOrderState(false);
  };

  const [createOrderState, setCreateOrderState] = useState(false);
  const { order } = useCreateOrder("/order", orderData, createOrderState);
  const handleClick = () => {
    try {
      setOrderData((item) => ({
        ...item,
        RoomNumberId: roomNumber,
        RoomTitle: roomTitle,
      }));
      setCreateOrderState(true);
    } catch (error) {
      console.log("訂單或是住宿日期上傳失敗");
    }
  };
  useEffect(() => {
    if (order.status === 200) {
      updatedReservationDates();
      setOpen(true);
      setTimeout(() => {
        navgate("/");
      }, 2000);
    }
  }, [order]);

  const isNotAvailableDate = (item) => {
    const res = item.unavailableDates.some((i) =>
      datesList.includes(new Date(i).getTime())
    );
    return res;
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="fixed w-full h-screen z-50 bg-black/50 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="container max-w-screen-lg">
          <div className="bg-slate-300 flex justify-between p-3 rounded-t-xl">
            <h1 className="text-2xl">空房情況</h1>
            <h2>
              {`${format(date[0].startDate, "yyyy-MM-dd")} - ${format(
                date[0].endDate,
                "yyyy-MM-dd"
              )}`}{" "}
              {options.adult} 位大人
              {options.children !== 0 && `、${options.children} 位小孩`} 入住
              {night} 晚
            </h2>
            <span className="text-xl cursor-pointer" onClick={onClose}>
              關閉 <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </span>
          </div>
          <div className="bg-white">
            <table className="w-full ">
              <thead>
                <tr>
                  <th className="p-3">客房類型</th>
                  <th className="p-3">適合人數</th>
                  <th className="p-3">房型今日價格</th>
                  <th className="p-3">住宿總價格</th>
                  <th className="p-3">選擇房型編號</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((i, index) => (
                  <tr className="border hover:bg-gray-100" key={index}>
                    <td className="p-3">
                      <p>{i.title}</p>
                      <p>{i.desc}</p>
                    </td>
                    <td className="p-3">{i.maxPeople}</td>
                    <td className="p-3">TWD {i.price.toLocaleString()}</td>
                    <td className="p-3">
                      TWD {(i.price * night).toLocaleString()}
                    </td>
                    <td className="p-3">
                      {i.roomNumbers?.map((j, index) => (
                        <label className="block" key={index}>
                          <input
                            type="checkbox"
                            value={j._id}
                            onChange={(e) => handleCheckBox(e, i)}
                            disabled={isNotAvailableDate(j)}
                          />
                          <span
                            className={
                              isNotAvailableDate(j) ? "text-gray-300" : ""
                            }
                          >
                            {j.number}
                          </span>
                        </label>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <button
                disabled={roomNumber.length == 0}
                className={`p-3 border rounded-lg m-3 ${
                  roomNumber.length == 0 ? "cursor-not-allowed" : ""
                }`}
                onClick={handleClick}
              >
                現在預訂
              </button>
            </div>
          </div>
        </div>
        <Toast
          open={open}
          handleClose={handleClose}
          text={"預定完成"}
          state={"success"}
        />
      </motion.div>
      ;
    </div>
  );
};

export default Reservationbtn;
