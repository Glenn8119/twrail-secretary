import "../sass/main.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import React from "react";
import Search from "./Search";
import Result from "./Result";
import Carousel from "./Carousel";
import Price from "./Price";
import Cart from "./Cart";
import Footer from "./Footer";


const mainPage = () => {
    return (
        <div className="container">
            <nav className="navbar">
                <div className="navbar__logo">
                    高鐵秘書
                </div>
                <ul className="navbar__item-box">
                    <li className="nav-item"><a target="_blank" className="nav-item__link" href="https://www.thsrc.com.tw/ArticleContent/2f940836-cedc-41ef-8e28-c2336ac8fe68" rel="noreferrer noopener">車站介紹</a></li>
                    <li className="nav-item"><a target="_blank" className="nav-item__link" href="https://irs.thsrc.com.tw/IMINT/?locale=tw" rel="noreferrer noopener">官網訂票</a></li>
                    <li className="nav-item"><FontAwesomeIcon icon={faShoppingCart} /></li>
                </ul>
            </nav>

            <main className="main">
                <Carousel />
                <Search />
                <Result />
                <Price />
                <Cart />
            </main>

            <Footer />
        </div>
    )
}

export default mainPage;