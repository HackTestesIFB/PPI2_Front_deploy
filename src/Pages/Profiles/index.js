import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import "./Profiles.css";
import iconChat from "../assets/iconChat.svg";
import { logout } from '../../Services/utils';
import { NavLink, useHistory } from 'react-router-dom';

export default function Profiles() {

  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [message, setMessage] = useState();
  const [currentInvitedProfile, setCurrentInvitedProfile] = useState();
  const [invites, setInvites] = useState();
  //const [contacts, setContacts] = useState();

  useEffect(() => {
    api.get('/perfil/')
    .then((resp) => setCurrentProfile(resp.data))
    .catch((error) => console.error(error));

    api
    .get('/perfis/')
    .then((resp) => {
        setProfiles(resp.data)

        const tempProfiles = resp.data;
    
        api.get('/convites/')
        .then(resp => {
            const invitesInfo = resp.data.map((invite) => {
                const profile = tempProfiles?.find((profile) => invite.solicitante === profile.id);

                return { ...profile, inviteId: invite.id };
            });

            setInvites(invitesInfo);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));

  }, []);

  function invite(id){
    api.post(`/convites/convidar/${id}`)
    .then((resp) => setMessage(resp.data.messagem))
    .catch((error) => console.error(error));

    setCurrentInvitedProfile(id);
  }

  function accept(id) {
    api
      .post(`/convites/aceitar/${id}`)
      .then((resp) => console.log(resp))
      .catch((error) => console.error(error));
      
  }

  const history = useHistory();
  
  function handleLogout() {
    logout();
    history.push("/");
  }


  return (
  <>
  <nav className="navBar">
        <div className="tituloProfile">
            <h1>Simple Chat</h1>
            <img src={iconChat}/>
        </div>
        <ul className="navLi">
        <h4>{currentProfile?.nome} </h4>
            <li>
                <NavLink exact to="/">
                    Login   
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/register">
                    Register
                </NavLink>
            </li>            
        </ul>
        <button className="btnProfile"  onClick={handleLogout}>Sign out</button>
  </nav>
  
    <div className="profiles">
        <div className="invite">
            <h1>Solicitar amizade</h1>
            {profiles?.map((profile) =>  
                profile.id === currentProfile?.id ? null : (
                    <div key={profile.id}>
                        <div className="card">
                            <h3>{profile.nome}</h3>
                            <span>{profile.email}</span><br/>
                            {profile.pode_convidar ? <button className="icon" title="convidar"  onClick={() => invite(profile.id)}> Convidar</button> : null}
                        </div>
                        {profile.id === currentInvitedProfile ? <span className="message">{message}</span> : null}
                    </div>
                ),
            )}
        </div>

        <div className="invitations">
            <h2>Convites</h2>
            {invites?.map((item) => (
                <div className="card-default card" key={item.inviteId}>
                    <h3>{item.nome}</h3>
                    <button onClick={() => accept(item.inviteId)}>Aceitar</button>
                </div>
            ))}
        </div>

        <div className="contacts">
            <h2>Contatos Aceitos</h2>
            <ul className="contact">
                {currentProfile?.contatos.map(contact => (
                    <li className="card-default card" key={contact.id}>
                        <h3>{contact.nome}</h3>
                        <span>{contact.email}</span>
                    </li>
                ))}
            </ul>

        </div>
    </div>
  </>
  );
}
