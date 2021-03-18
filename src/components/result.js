import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Result = () => {
    return(
        <section className="result">
            <div className="title">
                <div className="title__left">
                    <span>南港</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span>左營</span>
                </div>
                <div className="title__middle">
                    2021/3/18(四)15:00
                </div>
                <div className="title__right">
                    <div className="title__right-early">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        較早班次
                        </div>
                    <div className="title__right-late">
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
                    <tr className="detail__body-row">
                        <td>08:00</td>
                        <td>02:50</td>
                        <td>09:00</td>
                        <td>0841</td>
                    </tr>
                    <tr className="detail__body-row">
                        <td>08:00</td>
                        <td>02:50</td>
                        <td>09:00</td>
                        <td>0841</td>
                    </tr>
                    <tr className="detail__body-row">
                        <td>08:00</td>
                        <td>02:50</td>
                        <td>09:00</td>
                        <td>0841</td>
                    </tr>
                    <tr className="detail__body-row">
                        <td>08:00</td>
                        <td>02:50</td>
                        <td>09:00</td>
                        <td>0841</td>
                    </tr>
                    <tr className="detail__body-row">
                        <td>08:00</td>
                        <td>02:50</td>
                        <td>09:00</td>
                        <td>0841</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Result;