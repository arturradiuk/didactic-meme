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
            <img src="https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg" />
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
