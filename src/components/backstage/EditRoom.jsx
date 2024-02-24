import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import axios from "axios";
import Toast from "../Toast";
const DeleteDialog = ({
  open,
  handleClose,
  data,
  refresh,
  setRefresh,
  id,
  toast,
}) => {
  const [newData, setNewData] = useState(data);
  const [addTf, setAddTf] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const handleInputChange = (e) => {
    console.log(e);
    const name = e?.target?.id || e;
    if (name === "roomNumbers" && !inputValue) return;

    setNewData((prevData) => {
      if (name === "roomNumbers" && inputValue) {
        console.log(prevData.roomNumbers);

        setInputValue("");
        return {
          ...prevData,
          [name]: [...prevData[name], { number: inputValue }],
        };
      } else {
        return { ...prevData, [name]: e.target.value };
      }
    });
  };

  const send = async () => {
    if (data._id) {
      const res = await axios.put(`/rooms/${newData._id}`, newData);
      if (res.status === 200) {
        handleClose();
        toast("修改成功");
      }
      console.log(res);
    } else {
      setAddTf(!addTf);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`/rooms/${id}`, newData);
        if (res.status === 200) {
          handleClose();
          toast("新增完成");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [addTf]);

  const close = () => {
    handleClose();
    setNewData(data);
  };

  const deleteRoom = (item) => {
    console.log(item);
    setNewData((prevData) => {
      return {
        ...prevData,
        roomNumbers: prevData.roomNumbers.filter(
          (i) => i.number !== item.number
        ),
      };
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title">
        {newData.title ? "編輯" : "新增"}
      </DialogTitle>
      <DialogContent>
        <div className="p-4">
          <DialogContentText id="alert-dialog-description">
            <label htmlFor="name" className="block text-md font-medium ">
              標題
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.title}
              onChange={handleInputChange}
            />
            <label htmlFor="desc" className="block text-md font-medium ">
              規格
            </label>
            <input
              type="text"
              id="desc"
              className="bg-gray-50 border text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.desc}
              onChange={handleInputChange}
            />
            <label htmlFor="price" className="block text-md font-medium ">
              價錢
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.price}
              onChange={handleInputChange}
            />

            <label htmlFor="maxPeople" className="block text-md font-medium ">
              適合人數
            </label>
            <input
              type="number"
              id="maxPeople"
              className="bg-gray-50 border text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.maxPeople}
              onChange={handleInputChange}
            />
            <label htmlFor="roomNumbers" className="block text-md font-medium ">
              房間編號
            </label>
            <div className="flex gap-3 mb-2">
              <input
                type="number"
                id="roomNumbers"
                className="bg-gray-50 border text-xl border-gray-300 rounded-lg  block w-2/3 p-3 "
                placeholder="請輸入房間編號"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="border px-6 rounded-xl"
                onClick={() => handleInputChange("roomNumbers")}
              >
                加入
              </button>
            </div>

            <div className="border border-b-slate-700 p-6 rounded-lg">
              {newData.roomNumbers?.map((i) => (
                <span className="border border-gray-300 px-5 py-2 mr-3 rounded-full text-xl">
                  <FontAwesomeIcon
                    className="mr-2 cursor-pointer"
                    icon={faXmark}
                    onClick={() => deleteRoom(i)}
                  />
                  {i.number}
                </span>
              ))}
            </div>
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button autoFocus onClick={send}>
          {data._id ? "送出" : "創建"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
