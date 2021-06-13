import React, { Component } from "react";
import "./settingsBody.css";
import SettingsContent from "../settingsContent/SettingsContent";

export default class SettingsBody extends Component {
  render() {
    return (
      <div className="mainSettingsbody">
        <SettingsContent />
      </div>
    );
  }
}