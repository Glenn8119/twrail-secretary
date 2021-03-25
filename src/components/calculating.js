//團體票規則
function groupPrice(price) {
    if (price * 0.95 % 10 > 5) {
        return Math.round(price * 0.95 / 10) * 10 - 5;
    }
    return Math.round(price * 0.95 / 10) * 10
}

//敬老票規則
function oldPrice(price) {
    if (price * 0.5 % 10 > 5) {
        return Math.round(price * 0.5 / 10) * 10 - 5;
    }
    return Math.round(price * 0.5 / 10) * 10
}

//取得票種及車廂種類計算後的最後價格
export function getTicketPrice(item) {
    if (item.ticketType === "adult") {
        return item.price[item.seatType] * item.ticketNumber
    } else if (item.ticketType === "old") {
        return oldPrice(item.price[item.seatType]) * item.ticketNumber
    } else {
        return groupPrice(item.price[item.seatType]) * item.ticketNumber
    }
}

//檢驗t1是否大於t2
export function checkTime(t1, t2) {
    let t1Arr = t1.split(":");
    let t2Arr = t2.split(":");
    let subHour = t1Arr[0] - t2Arr[0];
    let subMinute = t1Arr[1] - t2Arr[1];

    if (subHour > 0) {
        return true;
    } else if (subHour === 0 && subMinute > 0) {
        return true;
    } else {
        return false
    }
}
//計算該車次發車時間和目前時間差
export function getTimeDifference(train) {
    if (train) {
        let currentTime = new Date();
        let trainDateArr = train.date.split("-");
        let trainTimeArr = train.departureTime.split(":");
        let trainTimeSecond = new Date(trainDateArr[0], trainDateArr[1] - 1, trainDateArr[2], ...trainTimeArr);
        return new Date(trainTimeSecond - currentTime);
    }
    return null;
}

//為了比較哪一班車是離現在時間最近的, 必須將資料傳換成時間毫秒
export function changeTimeToMillisecond(trainObj){
    if(trainObj){
        let trainDateArr = trainObj.date.split("-");
        let trainTimeArr = trainObj.departureTime.split(":");
        return new Date(trainDateArr[0], trainDateArr[1] - 1, trainDateArr[2], ...trainTimeArr).getTime();
    }
}

//找出arr中最小的正數的item
export function findValidMinimumItem(arr){
    let nowTime = new Date().getTime();
    let positiveArr = arr.filter((item)=> item - nowTime > 0);
    return Math.min(...positiveArr);
}