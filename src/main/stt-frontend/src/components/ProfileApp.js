import React from "react";
import "./App.css";
import Navigation from "./navigation/Navigation";
import ProfileBody from "./profileBody/ProfileBody";


function ProfileApp() {
  return (
    <div className="mainchat">
      <Navigation />
      <ProfileBody />
    </div>
  );
}

export default ProfileApp;