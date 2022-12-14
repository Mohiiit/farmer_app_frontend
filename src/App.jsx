import React, { useContext, useEffect, useState } from "react";
import Register from "./components/Register";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import Table from "./components/Table";
function App() {
  const[message, setMessage] = useState("");
  const [token, ] = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

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

  const handleLogin = () => {
    // e.preventDefault();
    setLoggedIn(!loggedIn);
  }

  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <>
            {!loggedIn ? (
              <>
                <div className="column has-text-centered">
                  Already a user? Click the button: 
                  <button className="button is-primary" onClick={handleLogin}> Login </button>
                </div>
                <div className="columns">
                  <Register />
                </div>
              </>
            ): (
              <Login
                handleLogin={handleLogin}
              />
            )}
            </>
          ) : (
            <Table />
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
}

export default App;
