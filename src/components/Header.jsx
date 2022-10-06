import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ProfileDataModel from "./ProfileDataModel";
import ErrorMessage from "./ErrorMessage";

const Header = ({ title }) => {
    const [token, setToken] = useContext(UserContext);
    const [activeModal, setActiveModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");

    const handleLogout = () => {
        setToken(null);
    };

    const getCurrentUser = async () => {
        const requestOptions = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
        };
    
        const response = await fetch("/users/me/", requestOptions);
        const data = await response.json();
    
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setUsername(data.username);
        }
    };

    const handleModal = async () => {
        await getCurrentUser();
        setActiveModal(!activeModal);
    };

    return (
        <div className="has-text-centered m-6">
            <h1 className="title">{title}</h1>
            {token && (
                <>
                <ProfileDataModel
                    active={activeModal}
                    handleModal={handleModal}
                    token={token}
                    username={username}
                    setErrorMessage={setErrorMessage}
                />
                <button className="button" onClick={handleLogout}>
                    Logout
                </button>
                <button className="button mr-2 is-info is-light" onClick={handleModal}>
                    Change Profile Data
                </button>
                </>
            )}
        </div>
    );
};

export default Header;