export const checkToken = () => {
  const now = new Date().getTime();
  const FOUR_HOURS = 1000 * 60 * 60 * 4;
  let tokenInfo = localStorage.getItem('tokenRecord');
  if (tokenInfo) {
    tokenInfo = JSON.parse(tokenInfo);
    const { timeStamp, token } = tokenInfo;
    if (now - timeStamp < FOUR_HOURS) {
      return token;
    }
  }
};

//將日期轉換成 YY-MM-DD格式
export function changeDateForm(date) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return `${y}-${m < 9 ? '0' + (m + 1) : m + 1}-${d <= 9 ? '0' + d : d}`;
}

//團體票規則: 95折之後個位數大於五則取5, 小於五則取0
export function groupPrice(price) {
  if ((price * 0.95) % 10 > 5) {
    return Math.round((price * 0.95) / 10) * 10 - 5;
  }
  return Math.round((price * 0.95) / 10) * 10;
}

//敬老票規則: 半價之後個位數大於五則取5, 小於五則取0
export function oldPrice(price) {
  if ((price * 0.5) % 10 > 5) {
    return Math.round((price * 0.5) / 10) * 10 - 5;
  }
  return Math.round((price * 0.5) / 10) * 10;
}

//取得票種及車廂種類計算後的最後價格
export function getTicketPrice(item) {
  if (item.ticketType === 'adult') {
    return item.price[item.seatType] * item.ticketNumber;
  } else if (item.ticketType === 'old') {
    return oldPrice(item.price[item.seatType]) * item.ticketNumber;
  } else {
    return groupPrice(item.price[item.seatType]) * item.ticketNumber;
  }
}

//計算該車次發車時間和目前時間差
export function getTimeDifference(train) {
  if (train) {
    const currentTime = new Date();
    const trainDateArr = train.date.split('-');
    const trainTimeArr = train.departureTime.split(':');
    const trainTimeSecond = new Date(
      trainDateArr[0],
      trainDateArr[1] - 1,
      trainDateArr[2],
      ...trainTimeArr
    );
    return new Date(trainTimeSecond - currentTime);
  }
  return null;
}

//為了比較哪一班車是離現在時間最近的, 必須將資料傳換成時間毫秒
export function changeTimeToMillisecond(trainObj) {
  if (trainObj) {
    const trainDateArr = trainObj.date.split('-');
    const trainTimeArr = trainObj.departureTime.split(':');
    return new Date(
      trainDateArr[0],
      trainDateArr[1] - 1,
      trainDateArr[2],
      ...trainTimeArr
    ).getTime();
  }
}

//找出arr中最小的正數的item
export function findValidMinimumItem(arr) {
  const nowTime = new Date().getTime();
  const positiveArr = arr.filter((item) => item - nowTime > 0);
  return Math.min(...positiveArr);
}
