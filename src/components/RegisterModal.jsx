import React from "react";

const RegsiterModal = ({active, response, handleModal}) => {

    return (
        <div className={`modal ${active && "is-active"}`}>
            <div className="modal-background" onClick={handleModal}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <h1 className="modal-card-title">
                        Sign Up Status
                    </h1>
                </header>
                <section className="modal-card-body">
                    {response}
                </section>
                <footer className="modal-card-foot has-background-primary-light">
                    <button className="button is-primary" onClick={handleModal}> Done </button>
                    <button className="button" onClick={handleModal}> Cancel </button>
                </footer>
            </div>
        </div>
    );
};

export default RegsiterModal