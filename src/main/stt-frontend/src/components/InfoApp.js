import React from "react";
import "./App.css";
import Navigation from "./navigation/Navigation";
import InfoBody from "./infoBody/InfoBody";

function InfoApp() {
  return (
    <div className="mainchat">
      <Navigation />
      <InfoBody />
    </div>
  );
}

export default InfoApp;