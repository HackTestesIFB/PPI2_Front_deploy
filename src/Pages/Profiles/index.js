import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import "./Profiles.css";

export default function Profiles() {

  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    api.get('/perfil/')
    .then((resp) => setCurrentProfile(resp.data))
    .catch((error) => console.error(error));

    api
    .get('/perfis/')
    .then((resp) => setProfiles(resp.data))
    .catch((error) => console.error(error));

  }, []);

  function invite(id){
    api.post(`/convites/convidar/${id}`)
    .then((resp) => setMessage(resp.data))
    .catch((error) => console.error(error));
  }

  return (
  <div className="profiles">
    <div className="invite">
        {profiles?.map((profile) =>  
            profile.id == currentProfile?.id ? null : (
                <>
                    <div className="card" key={profile.id}>
                        <h3>{profile.nome}</h3>
                        <span>{profile.email}</span>
                        {profile.pode_convidar ? <button className="icon" title="convidar" onClick={() => invite(profile.id)}></button> : null}
                    </div>
                </>
            ),
        )}
    </div>
  </div>
  );
}
