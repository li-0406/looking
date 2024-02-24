import React, { useEffect, useState } from "react";
import Sidebar from "../../components/backstage/Sidebar";
import Navbar from "../../components/Navbar";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "../../components/backstage/DeleteDialog";
import EditHotel from "../../components/backstage/EditHotel";
import RoomDialog from "../../components/backstage/RoomDialog";
import Toast from "../../components/Toast";
const Backstage = () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/hotels", refresh);
  const [id, setId] = useState("");
  const [toastTf, setToastTf] = useState(false);
  const [toastText, setToastText] = useState("");
  const [deleteTf, setDeleteTf] = useState(false);
  const openDelete = async (id) => {
    setId(id);
    setDeleteTf(true);
  };
  const closeDelete = () => {
    setDeleteTf(false);
    setEditTf(false);
  };
  const deleteOrder = async () => {
    const res = await axios.delete(`/hotels/${id}`);

    if (res.status === 200) {
      closeDelete();
      toast("刪除成功");
    }
  };

  const [editTf, setEditTf] = useState(false);
  const [editDetail, setEditDetail] = useState({});
  const newHotel = {
    address: "",
    city: "",
    desc: "",
    distance: "",
    name: "",
    photos: [],
    popularHotel: false,
    title: "",
    type: "飯店",
    rating: "",
  };

  const openEdit = (i) => {
    setId(i._id);
    setEditDetail(i);
    console.log(editDetail);
    setEditTf(true);
  };

  const [roomTf, setRoomTf] = useState(false);
  const openRoom = (i) => {
    setId(i._id);
    setRoomTf(true);
  };

  const toast = (text) => {
    setToastText(text);
    setToastTf(true);
    setRefresh(!refresh);
    setTimeout(() => setToastTf(false), 2000);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mx-auto max-w-screen-2xl pt-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl">管理列表</h2>
            <h1 className="text-3xl mt-3 mb-10">飯店分頁</h1>
          </div>
          <button
            className="border border-orange-500 p-3 bg-orange-500 rounded-lg hover:bg-transparent ease-in-out duration-200"
            onClick={() => openEdit(newHotel)}
          >
            新增飯店
          </button>
        </div>

        <table className="w-full ">
          <thead>
            <tr>
              <th>飯店名稱</th>
              <th>飯店照片</th>
              <th>飯店種類</th>
              <th>城市</th>
              <th>地址</th>
              <th>是否是熱門</th>
              <th>飯店 ID</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((i) => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td className="w-[20%] p-3">
                  {i.photos[0] ? (
                    <img src={i.photos[0]} alt="" className="rounded-md" />
                  ) : (
                    <div className="bg-slate-300 w-full h-full py-16 rounded-lg">
                      <FontAwesomeIcon icon={faImage} className="text-3xl" />
                    </div>
                  )}
                </td>

                <td>{i.type}</td>
                <td>{i.city}</td>
                <td>{i.address}</td>
                <td>
                  <span
                    className={
                      i.popularHotel ? "bg-red-500 rounded-full p-2" : ""
                    }
                  >
                    {i.popularHotel ? "熱門飯店" : "一般飯店"}
                  </span>
                </td>
                <td>{i._id}</td>
                <td>
                  <Link to={`/roomslist/${i._id}`}>
                    <button
                      className="border border-blue-500 p-3 bg-blue-500 rounded-lg hover:bg-transparent ease-in-out duration-200"
                      onClick={() => openRoom(i)}
                    >
                      查看房型
                    </button>
                  </Link>
                </td>
                <td className="p-5">
                  <FontAwesomeIcon
                    className="text-2xl hover:text-blue-600 ease-in-out duration-200 cursor-pointer"
                    icon={faPenToSquare}
                    onClick={() => openEdit(i)}
                  />
                </td>
                <td>
                  <span
                    onClick={() => openDelete(i._id)}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-2xl hover:text-red-500 ease-in-out duration-200"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditHotel
        open={editTf}
        handleClose={closeDelete}
        data={editDetail}
        refresh={refresh}
        setRefresh={setRefresh}
        toast={toast}
      />
      <DeleteDialog
        open={deleteTf}
        handleClose={closeDelete}
        id={id}
        deleteOrder={deleteOrder}
      />
      <RoomDialog open={roomTf} handleClose={closeDelete} id={id} />

      <Toast
        open={toastTf}
        handleClose={closeDelete}
        text={toastText}
        state={"success"}
      />
    </div>
  );
};

export default Backstage;
