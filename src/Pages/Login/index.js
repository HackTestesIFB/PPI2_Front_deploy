import React, { useState } from "react";
import "./Login.css";
import { api } from "../../Services/api";
import { login } from "../../Services/utils";
import { NavLink, useHistory } from "react-router-dom";
import iconChat from "../assets/iconChat.svg";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  function submit(e) {
    e.preventDefault();
    api.post("/login/", { username, password })
      .then(resp => {
        login(resp.data.token);
        console.log(resp);
        history.push("/profiles");
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="login" >
      <div className="titulo">
        <h1>Simple Chat</h1>
        <img src={iconChat}/>
      </div>
      <form className="form">
        <label>
          <input type="text" placeholder="Username" onChange={(e) =>
            setUsername(e.target.value)} />
        </label>

        <label>
          <input type="password" placeholder="Password" onChange={(e) =>
            setPassword(e.target.value)} />
        </label>

        <button type="submit" onClick={submit}>Login</button>
        <div className="_linha">
          <span className="_linhaTeste">
            ou
          </span>
        </div>
        <ul>
          <li>
            <NavLink exact to="/register">
              Register
            </NavLink>
          </li>
        </ul>

      </form>
    </div>
  )
}
