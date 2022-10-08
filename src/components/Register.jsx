import React, { useContext, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import RegsiterModal from "./Modals/RegisterModal";

import { UserContext } from "../context/UserContext";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [farmerName, setFarmerName] = useState("");
    const [stateName, setStateName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [villageName, setVillageName] = useState("");
    const [activeModal, setActiveModal] = useState(false);
    const [message, setMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                username: username, 
                password: password,
                farmer_name: farmerName,
                state_name: stateName,
                district_name: districtName,
                village_name: villageName,
            }),
        };
    
        const response = await fetch("/signup", requestOptions);
        const data = await response.json();
    
        if (!response.ok) {
            setMessage(data.detail);
        } else {
            setToken(data.access_token);
            setMessage("You can log in now!!!!");
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length > 5) {
            submitRegistration();
        } else {
            setMessage(
                "Ensure that the password is strong and has greater than 5 characters"
            );
        }
        handleModal();
    };

    const handleModal = () => {
        setActiveModal(!activeModal);
    }

    return (
        <div className="column">
            <RegsiterModal
                active={activeModal}
                handleModal={handleModal}
                response={message}
            />
            <form className="box" onSubmit={handleSubmit}>

                <h1 className="title has-text-centered"> Register</h1>

                <div className="field">
                    <label className="label">Farmer Name</label>
                    <div className="control">
                        <input type="string" placeholder="Enter Your Name" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} className="input" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input type="string" placeholder="Enter Your Phone Number" value={username} onChange={(e) => setUsername(e.target.value)} className="input" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">State</label>
                    <div className="control">
                        <input type="string" placeholder="Enter Your State" value={stateName} onChange={(e) => setStateName(e.target.value)} className="input" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">District</label>
                    <div className="control">
                        <input type="string" placeholder="Enter Your District" value={districtName} onChange={(e) => setDistrictName(e.target.value)} className="input" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Village</label>
                    <div className="control">
                        <input type="string" placeholder="Enter Your Village" value={villageName} onChange={(e) => setVillageName(e.target.value)} className="input" required />
                    </div>
                </div>

                <br />
                <button className="button is-primary" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;