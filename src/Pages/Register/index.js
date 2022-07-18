import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import "./Register.css";
import iconChat from "../assets/iconChat.svg"

export default function Register() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [companyName, setCompanyName] = useState();
    //const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    function submit(e) {
        e.preventDefault();
        api.post('/perfis/', {
            nome: name,
            email: email,
            senha: password,
            nome_empresa: companyName
        })
            .then(resp => {
                console.log(resp);
                history.push('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="register">
        <div className="titulo">
            <h1>Simple Chat</h1>
            <img src={iconChat}/>
        </div>


            <form onSubmit={submit} className='form'>
                <div className="titulo">
                    <h3>Cadastrar um nova conta</h3>
                </div>
                <div className="_linha">
                    <span className="_linhaTeste">É rapido!</span>
                </div>
                <label>

                    <input type='text' placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </label>

                <label>

                    <input type='text' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <input type='text' placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} />
                </label>

                {/* <label>
                Phone
                <input type='text' onChange={(e) => setPhone(e.target.value)} />
            </label> */}

                <label>

                    <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </label>

                <button>Register</button>
                <div className="_1rf5">
                    <span className="_1rf8">
                        ou
                    </span>
                </div>

                <ul>
                    <li>
                        <NavLink exact to="/">
                            Já tenho uma conta?
                        </NavLink>
                    </li>
                </ul>
            </form>

        </div>
    );
}
