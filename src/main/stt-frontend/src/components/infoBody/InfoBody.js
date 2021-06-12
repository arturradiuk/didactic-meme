import React, { Component } from "react";
import "./infoBody.css";
import InfoContent from "../infoContent/InfoContent";


export default class InfoBody extends Component {
  render() {
    return (
      <div className="mainInfobody">
        <InfoContent />
      </div>
    );
  }
}
