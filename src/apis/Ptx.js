import axios from "axios";
import jsSHA from "jssha";

export const PtxTime = axios.create({
        baseURL: "https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD"
    })

export const PtxPrice = axios.create({
        baseURL: "https://ptx.transportdata.tw/MOTC/v2/Rail/THSR"
    })



export const getAuthorizationHeader = function () {
    var AppID = '074a161350e14f9799c1a8bcf708cff4';
    var AppKey = 'At3KeoDpHZ8hLfG2eULtUULEjoU';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

    return { 'Authorization': Authorization, 'X-Date': GMTString };
}

// /v2/Rail/THSR/ODFare/{OriginStationID}/to/{DestinationStationID}