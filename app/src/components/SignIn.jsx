import React from "react";
import { Link } from "react-router-dom";

export class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    loginRequest() {
        // request goes here.
        // you can get the values of the email and the password like this:
        console.log("Email: " + this.state.email + ", password: " + this.state.password);
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
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                    name="email"
                                    placeholder="Email"
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
