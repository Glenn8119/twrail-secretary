import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import jsSHA from "jssha";

import MainPage from "./components/mainPage";
import CoverPage from "./components/coverPage";

// let xDate = new Date().toGMTString();
// let Authorization = `hmac username="074a161350e14f9799c1a8bcf708cff4", algorithm="hmac-sha1", headers="x-date", signature="Base64(HMAC-SHA1("x-date: " + ${xDate} , PioM5p7dfmOk5XhIUh0U1IolXzc))"`

// async function fetchData() {
//     const response = await axios.get("https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/0990/to/1060/2021-03-22?$top=30&$format=JSON", {
//         headers:{
//             "Authorization":Authorization,
//             "x-date": xDate
//         }
//     })
//     console.log(response);
// }

// fetchData()

const getAuthorizationHeader = function() {
	var AppID = '074a161350e14f9799c1a8bcf708cff4';
	var AppKey = 'auuxgKkdhbq2CskE7ddeYMZOBTI';

	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(AppKey, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	var HMAC = ShaObj.getHMAC('B64');
	var Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';

	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

async function fetchData() {
    const response = await axios.get("https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/0990/to/1060/2021-03-22?$top=30&$format=JSON", {
        headers: getAuthorizationHeader()
    })
    console.log(response);
}

fetchData()

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={CoverPage} />
                    <Route path="/main" component={MainPage} />
                </div>
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)


