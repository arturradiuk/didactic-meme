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

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    const changeName = async () => {
        const token = (localStorage.getItem('token') as string)

        const json = JSON.stringify({
            name: userName
        })
        await axios.put("http://localhost:8080/api/users/_self/profile/editName", json, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        loadUser();
    }

    const changEmail = async () => {
        const token = (localStorage.getItem('token') as string)

        await axios.put(`http://localhost:8080/api/users/_self/profile/editEmail/${userEmail}`, {}, {
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

    console.log(userName);
    console.log(userEmail);
    console.log((localStorage.getItem('token') as string));


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
                <h1>Email:</h1>
                <h2>{userEmail}</h2><br></br>
                <h1>Zmiana E-maila:</h1><br></br>
                <TextField type="Text"
                           placeholder='Zmień Email'
                           value={userEmail}
                           onChange={event => {
                               setUserEmail(event.target.value)
                           }}
                /><br></br>
                <Button onClick={changEmail}>Zmień Email</Button>
            </div>
        </div>
    );
}