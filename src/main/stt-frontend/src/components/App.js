import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Chat from "./ChatApp";
import Profile from "./ProfileApp";
import Settings from "./SettingsApp";
import Info from "./InfoApp";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
    const [redirectUrl, setRedirectUrl] = useState("");

    let chosenLanguage = 'en-US'
    let isListening = false;

    // go to *, open *, change language, start * stop
    const commands = [
        {
            command: ["Go to *", "Open *"],
            callback: (redirectPage) => {
                console.log(`Trying to redirected to ${redirectPage}`)
                setRedirectUrl(redirectPage)
            }
        },
        {
            command: ["Change language"],
            callback: () => {
                console.log("Changed language")
                if (chosenLanguage === 'en-US') {
                    chosenLanguage = 'pl'
                } else {
                    chosenLanguage = 'en-US'
                }
            }
        },
        {
            command: ["Start * stop"],
            callback: (text) => {
                console.log(text)
            }
        },
    ];

    const pages = ["chat", "profile", "settings", "info"]
    const urls = {
        chat: "/chat",
        profile: "/profile",
        settings:"/settings",
        info: "/info"
    }

    const { transcript } = useSpeechRecognition({ commands });

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <div>Sorry but your browser doesn't support speech recognition</div>;
    }

    let redirect = ""
    if (redirectUrl) {
        if (pages.includes(redirectUrl)) {
            console.log(`Redirecting to ${redirectUrl}`)
            redirect = <Redirect to={urls[redirectUrl]} />;
        }
    }

    // window.addEventListener('keyup', function() {
    //     if (!isListening) {
    //         console.log(`Listening started in ${chosenLanguage}`)
    //         SpeechRecognition.startListening({ language: chosenLanguage });
    //         isListening = true
    //     } else {
    //         console.log(`Listening stopped`)
    //         SpeechRecognition.stopListening({ language: chosenLanguage });
    //         isListening = false
    //     }
    // });

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/chat" exact component={Chat}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/settings" exact component={Settings}/>
          <Route path="/info" exact component={Info}/>
          {redirect}
        </Switch>
      </Router>
    );
}

export default App