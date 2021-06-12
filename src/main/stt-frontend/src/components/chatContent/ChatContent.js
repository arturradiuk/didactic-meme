import React, {Component, useState, createRef, useEffect} from "react";

import "./ChatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import axios from "axios";

export default class ChatContent extends Component {
    messagesEndRef = createRef(null);

    chatItms = [
        {
            key: 1,
            image:
                "https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png",
            type: "",
            msg: "Message 1",
        },
        {
            key: 2,
            image:
                "https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png",
            type: "other",
            msg: "Message 2",
        },

    ];

    constructor(props) {
        super(props);
        this.state = {
            chat: this.chatItms,
            msg: "",
        };
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    async componentDidMount() {
        async function loadMessages() {
            const authHeader = {'Authorization': `Bearer ${window.localStorage.getItem('token')}`};
            console.log(authHeader);

            await fetch("http://localhost:8080/api/messages/received/_self", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            }).then(response => {
                for (const dataElement of response.data) {
                    this.state.chat.push({
                        key: 123,
                        image: "",
                        type: "",
                        msg: dataElement.content
                    });
                }
            }).catch(error => {
                window.alert('error');
            });
        }

        //     await axios.get('http://localhost:8080/api/messages/received/_self', {
        //         headers: {
        //             'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        //         }
        //     }).then(response => {
        //         for (const dataElement of response.data) {
        //             this.state.chat.push({
        //                 key: 123,
        //                 image: "",
        //                 type: "",
        //                 msg: dataElement.content
        //             });
        //         }
        //     }).catch(error => {
        //         window.alert('error');
        //     });
        // }

        // await loadMessages();

        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                if (this.state.msg != "") {
                    this.chatItms.push({
                        key: 1,
                        type: "",
                        msg: this.state.msg,
                        image:
                            "https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png",
                    });
                    this.setState({chat: [...this.chatItms]});
                    this.scrollToBottom();
                    this.setState({msg: ""});
                }
            }
        });
        this.scrollToBottom();
    }

    onStateChange = (e) => {
        this.setState({msg: e.target.value});
    };

    render() {
        return (
            <div className="mainChatcontent">
                <div className="contentHeader">
                    <div className="blocks">
                        <div className="currentChattingUser">
                            <Avatar
                                isOnline="active"
                                image="https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png"
                            />
                            <p>chat title</p>
                        </div>
                    </div>

                    <div className="blocks">
                        <div className="settings">
                            <button className="btn-nobg">
                                <i className="fa fa-cog"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contentBody">
                    <div className="chat__items">
                        {this.state.chat.map((itm, index) => {
                            return (
                                <ChatItem
                                    animationDelay={index + 2}
                                    key={itm.key}
                                    user={itm.type ? itm.type : "me"}
                                    msg={itm.msg}
                                    image={itm.image}
                                />
                            );
                        })}
                        <div ref={this.messagesEndRef}/>
                    </div>
                </div>
                <div className="contentFooter">
                    <div className="sendNewMessage">
                        <button className="addFiles">
                            <i className="fa fa-plus"></i>
                        </button>
                        <input
                            type="text"
                            placeholder="Type a message here"
                            onChange={this.onStateChange}
                            value={this.state.msg}
                        />
                        <button className="btnSendMsg" id="sendMsgBtn">
                            Send
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
