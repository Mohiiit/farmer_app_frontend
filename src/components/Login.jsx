import React, { useContext, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
                `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };
    
        const response = await fetch("/login", requestOptions);
        const data = await response.json();
        console.log(data.access_token);
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    }

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>

                <h1 className="title has-text-centered"> Log In</h1>

                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input type="string" placeholder="Enter Your Phone Number" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
                    </div>
                </div>

                <ErrorMessage message={errorMessage} />
                <br />
                <button className="button is-primary" type="submit">
                    LogIn
                </button>
                <button className="button is-light" onClick={handleLogin}>
                    Sign Up
                </button>
            </form> 
        </div>
    );  
};

export default Login;