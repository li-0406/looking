import React, { useState } from "react";
import Sidebar from "../../components/backstage/Sidebar";
import Navbar from "../../components/Navbar";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "../../components/backstage/DeleteDialog";
import Toast from "../../components/Toast";
const Backstage = () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/order", refresh);

  const [deleteTf, setDeleteTf] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [toastTf, setToastTf] = useState(false);
  const openDelete = async (id) => {
    setDeleteTf(true);
    setDeleteId(id);
  };
  const closeDelete = () => {
    setDeleteTf(false);
    setToastTf(false);
  };

  const deleteOrder = async () => {
    console.log(deleteId);
    await axios.delete(`order/${deleteId}`);
    setRefresh(!refresh);
    closeDelete();
    setToastTf(true);
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container mx-auto max-w-screen-xl pt-10">
        <h2 className="text-xl">管理列表</h2>
        <h1 className="text-3xl mt-3 mb-10">訂單分頁</h1>
        <table className="w-full ">
          <thead>
            <tr>
              <th>飯店照片</th>
              <th>房型名稱</th>
              <th>住宿日期</th>
              <th>用戶名</th>
              <th>總價格</th>
              <th>訂單狀態</th>
              <th>訂單 ID</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((i) => (
              <tr key={i._id}>
                <td className="w-[20%] p-3">
                  <img src={i.RoomPic} alt="" className="rounded-md" />
                </td>
                <td>
                  {i.RoomTitle.map((i) => (
                    <p key={i}>{i}</p>
                  ))}
                </td>
                <td>
                  {`${new Date(
                    i.ReservationDates[0].startDate
                  ).toLocaleDateString()} ~ ${new Date(
                    i.ReservationDates[0].endDate
                  ).toLocaleDateString()}`}
                </td>
                <td>{i.userName}</td>
                <td>{i.totalPrice}</td>
                <td>
                  <span
                    className={
                      i.status === "待確認訂單"
                        ? "bg-red-500 rounded-full p-2"
                        : ""
                    }
                  >
                    {i.status}
                  </span>
                </td>
                <td>{i._id}</td>
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
      <DeleteDialog
        open={deleteTf}
        handleClose={closeDelete}
        id={deleteId}
        deleteOrder={deleteOrder}
      />
      <Toast
        open={toastTf}
        handleClose={closeDelete}
        text={"刪除成功"}
        state={"error"}
      />
    </div>
  );
};

export default Backstage;
