import React, {useEffect, useState} from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import axios from "axios";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {TableRow, TextField, makeStyles, TableCell} from "@material-ui/core";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function createData(
        userName: string,
) {
    return {
        userName: userName,
    };
}

export interface RowProps {
    row: ReturnType<typeof createData>,
        style: React.CSSProperties,
        onChange: () => Promise<any>,
}

function Row(props: RowProps) {

    const {row} = props;
     const {style} = props;
    const classes = useRowStyles();

    const handleYourChatConf = async () => {
            sessionStorage.setItem("chatConf", JSON.stringify(row));
    }
        return(
                <TableRow className={classes.root}  onClick={() =>{
                    handleYourChatConf();
                }
                }>
                    <TableCell component="th" scope="row" style={style}>
                        {row}
                    </TableCell>
{/*                    <th style={style}>{row.firstName}</TableCell>
                    <TableCell style={style}>{row.secondName}</TableCell>
                    <TableCell style={style}>{row.email}</TableCell>
                    <TableCell style={style}>{row.phoneNumber}</TableCell>
                    <TableCell style={style}>{row.companyName}</TableCell>
                    <TableCell style={style}>{row.companyPhoneNumber}</TableCell>*/}
                </TableRow>
        );
}
    async function getYourChatList(){

        const token = localStorage.getItem('token');

        return await axios.get(`http://localhost:8080/api/users/_self/chat-names`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    function getYourChatConf(row: string){
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
    }, []);

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
            <div>
                <div>
                    <Autocomplete
                           options={accounts}
                           inputValue={searchInput}
                        //   style={{width: 300}}
                           onChange={(event, value) => {
                               setSearchInput(value as string ?? '')
                           }}
                           renderInput={(params) => (
                                   <TextField {...params} label='search account' variant="outlined"
                                         onChange={(e) => setSearchInput(e.target.value)}/>
                           )}
                    />
                </div>
                <table>
                    <tr>Rozmowy</tr>
                    {search(users.map((user, index) => (
                            <Row key={index} row={user} style={{
                                backgroundColor:  `var(--${'dark-light'}`,
                                color: `var(--${'white'}`
                            }} onChange={getYourChatLista}/>
                    )))}
                </table>
            </div>
    )
}


