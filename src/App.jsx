import React, { useEffect, useState } from "react";
import Register from "./components/Register";

function App() {
  const[message, setMessage] = useState("");

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
    <div className ="App">
      <h2>{message}</h2>
      <Register />
    </div>
  );
}

export default App;
