import React from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

export class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
        };
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeLogin(event) {
        this.setState({login: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    async loginRequest() {
        const json = {
            "login": this.state.login,
            "password": this.state.password
        }

        await axios.post('http://localhost:8080/api/auth/login', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            window.localStorage.setItem('token', response.data)
            window.localStorage.setItem('currentUser', json.login)
            window.location.href = '/Chat'
        }).catch(error => {
            window.alert("Invalid credentials, please try again")
            for (const inputElement of document.getElementsByTagName('input')) {
                inputElement.value = ""
            }
        });
    }

    render() {
        return (
                <div className="signin__wrapper">
                    <div className="signin__card">
                        <div className="signin__left"></div>
                        <div className="signin__right">
                            <div className="signin__header">
                                <div className="signin__header-text">Sign In</div>
                            </div>
                            <div className="signin__content">
                                <div className="signin__form">
                                    <input
                                            className="signin__input"
                                            type="text"
                                            value={this.state.login}
                                            onChange={this.handleChangeLogin}
                                            name="login"
                                            placeholder="Login"
                                    />
                                    <input
                                            className="signin__input"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handleChangePassword}
                                            name="password"
                                            placeholder="Password"
                                    />
                                    <div className="signin__button" onClick={() => this.loginRequest()}>
                                        Sign In
                                    </div>
                                </div>
                            </div>
                            <Link to="signup">
                                <div className="signin__link">Don't have an account? Create one!</div>
                            </Link>
                        </div>
                    </div>
                </div>
        );
    }
}

export default SignIn;
