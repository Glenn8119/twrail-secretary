import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { setShow, setNotShow } from "../actions/index"

import { connect } from "react-redux";


const Result = ({ time, selectedTime, selectedDate, setShow, setNotShow }) => {

    //設定預設要show的車次index
    const [currentArrIndexStart, setCurrentArrIndexStart] = useState(0);
    const [currentArrIndexEnd, setCurrentArrIndexEnd] = useState(5);

    //挑選大於出發時間的班次
    let startItem = time.find((item) => checkTime(item.OriginStopTime.DepartureTime, selectedTime));

    useEffect(() => {
        setCurrentArrIndexStart(time.indexOf(startItem));
        setCurrentArrIndexEnd(time.indexOf(startItem) + 5)
    }, [time])

    //只顯示五個結果
    const timeArr = time.slice(currentArrIndexStart, currentArrIndexEnd);
    const renderDetail = timeArr.map((data, index) => {
        return (
            <tr key={index} className="detail__body-row">
                <td>{data.OriginStopTime.DepartureTime}<button className="ticket-btn" onClick={setShow}></button></td>
                <td>{subTime(data.OriginStopTime.DepartureTime, data.DestinationStopTime.ArrivalTime)}</td>
                <td>{data.DestinationStopTime.ArrivalTime}</td>
                <td>{data.DailyTrainInfo.TrainNo}</td>
            </tr>
        )
    })

    //檢驗t1是否晚於t2
    function checkTime(t1, t2) {
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

    //計算行車時間轉換成HH:MM:SS格式
    function subTime(DepartureTime, ArrivalTime) {
        let DepartureArr = DepartureTime.split(":");
        let ArrivalArr = ArrivalTime.split(":");

        let subHour = ArrivalArr[0] - DepartureArr[0];
        let subMinute = ArrivalArr[1] - DepartureArr[1];

        let ResultDate;
        if (subMinute >= 0) {
            ResultDate = new Date(0, 0, 0, subHour, subMinute, 0);
        } else {
            ResultDate = new Date(0, 0, 0, subHour - 1, subMinute + 60, 0)
        }
        return `${ResultDate.getHours() < 10 ? "0" + ResultDate.getHours() : ResultDate.getHours()}:${ResultDate.getMinutes() < 10 ? "0" + ResultDate.getMinutes() : ResultDate.getMinutes()}`
    }

    function onEarlyClick() {
        if (currentArrIndexStart >= 5) {
            setCurrentArrIndexStart(currentArrIndexStart - 5);
            setCurrentArrIndexEnd(currentArrIndexEnd - 5)
        }
    }

    function onLateClick() {
        if (currentArrIndexEnd < time.length) {
            setCurrentArrIndexStart(currentArrIndexStart + 5);
            setCurrentArrIndexEnd(currentArrIndexEnd + 5)
        }
    }

    const renderResult = () => {
        return (
            <section className="result">
                <div className="title">
                    <div className="title__left">
                        <span>{time.length > 0 ? time[0].OriginStopTime.StationName.Zh_tw : ""}</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <span>{time.length > 0 ? time[0].DestinationStopTime.StationName.Zh_tw : ""}</span>
                    </div>
                    <div className="title__middle">
                        {selectedDate}{selectedTime}
                </div>
                    <div className="title__right">
                        <div className="title__right-early" onClick={onEarlyClick}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        較早班次
                        </div>
                        <div className="title__right-late" onClick={onLateClick}>
                            較晚班次
                        <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>

                <table className="detail">
                    <thead className="detail__head">
                        <tr className="detail__head-row">
                            <th>出發時間</th>
                            <th>行車時間</th>
                            <th>抵達時間</th>
                            <th>車次</th>
                        </tr>
                    </thead>

                    <tbody className="detail__body">
                        {time.length > 0 ? renderDetail : ""}
                    </tbody>
                </table>
            </section>
        )
    }

    return (
        <Fragment>
            {time.length > 0 ? renderResult() : null}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        time: state.time,
        selectedTime: state.selectedTime,
        selectedDate: state.selectedDate
    }
}

export default connect(mapStateToProps, { setShow, setNotShow })(Result);