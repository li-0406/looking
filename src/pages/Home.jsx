import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Feature from "../components/Feature";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import Popular from "../components/Popular";
import { homeType, searchTaiwan, newLocation } from "../data/homeData.js";

const Home = () => {
  const type = homeType;
  const taiwan = searchTaiwan;
  const card = newLocation;

  const citiesUrl = `/hotels/amountofcities?cities=${taiwan.map(
    (city) => city.name
  )}`;

  return (
    <div className="home ">
      <Navbar />
      <Header />
      <div className="container mx-auto max-w-screen-xl pt-10">
        <h4 className=" font-semibold text-2xl mb-1 mt-15">特別優惠</h4>
        <span className=" mb-4 block">為您提供的促銷、折扣與特別優惠</span>
        <div className="bg-banner bg-no-repeat bg-cover bg-center p-16 rounded-lg">
          <p className="text-gray-100 text-2xl font-semibold">
            把握年末優惠省 15%
          </p>
          <p className="text-gray-300 mt-2 mb-4">
            探索全球成千上萬目的地，至少省15%
          </p>
          <button className="bg-slate-700 px-4 py-3 rounded-md text-gray-300 hover:bg-slate-900">
            搜尋年末優惠
          </button>
        </div>
        <h4 className=" font-semibold text-2xl mb-4 mt-16">依住宿類型瀏覽</h4>
        <Feature dataArray={type} />
        <h4 className=" font-semibold text-2xl mb-1 mt-15">探索臺灣</h4>
        <span className=" mb-4 block">
          這些熱門目的地魅力無窮，等你來體驗！
        </span>
        <Feature dataArray={taiwan} url={citiesUrl} />
        <h4 className=" font-semibold text-2xl mb-1 mt-15">新潮目的地</h4>
        <span className=" mb-4 block">來自臺灣的旅客的最熱門選擇</span>
        <PostCard item={card.slice(0, 2)} />
        <PostCard item={card.slice(2, 5)} />
        <h4 className=" font-semibold text-2xl mb-4 mt-15">
          人氣民宿、公寓類型住宿
        </h4>
        <Popular />
      </div>
    </div>
  );
};

export default Home;
