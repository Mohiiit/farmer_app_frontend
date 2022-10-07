import React, { useState } from "react";

const ProfileDataModel = ({ active, handleModal, token, username, setErrorMessage}) => {
    const [password, setPassword] = useState("");
    const [farmerName, setFarmerName] = useState("");
    const [stateName, setStateName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [villageName, setVillageName] = useState("");

    const cleanFormData = () => {
        setFarmerName("");
        setStateName("");
        setDistrictName("");
        setVillageName("");
        setPassword("");
    };

      
    const UpdateProfileData = async () => {
        const requestOptions = {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({ 
                password: password,
                farmer_name: farmerName,
                state_name: stateName,
                district_name: districtName,
                village_name: villageName,
            }),
        };
        // await getCurrentUser();
        const response = await fetch(`/update/${username}`, requestOptions);
    
        if(!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the farmer data");
        } else {
            cleanFormData();
            handleModal();
        }
    };

    return (
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={handleModal}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title">
                        Update Your Data
                    </h1>
                </header>
                <section className="modal-card-body">
                    <form>

                        <div className="field">
                            <label className="label">Farmer Name</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Enter updated Name" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">State</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Enter updated State" value={stateName} onChange={(e) => setStateName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">District</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Enter updated District" value={districtName} onChange={(e) => setDistrictName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Village</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Enter updated Village" value={villageName} onChange={(e) => setVillageName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input type="password" className="input" placeholder="Enter updated Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                    </form>
                </section>
                <footer className="modal-card-foot has-background-primary-light">
                    <button className="button is-info" onClick={UpdateProfileData}>Update</button>
                    <button className="button" onClick={handleModal}>Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default ProfileDataModel;