import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Chat from "./ChatApp";
import Home from "./Home";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom'

function App() {
    const [redirectUrl, setRedirectUrl] = useState("");

    const commands = [
        {
            command: ["Go to *", "Open *"],
            callback: (redirectPage) => setRedirectUrl(redirectPage),
        },
    ];

    const { transcript } = useSpeechRecognition({ commands });

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <div>Sorry but your browser doesn't support speech recognition</div>;
    }

    // const pages = ["login", "home", "blog", "new blog post", "contacts"];

    // const urls = {
    //     login: "/",
    //     home: "/home",
    //     blog: "/blog",
    //     "new blog post": "/blog/new",
    //     contacts: "/contacts",
    // };

    // let redirect = "";

    // if (redirectUrl) {
    //     if (pages.includes(redirectUrl)) {
    //         redirect = <Redirect to={urls[redirectUrl]} />;
    //     } else {
    //         redirect = <p>Could not find page: {redirectUrl}</p>;
    //     }
    // }
    // const handleKeyPress = (event) => {
    //     console.log(event.charCode);
    //     if (event.charCode == 83) {
    //         SpeechRecognition.startListening();
    //     }
    // };

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/signup" exact component={SignUp}/>               
          <Route path="/Chat" exact component={Chat}/>   
          <Route path="/Home" exact component={Home}/>   
        </Switch>
      </Router>
    );
}

export default App;
