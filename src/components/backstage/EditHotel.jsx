import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import axios from "axios";
import Toast from "../Toast";
const DeleteDialog = ({
  open,
  handleClose,
  data,
  refresh,
  setRefresh,
  toast,
}) => {
  const [newData, setNewData] = useState({});

  const [addTf, setAddTf] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [destination, setDestination] = useState(""); //地區

  const areaList = [
    { value: "台北", label: "台北" },
    { value: "台中", label: "台中" },
    { value: "蘇澳鎮", label: "蘇澳鎮" },
    { value: "台南", label: "台南" },
    { value: "高雄", label: "高雄" },
    { value: "礁溪鄉", label: "礁溪鄉" },
  ];

  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "bg-gray-800",
      borderColor: "gray",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "white", // 字體顏色
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected ? "lightblue" : "white",
      ":hover": {
        backgroundColor: "lightblue",
      },
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: "gray", // 文字顏色
    }),
  };
  useEffect(() => {
    setNewData(data);
    console.log(data);
  }, [data]);
  const handleInputChange = (e) => {
    const name = e?.target?.id || e;
    if (name === "photos" && !inputValue) return;
    setNewData((prevData) => {
      if (name === "photos" && inputValue) {
        console.log(prevData?.photos);
        const updatedPhotos = prevData.photos
          ? [...prevData?.photos, inputValue]
          : [inputValue];

        setInputValue("");
        console.log(newData);
        return {
          ...prevData,
          [name]: updatedPhotos,
        };
      } else {
        return { ...prevData, [name]: e.target.value };
      }
    });
  };

  const changeArea = (e) => {
    setDestination(e.value);
    setNewData((prevData) => {
      return {
        ...prevData,
        city: e.value,
      };
    });
  };

  const deleteUrl = (url) => {
    setNewData((prevData) => {
      return {
        ...prevData,
        photos: prevData.photos.filter((i, index) => i !== url),
      };
    });
  };

  const send = async () => {
    if (data._id) {
      const res = await axios.put(`hotels/${newData._id}`, newData);
      if (res.status === 200) {
        handleClose();
        toast("修改成功");
      }
    } else {
      setNewData({
        ...newData,
        type: newData.type,
        popularHotel: newData.popularHotel,
        cheapestPrice: 7903,
        comments: 463,
      });
      setAddTf(!addTf);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/hotels", newData);
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
        {" "}
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
            <label htmlFor="name" className="block text-md font-medium ">
              飯店名稱
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="type" className="block text-md font-medium ">
              飯店種類
            </label>
            <select
              id="type"
              className="text-xl bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              onChange={handleInputChange}
              defaultValue={data._id ? newData.type : "飯店"}
            >
              <option value="飯店">飯店</option>
              <option value="公寓">公寓</option>
              <option value="渡假村">渡假村</option>
              <option value="Villa">Villa</option>
            </select>

            <label htmlFor="city" className="block text-md font-medium ">
              城市
            </label>
            <Select
              defaultValue={areaList.find((i) => i.value === data.city)}
              className="w-full"
              options={areaList}
              styles={selectStyle}
              onChange={changeArea}
            />
            <label htmlFor="address" className="block text-md font-medium ">
              地址
            </label>
            <input
              type="text"
              id="address"
              className="bg-gray-50 border  text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.address}
              onChange={handleInputChange}
            />
            <label
              htmlFor="popularHotel"
              className="block text-md font-medium "
            >
              是否熱門
            </label>
            <select
              id="popularHotel"
              className="text-xl bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              onChange={handleInputChange}
              defaultValue={newData.popularHotel ? "true" : "false"}
            >
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
            <label htmlFor="rating" className="block text-md font-medium ">
              評分
            </label>
            <input
              type="number"
              id="rating"
              className="bg-gray-50 border  text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.rating}
              onChange={handleInputChange}
            />
            <label htmlFor="desc" className="block text-md font-medium ">
              簡介
            </label>
            <textarea
              type="text"
              id="desc"
              className="bg-gray-50 border  text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.desc}
              onChange={handleInputChange}
            />
            <label htmlFor="distance" className="block text-md font-medium ">
              標語
            </label>
            <input
              type="text"
              id="distance"
              className="bg-gray-50 border  text-xl border-gray-300 rounded-lg  block w-full p-3 mb-2"
              value={newData.distance}
              onChange={handleInputChange}
            />
            <label htmlFor="distance" className="block text-md font-medium ">
              新增照片
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="photos"
                className="bg-gray-50 border  text-xl border-gray-300 rounded-lg  block w-2/3 p-3"
                placeholder="請輸入照片URL"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="border px-6 rounded-xl"
                onClick={() => handleInputChange("photos")}
              >
                新增
              </button>
            </div>
            {newData.photos?.length ? (
              <div className="grid grid-cols-4 gap-4 mt-3 select-none">
                {newData.photos.map((i, index) => (
                  <div className="relative">
                    <img className="rounded-lg" src={i} alt="" />
                    <div className="w-full h-full absolute top-1  items-center justify-center flex opacity-0 hover:opacity-80 ease-in-out duration-200 cursor-pointer">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-5xl"
                        onClick={() => deleteUrl(i, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-10 text-2xl text-gray-400">無照片</p>
            )}
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
