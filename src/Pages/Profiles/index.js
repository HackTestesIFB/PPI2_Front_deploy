import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import "./Profiles.css";

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

  return (
  <>
    <h1>Olá {currentProfile?.nome} </h1>
    <div className="profiles">
        <div className="invite">
            {profiles?.map((profile) =>  
                profile.id === currentProfile?.id ? null : (
                    <div key={profile.id}>
                        <div className="card">
                            <h3>{profile.nome}</h3>
                            <span>{profile.email}</span>
                            {profile.pode_convidar ? <button className="icon" title="convidar" onClick={() => invite(profile.id)}></button> : null}
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
            <h2>contatos</h2>
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
