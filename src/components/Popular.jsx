import React from "react";
import useFetch from "../hooks/useFetch";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";

const Feature = () => {
  const { data, loading, error } = useFetch("/hotels?popularHotel=true"); //所有飯店

  return (
    <div className="grid grid-cols-4 gap-8">
      {loading ? (
        data.map((i, index) => (
          <div className="cursor-pointer w-full" key={index}>
            <Skeleton />
          </div>
        ))
      ) : (
        <>
          {data.map((item) => (
            <Link>
              <div key={item._id} className="cursor-pointer w-full">
                <img
                  src={item.photos[0]}
                  className="rounded-xl mb-2 w-full"
                  alt=""
                />

                <div className="flex flex-col">
                  <span className=" font-semibold text-xl">{item.name}</span>
                  <span className=" text-sm">{item.rooms.length}間民宿</span>
                  <div>
                    <span className="  block  mb-1">{item.address}</span>
                    <p>
                      <span className="bg-slate-600 p-1  rounded text-gray-200 text-sm">
                        {item.rating}
                      </span>
                      <span className=" ml-2 text-sm">
                        {item.rating > 9.0 ? "好極了" : "很棒"}
                      </span>
                    </p>
                    <p className="text-right  font-semibold text-xl mt-8">
                      <span className="  inline-block align-text-top mr-1 font-medium">
                        起價
                      </span>
                      TWD {item.cheapestPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Feature;
