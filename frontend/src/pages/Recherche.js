import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Recherche() {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/posts" /* {
        headers: { accessToken: localStorage.getItem("accessToken") },
      } */
      )
      .then((response) => response.json())
      .then((json) => setDatas(json));
  }, []);

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    value.length > 2 && setSearchTerm(value);
  };
  console.log(searchTerm);
  return (
    <>
      <div className="recherche">
        <input
          type="text"
          name="barrecherche"
          id="barrecherche"
          placeholder="Rechercher"
          onChange={handleSearchTerm}
        />
      </div>
      <div className="recherche_resultats">
        {datas
          .filter((val) => {
            return val.title
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase());
          })
          .map((val) => {
            return (
              <div className="recherche_resultat" key={val.id}>
                {val.titre}
              </div>
            );
          })}{" "}
      </div>
    </>
  );
}

export default Recherche;
