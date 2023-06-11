import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
const Backoffice = () => {
  const [data, setData] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [num, setnum] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/backOffice
          `,
          {
            id: num,
          }
        );

        setData(response.data);
        setChargement(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [num]);
  return chargement ? (
    <p>Chargement en cours</p>
  ) : (
    <div>
      {data.map((offres, index) => {
        return (
          <div key={index} className="container">
            <table>
              <caption>Réservation</caption>
              <tr>
                <th>Nom/prenom</th>
                <th>Email</th>
                <th>Nb jours</th>
                <th>Prix total €</th>
                <th>Date</th>
                <th>Lieu</th>
                <th>Véhicule</th>
              </tr>
              <tr>
                <td>{offres.prenom}</td>
                <td>{offres.mail}</td>
                <td> {offres.resa[0].jourTotal}</td>
                <td> {offres.resa[0].prixTotal}</td>
                <td> {offres.resa[0].dateAller}</td>
                <td> {offres.resa[0].lieu}</td>

                <td>
                  <img src={offres.resa[0].image} />
                </td>
              </tr>
            </table>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default Backoffice;
