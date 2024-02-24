import { useEffect, useState } from "react";
import axios from "axios";

const useCreateOrder = (url, orderData, createOrderState) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const createOrder = async () => {
      try {
        console.log(orderData);
        const res = await axios.post(url, orderData);
        console.log(res);
        setOrder(res);
      } catch (error) {
        setOrder(error.response.data);
        console.log("上傳失敗");
      }
    };

    if (createOrderState) createOrder();
  }, [createOrderState]);

  return { order };
};

export default useCreateOrder;
