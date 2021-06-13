import React, { Component } from "react";
import "./profileBody.css";

import ProfileContent from "../profileContent/ProfileContent"

export default class ProfileBody extends Component {
  render() {
    return (
      <div className="mainProfilebody">
        <ProfileContent />
      </div>
    );
  }
}
