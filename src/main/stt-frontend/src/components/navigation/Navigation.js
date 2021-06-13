import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import "./navigation.css";
import logo from "./../images/logo2.png";
import settings from "./../images/settings.png";
import chat from "./../images/czat.png";
import profile from "./../images/prifile.png";
import info from "./../images/info.png";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

export default function Navigation() {
    const [redirectUrl, setRedirectUrl] = useState("");
    const commands = [
        {
            command: ["Go to *", "Open *"],
            callback: (redirectPage) => {
                console.log(`Trying to redirected to ${redirectPage}`)
                setRedirectUrl(redirectPage)
            }
        }
    ];

    const pages = ["chat", "profile", "settings", "info"]
    const urls = {
        chat: "/chat",
        profile: "/profile",
        settings:"/settings",
        info: "/info"
    }
    let redirect = ""
    if (redirectUrl) {
        if (pages.includes(redirectUrl)) {
            console.log(`Redirecting to ${redirectUrl}`)
            redirect = <Redirect to={urls[redirectUrl]} />;
        }
    }

    let { transcript, resetTranscript } = useSpeechRecognition({commands})

    const startListening = () => {
        console.log("Start listening")
        SpeechRecognition.startListening({
            language: 'en-UK',
            continuous: true
        });
    };
    const stopListening = () => {
        console.log("Stop listening")
        SpeechRecognition.stopListening();
    }

    return (
      <div className="navigation">
        <div className="navigationI"
             onMouseDown={startListening}
             onMouseUp={stopListening}>
          <img src={logo}/>
        </div>
        <div className="navigationBlocks">
            <Link to="/chat">
            <img src={chat}/>
            </Link>
        </div>
          <div className="navigationBlocks">
              <Link to="/profile">
              <img src={profile}/>
              </Link>
          </div>
        <div className="navigationBlocks">
            <Link to="/settings">
            <img src={settings}/>
            </Link>
        </div>
          <div className="navigationBlocks">
              <Link to="/info">
              <img src={info}/>
              </Link>
          </div>
          {redirect}
      </div>
    );
  }

