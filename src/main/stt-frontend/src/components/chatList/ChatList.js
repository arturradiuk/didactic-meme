import React, {Component} from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";

export default class ChatList extends Component {
    allChatUsers = [
        {
            image:
                "",
            id: 1,
            name: "sampleUser1",
            active: true,
            isOnline: true,
        },

        {
            image:
                "",            id: 2,
            name: "sampleUser2",
            active: false,
            isOnline: true,
        },

        {
            image:
                "",            id: 3,
            name: "sampleUser3",
            active: false,
            isOnline: true,
        },

    ];

    constructor(props) {
        super(props);
        this.state = {
            allChats: this.allChatUsers,
        };
    }

    render() {
        return (
            <div className="mainChatlist">
                <button className="btn">
                    <i className="fa fa-plus"></i>
                    <span>New conversation</span>
                </button>
                <div className="chatlistHeading">
                    <h2>Chats</h2>
                    <button className="btn-nobg">
                        <i className="fa fa-ellipsis-h"></i>
                    </button>
                </div>
                <div className="chatList__search">
                    <div className="search_wrap">
                        <input type="text" placeholder="Search Here" required/>
                        <button className="search-btn">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="chatlisItems">
                    {this.state.allChats.map((item, index) => {
                        return (
                            <ChatListItems
                                name={item.name}
                                key={item.id}
                                animationDelay={index + 1}
                                active={item.active ? "active" : ""}
                                isOnline={item.isOnline ? "active" : ""}
                                image={item.image}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
