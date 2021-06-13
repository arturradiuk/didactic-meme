import React, {Component, useState, createRef, useEffect} from "react";

import "./settingsContent.css";
import logo2 from "../images/Logo12.png";
import axios from "axios";
import {Button, TextField} from "@material-ui/core";
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
interface DataProps {
    row: ReturnType<typeof createData>,
    style: React.CSSProperties,
    onChange: () => Promise<any>,
}
export default function SettingsContent() {

    const changeName = async () => {
        const {token} = JSON.parse(sessionStorage.getItem('token') as string)
        const json = JSON.stringify({
            name: userName,

        })


        await axios.put("http://localhost:8080/api/users/_self/profile/editName", json, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        loadUser();
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



    const [userEmail, setUserEmail] = useState([]);
    const [userName, setUserName] = useState([]);

    useEffect(() => {
        loadUser().then(res => {
            sessionStorage.setItem("User", JSON.stringify(res.data));
            setUserEmail(res.data.email);
            setUserName(res.data.userName);
        })
    }, []);

    return (
        <div className="mainSettingscontent">
            <div>
                <img src={logo2}></img>
            </div>
            <div className="c">
                <h1>Użytkownik:</h1>
                <h2>{userName}</h2><br></br>
                <input type="Text"
                 placeholder='Zmień Nazwe'
                           value={userName}
                           onChange={e => {
                               setUserName(e.target.value)
                           }}
                />
                <Button onClick={}>Zmień Nazwę</Button><br></br>
                <h1>Email:</h1>
                <h2>{userEmail}</h2><br></br>
                <input type="Text"
                           placeholder='Zmień Email'
                           value={userEmail}
                           onChange={event => {
                               setUserEmail(event.target.value)
                           }}
                />
                <Button onClick={}>Zmień Email</Button>
            </div>
        </div>
    );
}