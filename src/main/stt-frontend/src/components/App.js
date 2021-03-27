import React, { useState } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import Home from "./Home";
import Blog from "./Blog";
import Contacts from "./Contacts";
import NewBlogPost from "./NewBlogPost";

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

    const pages = ["home", "blog", "new blog post", "contacts"];

    const urls = {
        home: "/",
        blog: "/blog",
        "new blog post": "/blog/new",
        contacts: "/contacts",
    };

    let redirect = "";

    if (redirectUrl) {
        if (pages.includes(redirectUrl)) {
            redirect = <Redirect to={urls[redirectUrl]} />;
        } else {
            redirect = <p>Could not find page: {redirectUrl}</p>;
        }
    }
    const handleKeyPress = (event) => {
        console.log(event.charCode);
        if (event.charCode == 83) {
            SpeechRecognition.startListening();
        }
    };

    return (
        <div className="App" onKeyDown={(event) => handleKeyPress(event)}>
            <BrowserRouter>
                <div id="links">
                    <Link to="/">Home</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/blog/new">Add Blog Post</Link>
                    <Link to="/contacts">Contacts</Link>
                </div>
                <Route path="/" exact component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/blog" exact component={Blog} />
                <Route path="/blog/new" component={NewBlogPost} />
                <Route path="/contacts" component={Contacts} />

                {redirect}
            </BrowserRouter>
            <p id="transcript"> Transcript: {transcript}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
        </div>
    );
}

export default App;
