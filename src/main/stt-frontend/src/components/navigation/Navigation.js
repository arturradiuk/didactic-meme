import React, { Component } from "react";
import {Link, Route, Switch} from 'react-router-dom';
import "./navigation.css";
import logo from "./../images/logo2.png";
import settings from "./../images/settings.png"
import chat from "./../images/czat.png"
import profile from "./../images/prifile.png"
import info from "./../images/info.png"
import Profile from "../ProfileApp";
import Settings from "../SettingsApp";
import Info from "../InfoApp";

export default class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div className="navigationI">

          <img src={logo}></img>
        </div>
        <div className="navigationBlocks">
            <Link to="/Chat">
            <img src={chat}></img>
            </Link>
        </div>
          <div className="navigationBlocks">
              <Link to="/Profile">
              <img src={profile}></img>
              </Link>
          </div>
        <div className="navigationBlocks">
            <Link to="/Settings">
            <img src={settings}></img>
            </Link>
        </div>
          <div className="navigationBlocks">
              <Link to="/Info">
              <img src={info}></img>
              </Link>
          </div>
      </div>
    );
  }
}
