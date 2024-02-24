import React from "react";

const PostCard = ({ item }) => {
  return (
    <div className="flex gap-4 mt-4">
      {item.map((i, index) => (
        <div className="w-full relative" key={i.name}>
          <img
            src={i.url}
            alt=""
            className="object-cover w-full h-[300px] rounded-xl"
          />
          <div className="absolute  top-10 left-6">
            <span
              before={i.name}
              className="text-gray-900 text-2xl font-semibold "
            >
              {i.name}
            </span>
            <span className="inline-block bg-taiwanIcon bg-cover w-6 h-5 ml-2 align-top"></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
