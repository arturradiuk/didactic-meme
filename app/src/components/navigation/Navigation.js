import React, { Component } from "react";
import "./navigation.css";
import logo from "./../images/logo2.png";

export default class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div className="navigationBlocks">
          <img src={logo}></img>
        </div>
        <div className="navigationBlocks"></div>
        <div className="navigationBlocks"></div>
      </div>
    );
  }
}
