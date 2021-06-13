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
}/*
import React, {Component, useState, createRef, useEffect} from "react";

import "./profileContent.css";
import logo2 from "../images/Logo12.png";
import axios from "axios";
export default function ProfileContent() {
    function createData(
        userName: string,
        email: string,
        accessLevel: string,
    ) {
        return {
            userName: userName,
            email: email,
            accessLevel: accessLevel
        };
    }

    function loadUser() {
        const User = JSON.parse(sessionStorage.getItem('currentUser') as string)
        console.log(User);
        return axios.get(`http://localhost:8080/api/users/_self/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    interface DataProps {
        row: ReturnType<typeof createData>,
        style: React.CSSProperties,
        onChange: () => Promise<any>,
    }

    // function Data(props: DataProps) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        loadUser().then(res => {
            sessionStorage.setItem("User", JSON.stringify(res.data));
            setUser(res.data)
        })
    }, []);



    /!*export default class ProfileContenta extends Component {

        render() {*!/
    return (
        <div className="mainProfilecontent">
            <div className="c">
                <img src={logo2}></img>
            </div>
            <div className="c">
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
*/