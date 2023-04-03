import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import logo from "../assets/images/Reel-Martini/logo.svg";
const Header = () => {
        return (
                <div className="header-banner-wrapper">
                        <div className="topheader">
                                <p>"Happiness is a <span>martini </span>and a lot of <span>drama</span>"</p>
                        </div>
                        <header>
                                <nav className="navbar navbar-expand-lg navbar-light navbar-hover fixed-top header">
                                        <div className="container">
                                                <Link className="logo-white" to={"/"}>
                                                        <img loading="lazy" src={logo} className="img-fluid" alt="header-logo" />
                                                </Link>
                                                <Link className="logo-color d-none" to={"/"}>
                                                        <img loading="lazy" src={logo} className="img-fluid" alt="header-logo" />
                                                </Link>
                                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                                        data-target="#navbarHover" aria-controls="navbarDD" aria-expanded="false"
                                                        aria-label="Navigation">
                                                        <span className="navbar-toggler-icon"></span>
                                                </button>
                                                <div className="collapse navbar-collapse" id="navbarHover">
                                                        <ul className="navbar-nav mx-auto">
                                                                <li className="nav-item px-2">
                                                                        <Link className="nav-link tx-AFAFAF fs-18" to={"/tvshows"}>Tv Shows</Link>
                                                                </li>
                                                                <li className="nav-item px-2">
                                                                        <Link className="nav-link tx-AFAFAF fs-18" to={"/movies"}>Movies</Link>
                                                                </li>
                                                                <li className="nav-item px-2">
                                                                        <Link className="nav-link tx-AFAFAF fs-18" to={"/curatedcontent"}>Curated Content</Link>
                                                                </li>
                                                                <li className="nav-item px-2">
                                                                        <Link className="nav-link tx-AFAFAF fs-18" to={"/list"}>Reviews</Link>
                                                                </li>
                                                                <li className="nav-item px-2">
                                                                        <Link className="nav-link tx-AFAFAF fs-18" to={"/news"}>News</Link>
                                                                </li>
                                                        </ul>
                                                        <ul className="navbar-nav ml-auto d-flex">
                                                                <li className="nav-item px-2 m-lg-auto">
                                                                        <a className="nav-link search-icon" href="#"><i className="fa fa-search"></i> </a>
                                                                </li>

                                                                <li className="nav-item nav-box px-2">
                                                                        <a className="nav-link  py-0" href="#">LOGIN</a>
                                                                </li>

                                                        </ul>
                                                </div>

                                        </div>

                                </nav>
                        </header>


                        <div className="header-height-50"></div>

                        <div className="sectional-padding-2"></div>

                </div>
        )
}
export default Header;