import React, { Component } from "react";
import "./profile.css";

export default class Profile extends Component {
  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  render() {
    return (
      <div className="mainProfile">
        <div className="profileCard userPImage">
          <div className="profileImage">
            <img src="https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png" />
          </div>
          <h4>Imie Nazwisko Uzytkownika</h4>
          <p>Cos o nim</p>
        </div>
        <div className="profileCard">
          <div className="cardHeader" onClick={this.toggleInfo}>
            <h4>Informacje</h4>
          </div>
          <div className="cardContent">
            informacje do wpisania
          </div>
        </div>
      </div>
    );
  }
}
