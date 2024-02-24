import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Feature from "../components/Feature";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import Popular from "../components/Popular";

const Home = () => {
  const type = [
    {
      name: "飯店",
      url: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
    },
    {
      name: "公寓",
      url: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
    },
    {
      name: "渡假村",
      url: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
    },
    {
      name: "Villa",
      url: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
    },
  ];

  const taiwan = [
    {
      name: "台北",
      url: "https://q-xx.bstatic.com/xdata/images/city/170x136/687919.jpg?k=eccf1ef09bcc42899712d36fc3972d2c1973cb7fa1d961affd01d4f8e613ff23&o=",
      sum: "1,035",
    },
    {
      name: "台中",
      url: "https://r-xx.bstatic.com/xdata/images/city/170x136/687892.jpg?k=0f5cc456997c9fa5b99510dc453534730620c0867d94630639c74b4c18641c71&o=",
      sum: "540",
    },
    {
      name: "蘇澳鎮",
      url: "https://r-xx.bstatic.com/xdata/images/city/170x136/957070.jpg?k=aabbb4119fc0676fe8ab35e6edab0f3610a0f3a1e9c69b02b381ed7f88ad010c&o=",
      sum: "31",
    },
    {
      name: "台南",
      url: "https://r-xx.bstatic.com/xdata/images/city/170x136/687880.jpg?k=a8f37ac28f438390034f6492e1ece731900df0f6133050a754123c969d7fc6d8&o=",
      sum: "581",
    },
    {
      name: "高雄",
      url: "https://r-xx.bstatic.com/xdata/images/city/170x136/687840.jpg?k=468bbe176fbf6b09c1b0778dd14437c614a66c44ecab77429683d39bbc089aa2&o=",
      sum: "447",
    },
    {
      name: "礁溪鄉",
      url: "https://r-xx.bstatic.com/xdata/images/city/170x136/687797.jpg?k=9529bb8387606c401820857c303eaa2010c96fc7797a0fffe5e9296dcf5a7b02&o=",
      sum: "234",
    },
  ];

  const card = [
    {
      name: "台北",
      url: "https://q-xx.bstatic.com/xdata/images/city/1200x1200/687919.jpg?k=eccf1ef09bcc42899712d36fc3972d2c1973cb7fa1d961affd01d4f8e613ff23&o=",
    },
    {
      name: "台中",
      url: "https://r-xx.bstatic.com/xdata/images/city/600x600/687892.jpg?k=0f5cc456997c9fa5b99510dc453534730620c0867d94630639c74b4c18641c71&o=",
    },
    {
      name: "高雄",
      url: "https://cf.bstatic.com/xdata/images/city/600x600/687840.jpg?k=468bbe176fbf6b09c1b0778dd14437c614a66c44ecab77429683d39bbc089aa2&o=",
    },
    {
      name: "台南",
      url: "https://cf.bstatic.com/xdata/images/city/600x600/687880.jpg?k=a8f37ac28f438390034f6492e1ece731900df0f6133050a754123c969d7fc6d8&o=",
    },
    {
      name: "宜蘭",
      url: "https://q-xx.bstatic.com/xdata/images/region/600x600/69956.jpg?k=a79c8229fe2b508887961cafe02d79b9c45d42d7d06882f6d150af327e0adcdf&o=",
    },
  ];

  const special = [
    {
      name: "老城公寓酒店",
      url: "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=",
      area: "老城, 波蘭, Kraków",
      value: 8.7,
      price: 3475,
    },
    {
      name: "布達佩斯七季公寓酒店",
      url: "https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=",
      area: "6區 - 特蕾西亞城, 匈牙利, Budapest",
      value: 8.6,
      price: 2602,
    },
    {
      name: "萊蒙洛克公寓式酒店",
      url: "https://cf.bstatic.com/xdata/images/hotel/square600/85257658.webp?k=e3f110e4ed0978310a028465a3bdd609149ecbded601555c881106255556b52e&o=",
      area: "陶爾哈姆萊茨, 英國, London",
      value: 8.9,
      price: 6965,
    },
    {
      name: "騎士四碼頭酒店",
      url: "https://cf.bstatic.com/xdata/images/hotel/square600/29466558.webp?k=7f9cf4736f69b30c20fa7a751bb8711fa195bc9ff6092d5412d52daf6cada17f&o=",
      area: "倫敦金融城, 英國, London",
      value: 9.4,
      price: 14582,
    },
  ];

  const typeUrl = `/hotels/amountoftype?type=${type.map((type) => type.name)}`;
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
      <Footer />
    </div>
  );
};

export default Home;
