import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto max-w-screen-xl pt-10">
        <div className="flex items-center gap-5">
          <div className="bg-footer bg-no-repeat bg-right w-full border rounded-xl p-6 flex items-center gap-5">
            <img
              className="object-cover w-[160px]"
              src="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/illustrations-traveller/GlobeGeniusBadge.png"
              alt=""
            />
            <div>
              <h4 className=" font-semibold text-2xl mb-1">優惠立即享</h4>
              <span className="text-md">
                登入您的 Looking.com 帳戶，尋找藍色的 Genius 圖標，輕鬆省一筆
              </span>
              <div className="mt-10">
                <button className="border rounded px-3 py-2 mr-5 hover:bg-slate-200">
                  登入
                </button>
                <button>註冊</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 p-10 mt-5">
        <h4 className="text-center text-2xl text-white">省時又省錢！</h4>
        <p className="text-center mt-1 mb-5">
          現在訂閱，我們將寄送最佳訂房優惠給您。
        </p>
        <div className="flex items-center gap-2 justify-center container mx-auto max-w-screen-xl text-xl">
          <input
            className="flex-[50%] p-3 rounded-md"
            type="text"
            placeholder="您的電子郵件"
          />
          <button className="flex-1 p-3 rounded-md bg-yellow-400 text-xl">
            訂閱
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
