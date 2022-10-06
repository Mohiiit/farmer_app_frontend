import React, { useContext, useEffect, useState } from "react";

// import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import ProfileDataModel from "./ProfileDataModel";

const Table = () => {
    const [token] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [language, setLanguage] = useState("");
    const [data, setData] = useState(null);

    const getData = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch(`/farmers/${language}`, requestOptions);

        if(!response.ok) {
            setErrorMessage("Something went wrong. Couldn't load the farmer data");
        } else {
            const data = await response.json();
            setData(data);
            setLoaded(true);
        }
    };

    // useEffect(() => {
    //     getData();
    // }, []);

    

    const handleSubmit = (e) => {
        setData(null);
        setLoaded(true);
        e.preventDefault();
        getData();
    };

    return (
        <>
            <div className="column">
                <form className="box" onSubmit={handleSubmit}>
                    <h1 className="title has-text-centered"> Choose Language </h1>

                    <div className="field">
                        <label className="label">Language</label>
                        <div className="control">
                            <input type="string" placeholder="Choose Language" value={language} onChange={(e) => setLanguage(e.target.value)} className="input" required />
                        </div>
                    </div>

                    <button className="button is-primary" type="submit">
                        Get Data
                    </button>
                </form>
            </div>
            {loaded && data ? (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Farmer Name</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Village</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((farmer) => (
                            <tr key={farmer.username}>
                                <td>{farmer.farmer_name}</td>
                                <td>{farmer.state_name}</td>
                                <td>{farmer.district_name}</td>
                                <td>{farmer.village_name}</td>
                                <td>{farmer.phone_number}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            ) : (
                <h1> loading </h1>
            )}
        </>
    );
};

export default Table;