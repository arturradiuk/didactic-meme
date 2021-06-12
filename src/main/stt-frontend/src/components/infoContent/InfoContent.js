import React, {Component, useState, createRef, useEffect} from "react";

import "./infoContent.css";
import logo2 from "../images/Logo12.png";


export default class InfoContent extends Component {


    render() {
        return (
            <div className="mainInfocontent">
                <div class="c">
                    <img src={logo2}></img>
                </div>
                <div class="c">
                    <h1>Speech-to-text Messenger app</h1>
                    <h2>Jest to aplikacja używająca Speech-to-text w celu jej obsługi</h2>
                    <h3>Twórcy:</h3>
                    <h4> Paweł Florczuk, 224293</h4>
                    <h4> Artur Radiuk, 226452</h4>
                    <h4> Szymon Jeziorski, 216784</h4>
                    <h4> Szymon Wróbel, 224463</h4>
                    <h4> Damian Bednarek, 224257</h4>
                    <h4> Michał Kłyż, 224329</h4>
                </div>
            </div>
        );
    }
}
