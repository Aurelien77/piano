import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

import LocalCafeIcon from "@material-ui/icons//LocalCafe";

function Postpriv() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername2] = useState("");
  const [photo_profil, setphoto_profil2] = useState("");
  const [listOfPosts, setListOfPosts2] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/postpriv/${id}`).then((response) => {
      setUsername2(response.data.username);
      setphoto_profil2(response.data.photo_profil);
    });

    axios
      .get(`http://localhost:3001/posts/byuserIdpriv/${id}`)
      .then((response) => {
        setListOfPosts2(response.data);
      });
  }, []);
  const mode2 = () => {
    window.location.reload(false);
  };

  return (
    <div className="flexgobal">
      <div className="modif">
        {" "}
        <span className="boutonmodif">
          <button onClick={mode2}>📑</button>
        </span>
      </div>
      <div className="app3">
        <div className="">
          <div className="basicinfo3">
            {" "}
            <h1> Page de profil de : {username} </h1>
            <div className="profil">
              <img
                src={"http://localhost:3001/images/" + photo_profil}
                alt="profil"
              />{" "}
            </div>
            {(authState.username === username || authState.admin === true) && (
              <>
                <button
                  onClick={() => {
                    history.push("/changepassword");
                  }}
                >
                  {" "}
                  Posts Privés
                </button>
                <button
                  onClick={() => {
                    history.push("#");
                  }}
                >
                  {" "}
                  Changer mon mots de passe
                </button>
                <form
                  action={"http://localhost:3001/upload/" + id}
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <div class="form-group">
                    <input
                      type="file"
                      name="file"
                      id="input-files"
                      class="form-control-file border"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Soumêtre l'image
                  </button>
                </form>

                <button
                  onClick={() => {
                    history.push("/delete");
                  }}
                >
                  {" "}
                  Supprimer le compte
                </button>

                <button
                  onClick={() => {
                    history.push("/Recherche");
                  }}
                >
                  {" "}
                  recherche
                </button>
                <button
                  onClick={() => {
                    history.push("/createpostpriv");
                  }}
                >
                  {" "}
                  créer Publication privées
                </button>
              </>
            )}
          </div>{" "}
        </div>

        <div className="listOfPosts">
          {listOfPosts.map((value, key) => {
            return (
              <div key={key} className="post">
                <div className="title"> {value.title} </div>
                <div
                  className="body"
                  onClick={() => {
                    history.push(`/post/${value.id}`);
                  }}
                >
                  {value.postText}
                </div>
                <div className="lien">
                  <iframe
                    width="100%"
                    height="200"
                    src={value.lien}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>

                  {/*  <iframe src={value.lien}></iframe> */}
                  <a target="blank" href={value.lien}>
                    {value.lien}
                  </a>
                </div>
                <div className="footer">
                  <div className="username">{value.username}</div>

                  <div className="buttons">
                    <div className="cofee">
                      {" "}
                      <LocalCafeIcon />
                    </div>

                    <label> {value.Likes.length}</label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
    </div>
  );
}

export default Postpriv;
