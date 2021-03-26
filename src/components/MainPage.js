import "../sass/main.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import React, {useEffect} from "react";
import Search from "./Search";
import Result from "./Result";
import Carousel from "./Carousel";
import Price from "./Price";
import Cart from "./Cart";
import Footer from "./Footer";
import { setShow, setLocalStorage } from "../actions"


const MainPage = ({ setShow, storageArr, setLocalStorage }) => {

    // 如果原本localstorage就有資料的話就先讀取
    let storageData = JSON.parse(localStorage.getItem("dataList"))
    useEffect(()=>{
        if (storageData) {
            setLocalStorage(storageData);
        }
    },[])

    const onClick = (e) => {
        setShow();
        e.stopPropagation()
    }

    const onLogoClick = (e) => {
        e.stopPropagation()
    }
    return (
        <div className="container">
            <nav className="navbar">
                <Link to="/" className="navbar__logo" onClick={onLogoClick}>高鐵秘書</Link>
                <ul className="navbar__item-box">
                    <li className="nav-item"><a target="_blank" className="nav-item__link" href="https://www.thsrc.com.tw/ArticleContent/2f940836-cedc-41ef-8e28-c2336ac8fe68" rel="noreferrer noopener">車站介紹</a></li>
                    <li className="nav-item"><a target="_blank" className="nav-item__link" href="https://irs.thsrc.com.tw/IMINT/?locale=tw" rel="noreferrer noopener">官網訂票</a></li>
                    <li className="nav-item" onClick={onClick}><FontAwesomeIcon icon={faShoppingCart} /><span>{storageArr.length}</span></li>
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

const mapStateToProps = (state) => {
    return {
        storageArr: state.storageArr
    }
}

export default connect(mapStateToProps, { setShow, setLocalStorage })(MainPage);
