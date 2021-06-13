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
    login: string,
) {
    return {
        login: login,
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

    const handleYourChatConf = async () =>  {
        getYourChatConf(row.login).then(res => {
                sessionStorage.setItem("chatList", JSON.stringify(res.data));
    });
        return(
                <TableRow className={classes.root}  onClick={() =>{
                    handleYourChatConf();
                }
                }>
                    <TableCell component="th" scope="row" style={style}>
                        {row.login}
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

}
    function getYourChatList(){

        const token = localStorage.getItem('token');

        return axios.get(`http://localhost:3000/Chat/Lista`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    function getYourChatConf(login: string){
        const token = localStorage.getItem('token');

        return axios.get(`http://localhost:3000/Chat/Conf`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


export default function ChatList() {

    const chatList = JSON.parse(sessionStorage.getItem("chatList") as string)
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const handleChange = () => {
        return setUser(chatList.login);
    }
 /*   const getYourChatLista = () => {
        return getYourChatList().then(res => {
            setUsers(res.data)
            /!*        }).catch(error => {
                        const message = error.response.data*!/
        })
    }*/
    const getYourChatLista = () => {
        return getYourChatList().then(res => {
            setUsers(res.data)
    })
    }

    useEffect(() => {
        getYourChatList().then(res => {
            setUsers(res.data)
            setUser(chatList.login);
        })
    }, []);

    function search(rows: any[]) {
        if (Array.isArray(rows) && rows.length) {
            const filteredAccount = rows.filter(
                    row => row.props.row.login.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
            );

            filteredAccount.forEach(account => (accounts.includes(account.props.row.login) ?
                    "" : accounts.push(account.props.row.login)));
            return filteredAccount
        } else {
            return rows;
        }
    }

    const accounts: String[] = [];

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
                            <Row key={index} row={user} /*onChange={handleChange}*/ style={{
                                backgroundColor:  `var(--${'dark-light'}`,
                                color: `var(--${'white'}`
                            }} onChange={getYourChatLista}/>
                    )))}
                </table>
            </div>
    )
}


