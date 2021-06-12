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

        const authHeader = {'Authorization': `Bearer ${window.localStorage.getItem('token')}`};
        console.log(authHeader);

        await axios.get("http://localhost:8080/api/messages/exchanged/_self/pawel", {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then(response => {
            // console.log(response.data);
            console.log(`chat contents: ${chatItems}`);
            for (const dataElement of response.data) {
                console.log(dataElement);
                chatItems.push({
                    image: "",
                    type: dataElement.receiver.userName === localStorage.getItem('currentUser') ? "" : "other",
                    msg: dataElement.content,
                    time: dataElement.sentTime
                });
                console.log(chatItems);
            }
            chatItems.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
        }).catch(error => {
            window.alert('error');
        });

        this.forceUpdate();
    }

    async componentDidMount() {

        await this.loadMessages(this.chatItms);
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
                        {
                            this.state.chat.map((itm, index) => {
                                console.log(itm);
                                return (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        user={itm.type ? itm.type : "me"}
                                        msg={itm.msg}
                                        image={itm.image}
                                        time={itm.time}
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
