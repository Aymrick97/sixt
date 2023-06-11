import React from "react";
import { useState } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Offerlist from "../pages/Offerlist";

function Moteur({
  search,
  setsearch,
  pickupDate,
  setpickupDate,
  returnDate,
  setreturnDate,
  id,
  setid,
  barre,
  setbarre,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [button, setbutton] = useState(false);
  const [data, setData] = useState([]);
  const [btn, setbtn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/?q=${search}
          `
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className="moteur">
      <div className="type">
        <p>VOITURES</p>
        <span>UTILITAIRES</span>
      </div>

      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage("");
            navigate("Offerlist");
            setbtn(false);
          }}
        >
          <div className="labelInput">
            <label htmlFor="recherche">Retrait et retour</label>

            <input
              id="recherche"
              type="text"
              placeholder="Recherchez vos agences"
              value={search}
              onChange={(event) => {
                setsearch(event.target.value);

                setbarre(true);
              }}
            />
            {barre ? (
              <div className="look">
                <section className="secVille">
                  <h2>Sélectionner votre agence</h2>
                  {data[0].map((elem, id) => {
                    return (
                      <div key={id}>
                        <div
                          className="villes"
                          onClick={() => {
                            //console.log(elem.id);
                            const id = elem.id;
                            setid(id);
                            setsearch(elem.title);
                            setbarre(false);
                          }}
                        >
                          <p>{elem.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </section>
                <div id="blanc"></div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="labelInput">
            <label htmlFor="pickupDate">Date de départ</label>
            <input
              id="pickupDate"
              type="datetime-local"
              value={pickupDate}
              onChange={(event) => {
                setpickupDate(event.target.value);
              }}
            />
          </div>
          <div className="labelInput">
            <label htmlFor="returnDate">Date de retour</label>
            <input
              id="returnDate"
              type="datetime-local"
              value={returnDate}
              onChange={(event) => {
                setreturnDate(event.target.value);
              }}
            />
          </div>

          {search && pickupDate && returnDate > pickupDate ? (
            <button id="btnactive" type="submit">
              Voir les offres
            </button>
          ) : (
            <button id="disable" disabled>
              voir offre
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Moteur;
