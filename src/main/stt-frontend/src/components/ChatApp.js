import React from "react";
import "./App.css";
import Navigation from "./navigation/Navigation";
import ChatBody from "./chatBody/ChatBody";


function ChatApp() {
  return (
    <div className="mainchat">
      <Navigation />
      <ChatBody />
    </div>
  );
}

export default ChatApp;