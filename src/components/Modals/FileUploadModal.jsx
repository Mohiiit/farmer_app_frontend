import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";


const FileUploadModal = ({active, handleModal}) => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState();

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
            setMessage("Data Upload Fail");
        } else {
            setMessage("Data Upload Successful");
            handleModal();
        }
    };

    return (
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={handleModal}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title">
                        Upload Your File
                    </h1>
                </header>
                <section className="modal-card-body">
                    <form>

                        <div className="field">
                            <label className="lable">Select File</label>
                            <div className="control">
                                <input type="file" className="input" accept=".csv" onChange={(e) => setFile(e.target.files[0])}/>
                            </div>
                        </div>

                    </form>
                </section>
                <ErrorMessage message={message}
                />
                <footer className="modal-card-foot has-background-primary-light">
                    <button className="button is-info"  onClick={(e) => {handleFileUpload(e);}}> Upload</button>
                    <button className="button" onClick={handleModal}> Cancel </button>
                </footer>
            </div>
        </div>
    );
};

export default FileUploadModal;