import useFetch from "../hooks/useFetch";
import { format, parseISO } from "date-fns";
import { ReservationDatesAndPrice } from "../datesCalcualate.js";

export const GridOrderhotelsImage = (props) => {
  const { data, loading, error } = useFetch(`/hotels/find/${props.hotelId}`);
  return (
    <div>
      {loading ? (
        <>載入中</>
      ) : (
        <img
          className="rounded-xl h-20 min-w-20 ml-1 "
          src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1l85ko.img?m=6&x=375&y=108&s=134&d=134"
          alt="order-item"
        />
      )}
    </div>
  );
};
export const GridOrderRoomName = (props) => {
  const Url = `/rooms/findroom/${props.RoomNumberId.map((Id) => Id)}`;
  const { data, loading, error } = useFetch(Url);
  return (
    <div>
      {loading ? (
        <>載入中</>
      ) : (
        <div>
          {data.map((room, i) => (
            <div key={i}> {room.title} </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const gridOrderReservationDates = (props) => (
  <div>
    {format(parseISO(props.ReservationDates[0].startDate), "MM/dd/yyyy")}-
    {format(parseISO(props.ReservationDates[0].endDate), "MM/dd/yyyy")}
  </div>
);
export const GridOrderUserName = (props) => {
  const Url = `/users/${props.userId}`;
  const { data, loading, error } = useFetch(Url);
  return <div>{loading ? <>載入中</> : <div>{data.username}</div>}</div>;
};

export const GridOrderPrice = (props) => {
  const Url = `/rooms/findroom/${props.RoomNumberId.map((Id) => Id)}`;
  const { data, loading, error } = useFetch(Url);
  const priceList = [];
  data.map((room) => {
    const { totalRoomsPrice } = ReservationDatesAndPrice(
      props.ReservationDates[0].startDate,
      props.ReservationDates[0].endDate,
      room.price
    );
    priceList.push(totalRoomsPrice);
  });
  return (
    <div>
      {loading ? (
        <>載入中</>
      ) : (
        <div>
          {priceList.map((price, i) => (
            <div key={i}> {price}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export const gridOrderStatus = (props) => (
  <>
    {props.status === "待確認訂單" ? (
      <button
        type="button"
        style={{ background: "#FF3939" }}
        className="text-white py-1 px-2 capitalize rounded-2xl text-md"
      >
        {props.status}
      </button>
    ) : (
      <>{props.status}</>
    )}
  </>
);

export const ordersGrid = [
  {
    headerText: "飯店照片",
    template: GridOrderhotelsImage,
    textAlign: "Center",
    width: "150",
  },
  {
    template: GridOrderRoomName,
    // field: "RoomNumberId",
    headerText: "房型名稱",
    width: "200",
    editType: "dropdownedit",
  },
  {
    template: gridOrderReservationDates,
    headerText: "住宿日期",
    width: "200",
  },
  {
    template: GridOrderUserName,
    headerText: "用戶名",
    width: "150",
  },
  {
    template: GridOrderPrice,
    headerText: "總價格",
    format: "C2",
    editType: "numericedit",
    width: "150",
  },
  {
    headerText: "訂單狀態",
    template: gridOrderStatus,
    textAlign: "Center",
    width: "120",
  },
  {
    field: "_id",
    headerText: "訂單ID",
    width: "120",
    textAlign: "Center",
  },
];
