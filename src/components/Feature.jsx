import React from "react";
import useFetch from "../hooks/useFetch";

const Feature = ({ dataArray, url }) => {
  const { data, loading, error } = useFetch(url);
  return (
    <div className="flex gap-4">
      {dataArray.map((item, index) => (
        <div key={item.name} className="cursor-pointer w-full">
          <img src={item.url} className="rounded-xl mb-2 w-full" alt="" />
          <div className="flex flex-col">
            <span className=" font-semibold text-xl">{item.name}</span>
            {item.sum && <span className=" text-sm">{data[index]}間民宿</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
