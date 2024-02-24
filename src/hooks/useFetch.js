import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, refresh = false) => {
  const [data, setData] = useState([]); //到時候axios要傳入的資料 先存放在useState內
  const [loading, setLoading] = useState(false); //會紀錄連線中情況，之後方便有先載入介面
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, refresh]);
  return { data, loading, error };
};

export default useFetch;
