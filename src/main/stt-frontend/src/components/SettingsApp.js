import React from "react";
import "./App.css";
import Navigation from "./navigation/Navigation";
import SettingsBody from "./settingsBody/SettingsBody";


function SettingsApp() {
  return (
    <div className="mainchat">
      <Navigation />
      <SettingsBody />
    </div>
  );
}

export default SettingsApp;