export const ReservationDatesAndPrice = (
  startDate,
  endDate,
  hotelsPrice,
  roomsPrice
) => {
  const MSecond_per_day = 1000 * 86400;
  const datesLength =
    (Math.abs(endDate?.getTime() - startDate?.getTime()) || 0) /
    MSecond_per_day;
  const totalHotelsPrice = datesLength * hotelsPrice || 0;
  const totalRoomsPrice = datesLength * roomsPrice || 0;
  return { datesLength, totalHotelsPrice, totalRoomsPrice };
};

export const ReservationDatesList = (startDate, endDate) => {
  const recordDates = new Date(startDate);
  //必須多這new Date()再宣告一次，不這樣下面迴圈會把startDate一直加成endDate
  const stopRecord = new Date(endDate);
  const datesList = [];
  while (recordDates <= stopRecord) {
    datesList.push(recordDates.getTime());
    recordDates.setDate(recordDates.getDate() + 1);
  }
  return { datesList };
};
