import React, { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { serverUrl, clientUrl } from "../util/constants";

const Login: React.FC = () => {
  const signIn = useSignIn();
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
    try {
      const response = await axios.post(`${serverUrl}/auth/login`, {
        username,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        signIn({
          auth: { token: response.data.token, type: "Bearer" },
          userState: { username: response.data.username, id: response.data.id },
        });
        window.location.href = `${clientUrl}/getMostStarred`;
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <br></br>
        <a href={`${clientUrl}/`}>Go to signup</a>
      </form>
    </div>
  );
};

export default Login;
