import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import FileUploadModal from "./Modals/FileUploadModal";
import ProfileDataModel from "./Modals/ProfileDataModel";


const Header = ({ title }) => {
    const [token, setToken] = useContext(UserContext);
    const [activeModal, setActiveModal] = useState(false);
    const [, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [fileUploadModal, setFileUploadModal] = useState(false);

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
    
        const response = await fetch("/me", requestOptions);
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

    const handleFileUploadModal = () => {
        setFileUploadModal(!fileUploadModal);
    }

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
                <FileUploadModal 
                    active={fileUploadModal}
                    handleModal={handleFileUploadModal}
                />
                <button className="button mr-2" onClick={handleLogout}>
                    Logout
                </button>
                <button className="button mr-2 is-info is-light" onClick={handleModal}>
                    Change Profile Data
                </button>
                <button className="button mr-2 is-info" onClick={handleFileUploadModal}>
                    Upload Data Using CSV
                </button>
                </>
            )}
        </div>
    );
};

export default Header;