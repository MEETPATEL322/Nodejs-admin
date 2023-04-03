import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/Reel-Martini/logo.svg";

const Footer = () => {    
        return ( 
                <footer className="footer bg-060107 ">
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-md-3 text-lg-left text-center">
                            <Link className="footer-logo" to={"/"}>
                            <img loading="lazy" src={logo} className="img-fluid" alt="header-logo"/>
                            </Link>
                            {/* <a className=" footer-logo" href="#"><img loading="lazy"
                                    src={logo} className="img-fluid" alt="header-logo"/></a> */}
                        </div>
                        <div className="col-md-5 col-lg-6 mx-auto text-center">
                            <div className="footer-menu my-2 my-lg-0">
                                <div className="d-md-flex  float-md-center justify-content-center">
                                    <a href="#" className="terms-link">Contact</a> <span className="px-2"> | </span>
                                    <a href="#" className="terms-link">About&nbsp;US</a> <span className="px-2"> | </span>
                                    <a href="#" className="terms-link">Privacy Policy</a> <span className="px-2"> |
                                    </span>

                                    <a href="#" className="terms-link">Terms&nbsp;of&nbsp;Use</a>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4 col-lg-3 mx-auto text-lg-right text-center px-0">
                            <div className="footer-menu my-2 my-lg-0">
                                <a href="#" className="social-media-reel">
                                    <i className="fa fa-facebook"></i>
                                </a>

                                <a href="#" className="social-media-reel">
                                    <i className="fa fa-twitter"></i>
                                </a>

                                <a href="#" className="social-media-reel">
                                    <i className="fa fa-instagram"></i>
                                </a>

                                <a href="#" className="social-media-reel">
                                    <i className="fa fa-linkedin"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        )
}
export default Footer;