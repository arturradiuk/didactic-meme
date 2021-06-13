import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "./navigation.css";
import logo from "./../images/logo2.png";
import settings from "./../images/settings.png";
import chat from "./../images/czat.png";
import profile from "./../images/prifile.png";
import info from "./../images/info.png";

export default class Navigation extends Component {
    render() {
        return (
            <div className="navigation">
                <div className="navigationI">
                    <img src={logo}/>
                </div>
                <div className="navigationBlocks">
                    <Link to="/chat">
                        <img src={chat}/>
                    </Link>
                </div>
                <div className="navigationBlocks">
                    <Link to="/profile">
                        <img src={profile}/>
                    </Link>
                </div>
                <div className="navigationBlocks">
                    <Link to="/settings">
                        <img src={settings}/>
                    </Link>
                </div>
                <div className="navigationBlocks">
                    <Link to="/info">
                        <img src={info}/>
                    </Link>
                </div>
            </div>
        );
    }
}