import React, { Component } from "react";
import "./profileBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import Profile from "../profile/Profile";

export default class ProfileBody extends Component {
  render() {
    return (
      <div className="mainProfilebody">
        <ChatList />
        <Profile />
      </div>
    );
  }
}
