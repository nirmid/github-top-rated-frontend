import React, { useState } from "react";
import axios from "axios";
import { serverUrl, clientUrl } from "../util/constants";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.put(`${serverUrl}/auth/signup`, {
      username,
      password,
    });
    if (response.status === 201) {
      window.location.href = `${clientUrl}/login`;
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
        <br></br>
        <a href={`${clientUrl}/login`}>Go to login</a>
      </form>
    </div>
  );
};

export default Signup;
