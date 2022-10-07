import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ProfileDataModel from "./ProfileDataModel";


const Header = ({ title }) => {
    const [token, setToken] = useContext(UserContext);
    const [activeModal, setActiveModal] = useState(false);
    const [, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [file, setFile] = useState();


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

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file, file.name);
        const requestOptions = {
            method: "POST",
            body: data
        };
    
        const response = await fetch("/upload", requestOptions);
    
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            console.log(response.data);
        }
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
                <br />
                <div style={{ textAlign: "center" }}>
                    <h1>REACTJS CSV IMPORT EXAMPLE </h1>
                    <form>
                        <input
                            type={"file"}
                            accept={".csv"}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button
                            onClick={(e) => {
                                handleFileUpload(e);
                            }}
                        >
                            Upload .csv
                        </button>
                    </form>
                </div>
                </>
            )}
        </div>
    );
};

export default Header;