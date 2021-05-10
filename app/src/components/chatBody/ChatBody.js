import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import Profile from "../profile/Profile";

export default class ChatBody extends Component {
  render() {
    return (
      <div className="mainChatbody">
        <ChatList />
        <ChatContent />
        <Profile />
      </div>
    );
  }
}
