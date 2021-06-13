import React, {Component, useState, createRef, useEffect} from "react";

import "./profileContent.css";
import logo2 from "../images/Logo12.png";
import axios from "axios";
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
export default function ProfileContent() {

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
            <div className="mainProfilecontent">
                <div className="c">
                    <img src={logo2}></img>
                </div>
                <div className="c">
                    <h1>Użytkownik:</h1>
                    <h2>{userName}</h2>
                    <h1>Email:</h1>
                    <h2>{userEmail}</h2>
                </div>
            </div>
        );
    }
