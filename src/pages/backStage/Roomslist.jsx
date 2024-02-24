import React, { useEffect, useState } from "react";
import Sidebar from "../../components/backstage/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditRoom from "../../components/backstage/EditRoom";
import DeleteDialog from "../../components/backstage/DeleteDialog";
import Toast from "../../components/Toast";
const Backstage = () => {
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState({});
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/rooms/findHotel/${id}`);
        const hotel = await axios.get(`/hotels/find/${id}`);
        setRooms(res.data);
        setHotel(hotel.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh]);

  const [editTf, setEditTf] = useState(false);
  const [editDetail, setEditDetail] = useState({});
  const newRoom = {
    title: "",
    desc: "",
    price: "",
    maxPeople: 4,
    roomNumbers: [],
  };
  const openEdit = (i) => {
    console.log(i);
    setEditDetail(i);
    setEditTf(true);
  };

  const handleClose = () => {
    setEditTf(false);
    setDeleteTf(false);
  };

  const [deleteTf, setDeleteTf] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [toastTf, setToastTf] = useState(false);
  const [toastText, setToastText] = useState("");

  const openDelete = (item) => {
    setDeleteTf(true);
    setDeleteId(item._id);
  };

  const deleteOrder = async () => {
    const res = await axios.delete(`/rooms/${id}/${deleteId}`);
    console.log(res);
    if (res.status === 200) {
      setToastTf(true);
      setToastText("刪除成功");
      handleClose();
      setRefresh(!refresh);
      setTimeout(() => setToastTf(false), 2000);
    }
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
      <div className="container mx-auto max-w-screen-xl pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl mt-3 mb-10">
            {hotel.name} <span className="text-2xl">房型分頁</span>
          </h1>
          <button
            className="border border-orange-500 p-3 bg-orange-500 rounded-lg hover:bg-transparent ease-in-out duration-200"
            onClick={() => openEdit(newRoom)}
          >
            新增房型
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>房型名稱</th>
              <th>規格</th>
              <th>價格</th>
              <th>適合人數</th>
              <th>房型編號</th>
              <th>房型 ID</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {rooms.map((i) => (
              <tr key={i._id}>
                <td>{i.title}</td>
                <td>{i.desc}</td>
                <td>{i.price?.toLocaleString()}</td>
                <td>{i.maxPeople}</td>
                <td>
                  {i.roomNumbers.map((num) => (
                    <p key={num.number}>{num.number}</p>
                  ))}
                </td>
                <td>{i._id}</td>
                <td className="p-5">
                  <FontAwesomeIcon
                    className="text-2xl hover:text-blue-600 ease-in-out duration-200 cursor-pointer"
                    icon={faPenToSquare}
                    onClick={() => openEdit(i)}
                  />
                </td>
                <td>
                  <span className="cursor-pointer">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-2xl hover:text-red-500 ease-in-out duration-200"
                      onClick={() => openDelete(i)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditRoom
        open={editTf}
        handleClose={handleClose}
        data={editDetail}
        refresh={refresh}
        setRefresh={setRefresh}
        id={id}
        toast={toast}
      />
      <DeleteDialog
        open={deleteTf}
        handleClose={handleClose}
        id={id}
        deleteOrder={deleteOrder}
      />
      <Toast
        open={toastTf}
        handleClose={handleClose}
        text={toastText}
        state={"success"}
      />
    </div>
  );
};

export default Backstage;
