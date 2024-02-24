import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [active] = useState(location.pathname.split("/")[1]);
  const links = [
    {
      title: "訂房管理後台",
      links: [
        {
          name: "orderslist",
          labelname: "訂房訂單",
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: "hotelslist",
          labelname: "飯店列表",
          icon: <AiOutlineShoppingCart />,
        },
      ],
    },
  ];

  return (
    <div className="w-72 fixed sidebar bg-white ">
      <div className="mt-10 ">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              {item.title}
            </p>
            {item.links.map((link) => (
              <Link
                to={`/${link.name}`}
                key={link.name}
                className={`${
                  "flex items-center gap-5 p-3 rounded-lg text-md text-gray-700 hover:bg-blue-600 hover:text-white m-2 " +
                  (link.name === active ? "bg-blue-600 text-white" : "")
                }`}
              >
                {link.icon}
                {link.labelname}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
