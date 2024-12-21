import React from 'react';
import "./Footer.css"
import {assets} from "../../assets/assets.js";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet at commodi, cumque deserunt excepturi, facere fuga fugit hic ipsa itaque, iure nesciunt porro rem repellat rerum tenetur ullam voluptas!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+62 888-6565-7777</li>
                        <li>contact@example.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2024 © RenHoshi - All Right Reserved.</p>
        </div>
    );
};

export default Footer;