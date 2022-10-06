import React, { useContext, useEffect, useState } from "react";
import Register from "./components/Register";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
function App() {
  const[message, setMessage] = useState("");
  const [token, ] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Contenc-Type": "application/json",
      },
    };
    const response = await fetch("/health", requestOptions);
    const data = await response.json();

    console.log(data);
    if (!response.ok) {
      console.log("you ducked up")
    } else {
      setMessage(data.message);
    } 
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);
  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Register /> <Login />
            </div>
          ) : (
            <h1 className="table"> table </h1>
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
}

export default App;
