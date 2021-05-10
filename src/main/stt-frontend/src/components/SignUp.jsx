import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
        };
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeLogin(event) {
        this.setState({ login: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    async registerRequest() {
        const json = {
            "email": this.state.email,
            "password": this.state.password,
            "userName": this.state.login
        }
        const result = await axios.post('http://localhost:8080/api/auth/register', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Signed in")
            window.location.href = '/SignIn'
        }).catch(error => {
            window.alert("Provided data does not fine to me, please enter it again")
            for (const inputElement of document.getElementsByTagName('input')) {
                inputElement.value = ""
            }
        });
        console.log(result.data)
          // console.log(`Email: ${this.state.email}, Login: ${this.state.login}, Password: ${this.state.password}`)
    }

    render() {
        return (
            <div className="signup__wrapper">
                <div className="signup__card">
                    <div className="signup__left"></div>
                    <div className="signup__right">
                        <div className="signup__header">
                            <div className="signup__header-text">Sign Up</div>
                        </div>
                        <div className="signup__content">
                            <div className="signup__form">
                                <input
                                        className="signup__input"
                                        type="text"
                                        value={this.state.login}
                                        onChange={this.handleChangeLogin}
                                        name="login"
                                        placeholder="Login"
                                />
                                <input
                                    className="signup__input"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                    name="email"
                                    placeholder="Email"
                                />
                                <input
                                    className="signup__input"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChangePassword}
                                    name="password"
                                    placeholder="Password"
                                />
                                <div type="button" className="signup__button" onClick={() => this.registerRequest()}>
                                    Sign Up
                                </div>
                            </div>
                        </div>
                        <Link to="signin">
                            <div className="signup__link">Go back to the login page</div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
