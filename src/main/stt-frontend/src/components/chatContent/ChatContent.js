import React, {createRef, useEffect, useState} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

import "./ChatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import axios from "axios";


export default function ChatContent(props) {
    const messagesEndRef = createRef(null);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [selectedLanguage, setSelectedLanguage] = useState('pl'); // en-UK
    const [selectedLanguageString, setSelectedLanguageString] = useState('PL'); // en-UK
    const [avatarSomebody, setAvatarSombiody] = useState( '');
    const [userToTalk, setuserToTalk] = useState( '');

    const commands = [
        {
            command: ["*Clear chat*", "*Wyczyść czat*"],
            callback: () => {
                console.log("Clearing the chat");
                transcript = "";
                setChat({chat: chat.chat, msg: ''});
                console.log(`Transcript: ${transcript}`);
                console.log(`Chat: ${chat.msg}`);
            }
        },
        {
            command: ["*Wyślij", "*Send"],
            callback: () => {
                document.getElementById("sendMsgBtn").click();
            }
        }
    ];

    let {transcript, resetTranscript} = useSpeechRecognition({commands});

    const startListening = () => {
        console.log("Start listening");
        console.log(`Transcript: ${transcript}`);
        console.log(`Chat: ${chat.msg}`);
        if (chat.msg === "") {
            resetTranscript();
            forceUpdate();
        }
        SpeechRecognition.startListening({
            language: selectedLanguage,
            continuous: true
        });
        if (!(transcript.toLowerCase().includes("Wyślij") || transcript.toLowerCase().includes("send")
            || transcript.toLowerCase().includes("wyczyść czat") || transcript.toLowerCase().includes("clear chat"))) {
            chat.msg = transcript;
        }
    };
    const stopListening = () => {
        console.log("Stop listening");
        SpeechRecognition.stopListening({
            language: selectedLanguage,
            continuous: true
        });
        chat.msg = transcript;
        if (!(transcript.toLowerCase().includes("wyślij") || transcript.toLowerCase().includes("send"))) {
            chat.msg = transcript;
        }
    };


    const [chat, setChat] = useState({
        chat: [],
        msg: "",
    });


    const scrollToBottom = () => {
        // messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    const loadMessages = async (chatItems) => {
        const initialSize = chatItems.length;
        let scrollDown = false;
        const chatUser = JSON.parse(sessionStorage.getItem('chatConf'));
        // console.log(chatUser);
        await axios.get(`http://localhost:8080/api/messages/exchanged/_self/${chatUser}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            chatItems.length = 0;
            for (const dataElement of response.data) {
                chatItems.push({
                    image: "",
                    type: dataElement.sender.userName === localStorage.getItem('currentUser') ? "" : "other",
                    msg: dataElement.content,
                    time: dataElement.sentTime
                });
            }
            chatItems.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));

            if (chatItems.length > initialSize) {
                scrollDown = true;
            }
        }).catch(error => {
            window.alert('error');
        });

        // console.log('refreshing');
        forceUpdate();
        if (scrollDown) {
            scrollToBottom();
        }
        setTimeout(() => loadMessages(chatItems), 1500);
    };
    // setTimeout(() => this.loadMessages(chatItems), 1000);


    const changeLanguage = () => {
        if (selectedLanguage === 'pl') {
            setSelectedLanguage('en-UK');
            setSelectedLanguageString("EN");
        } else {
            setSelectedLanguage('pl');
            setSelectedLanguageString("PL");
        }
        console.log(`Language changed to ${selectedLanguage}`);
        console.log(`Language changed to ${selectedLanguageString}`);
        forceUpdate();
    };

    const customOnSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        await loadMessages(chat.chat);
        // if ( this.state.msg != "" ) {
        if (chat.msg !== "") {
            console.log("They clicked me!");
            // this.chatItms.push({
            //     key: 1,
            //     type: "",
            //     msg: this.state.msg,
            //     image:
            //         "https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png",
            // });
            // this.scrollToBottom();
            // this.forceUpdate();

            // const message = this.state.msg;
            const message = chat.msg;

            // this.state.msg = '';
            setChat({chat: chat.chat, msg: ''});

            const json =
                {
                    "receiver": JSON.parse(sessionStorage.getItem('chatConf')),
                    "content": message
                };
            axios.post('http://localhost:8080/api/messages/send', json, {
                headers:
                    {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
            });
            console.log("reset " + transcript);
            transcript = "";
            resetTranscript();
            {
                resetTranscript();
            }
            console.log("after " + transcript);
            setChat({chat: chat.chat, msg: ''});
            forceUpdate();
        }
        // scrollToBottom();
    };

    useEffect(async () => {
        await loadMessages(chat.chat);
    }, []);

    const onStateChange = (e) => {
        console.log("Hi I'm here");
        setChat({chat: chat.chat, msg: e.target.value});
        // this.setState({msg: e.target.value});
    };

    return (
        <div className="mainChatcontent">
            <div className="contentHeader">
                <div className="blocks">
                    <div className="currentChattingUser">
                        <Avatar
                            isOnline="active"
                            image="https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png"
                        />
                        <p>{JSON.parse(sessionStorage.getItem('chatConf'))}</p>
                    </div>
                </div>

                <div className="blocks">
                    <div className="settings">
                        <button className="btn-nobg">
                            <i className="fa fa-cog"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="contentBody">
                <div className="chat__items">
                    {
                        chat.chat.map((itm, index) => {
                            // console.log(JSON.parse(sessionStorage.getItem("chatConf")));
                            const time = new Date(Date.parse(itm.time));
                            const timeString = `${time.getHours()}:${time.getMinutes()}`;
                            return (
                                <ChatItem
                                    animationDelay={index + 2}
                                    user={itm.type ? itm.type : "me"}
                                    msg={itm.msg}
                                    //  image={JSON.parse(sessionStorage.getItem('chatConf')).avatar}
                                    image={itm.image}
                                    time={timeString}
                                />
                            );
                        })
                    }
                    <div ref={messagesEndRef}/>
                </div>
            </div>
            <div className="contentFooter">
                <div className="sendNewMessage">
                    <button className="addFiles" onClick={changeLanguage}>
                        {selectedLanguageString}
                        <i className="fa fa-plus"/>
                    </button>
                    <button className="addFiles"
                            onMouseDown={startListening}
                            onMouseUp={stopListening}>
                        Listen
                        <i className="fa fa-plus"/>
                    </button>
                    {/*{transcript}*/}
                    <form onSubmit={customOnSubmit}>
                        <input
                            type="text"
                            placeholder="Type a message here"
                            onChange={onStateChange}
                            value={chat.msg}
                        />
                    </form>
                    <button className="btnSendMsg" id="sendMsgBtn" onClick={customOnSubmit}>
                        Send
                        <i className="fa fa-paper-plane"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
