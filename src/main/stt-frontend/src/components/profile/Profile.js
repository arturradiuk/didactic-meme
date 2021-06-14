import React, { Component } from "react";
import "./profile.css";

export default class Profile extends Component {
    toggleInfo = (e) => {
        e.target.parentNode.classList.toggle("open");
    };

    render() {
        return (
            <div className="mainProfile">
                <div className="profileCard userPImage">
                    <div className="profileImage">
                        <img src={JSON.parse(sessionStorage.getItem('avatars'))[localStorage.getItem('currentUser')]}/>
                    </div>
                    <h4>{localStorage.getItem('currentUser')}</h4>
                </div>
            </div>
        );
    }
}
