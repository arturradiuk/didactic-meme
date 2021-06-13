import React, {Component, createRef} from "react";


import "./ChatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import axios from "axios";

export default class ChatContent extends Component {
    messagesEndRef = createRef(null);

    chatItms = [
        {
            image:
                "https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png",
            type: "",
            msg: "Message 1",
            time: "2021-06-12T21:28:22.192772"
        },
        {
            image:
                "https://lirp.cdn-website.com/f95a9d1b/dms3rep/multi/opt/BlankProfilePic-494w.png",
            type: "other",
            msg: "Message 2",
            time: "2021-06-12T21:16:18.192772"
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

    async loadMessages(chatItems) {

        const initialSize = chatItems.length;
        let scrollDown = false;
        const chatUser = JSON.parse(sessionStorage.getItem('chatConf'));
        console.log(chatUser);
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

        console.log('refreshing');
        this.forceUpdate();
        if (scrollDown) {
            this.scrollToBottom();
        }
        setTimeout(() => this.loadMessages(chatItems), 1000);
    }

    async componentDidMount() {

        await this.loadMessages(this.chatItms);

        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                if (this.state.msg != "") {
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
                    const message = this.state.msg;
                    this.state.msg = '';
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
                    this.forceUpdate();
                }
            }
        });
        this.scrollToBottom();
    }

    onStateChange = (e) => {
        console.log("Hi I'm here");
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
                            <p>{JSON.parse(sessionStorage.getItem('chatConf'))}</p>
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
                        {
                            this.state.chat.map((itm, index) => {

                                const time = new Date(Date.parse(itm.time));
                                const timeString = `${time.getHours()}:${time.getMinutes()}`;
                                return (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        user={itm.type ? itm.type : "me"}
                                        msg={itm.msg}
                                        image={itm.image}
                                        time={timeString}
                                    />
                                );
                            })
                        }
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
