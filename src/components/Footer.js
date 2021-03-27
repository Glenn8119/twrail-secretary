import Ptx from "../img/ptx.png";
import React from "react";


const Footer = () => {
    return (

        <footer className="footer">
            <p className="footer__copyright">
                Copyright &copy; by Glenn Chen | 2021
            </p>
            <div className="footer__source">
                <p>資料介接「交通部PTX平臺」</p>
                <img src={Ptx} alt="ptx-logo"></img>
            </div>

        </footer>
    )
}

export default Footer;
