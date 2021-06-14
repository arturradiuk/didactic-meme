import React, {useEffect, useState} from "react";
import "./chatList.css";
import axios from "axios";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {TableRow, TextField, makeStyles, TableCell} from "@material-ui/core";
import Avatar from "./Avatar";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function createData(
        userName: string,
        active: boolean,
        aDelay: number,
) {
    return {
        userName: userName,
        active: active,
        aDelay: aDelay,
    };
}

export interface RowProps {
    row: ReturnType<typeof createData>,
    style: React.CSSProperties,
    onChange: () => Promise<any>,
}

function Row(this: any, props: RowProps) {

    const {row} = props;
    const {style} = props;
    const classes = useRowStyles();

    const handleYourChatConf = async () => {
        sessionStorage.setItem("chatConf", JSON.stringify(row));
    }

    const selectChat = (e: any) => {
        for (
                let index = 0;
                index < e.currentTarget.parentNode.children.length;
                index++
        ) {
            e.currentTarget.parentNode.children[index].classList.remove("active");
        }
        e.currentTarget.classList.add("active");
    };

    return (
            <div
                    style={{animationDelay: `0.${row.aDelay}s`}}
                    onClick={(e) => {
                        selectChat(e);
                        handleYourChatConf();
                    }}
                    className={`chatlistItem ${
                            row.active ? row.active : ""
                    } `}
            >
                <div className="userMeta">
                    <p>{row}</p>
                </div>
            </div>
    );
}

async function getYourChatList() {

    const token = localStorage.getItem('token');

    return await axios.get(`http://localhost:8080/api/users/_self/chat-names`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

/*async function getAvatars() {
    return axios.get('http://localhost:8080/api/users/chat-avatar/chat-avatars', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}*/

function getYourChatConf(row: string) {
    const token = localStorage.getItem('token');

    return axios.get(`http://localhost:3000/Chat/Conf`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


export default function ChatList() {

    const chatList = JSON.parse(sessionStorage.getItem("chatList") as string)
    const chatConf = JSON.parse(sessionStorage.getItem("chatConf") as string)

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [avatars, setAvatars] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const handleChange = () => {
        return setUser(chatConf);
    }

    const getYourChatLista = () => {
        return getYourChatList().then(res => {
            setUsers(res.data)
        })
    }

    useEffect(() => {
        getYourChatList().then(res => {
            sessionStorage.setItem("chatList", JSON.stringify(res.data));
            setUsers(res.data)
            // setUser(chatConf.userName);
        })

/*             getAvatars().then(res => {
                const x = res.data.map((json: any) => {
                console.log('json:')
                console.log(json)
                const avatar_json: any = {}
                avatar_json[json.userName as string] = json.avatar as string;
                console.log('avatar json:')
                console.log(avatar_json);
                return avatar_json;
            });
            console.log('array:')
            console.log(x);
            sessionStorage.setItem('avatars', JSON.stringify(x));
            return x;
        });*/

    }, []);

    // useEffect(() => {
    //
    // }, []);

    function search(rows: any[]) {
        console.log(rows)
        if (Array.isArray(rows) && rows.length) {
            const filteredAccount = rows.filter(
                    row => row.props.row.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
            );

            filteredAccount.forEach(account => (accounts.includes(account.props.row) ?
                    "" : accounts.push(account.props.row)));
            return filteredAccount
        } else {
            return rows;
        }
    }

    const accounts: String[] = [];
    console.log(users)

    return (
            <div className={'mainChatlist'}>
                <div>
                    <Autocomplete
                            options={accounts}
                            inputValue={searchInput}
                            onChange={(event, value) => {
                                setSearchInput(value as string ?? '')
                            }}
                            renderInput={(params) => (
                                    <TextField {...params} label='search account' variant="outlined"
                                               onChange={(e) => setSearchInput(e.target.value)}/>
                            )}
                    />
                </div>
                <table className={'mainChatlistTable'}>
                    <tr style={{fontSize: 25, fontWeight: "bold"}}>Użytkownicy:</tr>
                    {search(users.map((user, index) => (
                            <Row key={index} row={user}
                                 style={{
                                     backgroundColor: `var(--${'dark-light'}`,
                                     color: `var(--${'white'}`
                                 }} onChange={getYourChatLista}/>
                    )))}
                </table>
            </div>
    )
}


