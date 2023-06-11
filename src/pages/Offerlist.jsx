import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Moteur from "../components/Moteur";
import Footer from "../components/Footer";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#191919",
  },
};

Modal.setAppElement("#root");
const Offerlist = ({
  search,
  setid,
  setcarid,
  carid,
  id,
  setsearch,
  setpickupDate,
  pickupDate,
  returnDate,
  setreturnDate,
  resa,
  setresa,
  barre,
  setbarre,
}) => {
  let date1 = new Date(pickupDate);
  let date2 = new Date(returnDate);
  // différence des heures
  let time_diff = date2.getTime() - date1.getTime();
  // différence de jours
  let days_Diff = time_diff / (1000 * 3600 * 24);
  // afficher la différence
  //console.log(days_Diff);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(elem) {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [data, setData] = useState([]);
  const [chargement, setchargement] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/rentaloffers?pickupStation=${id}&returnStation=${id}&pickupDate=${pickupDate}&returnDate=${returnDate}`
        );
        // console.log(response);

        setData(response.data);
        setchargement(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, pickupDate, returnDate]);

  return chargement ? (
    <p>chargement en cours...</p>
  ) : (
    <div className="container">
      <Moteur
        search={search}
        setsearch={setsearch}
        pickupDate={pickupDate}
        setpickupDate={setpickupDate}
        returnDate={returnDate}
        setreturnDate={setreturnDate}
        id={id}
        setid={setid}
        setbarre={setbarre}
        barre={barre}
      />
      <div className="offers">
        {data[0].map((elem, id) => {
          return (
            <div key={id} className="cars">
              <p id="desc">{elem.headlines.description}</p>
              <p id="shortSubline">{elem.headlines.shortSubline}</p>
              <img
                src={elem.images.small}
                alt=""
                onClick={() => {
                  // console.log(elem.id);
                  setcarid([elem]);
                  openModal();
                }}
              />
              <p id="mileageInfo"> ✔︎ {elem.headlines.mileageInfo}</p>
              <p id="price">€ {elem.prices.dayPrice.amount} jour</p>
              <p id="total">
                € {elem.prices.dayPrice.amount * days_Diff} total
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel={"Example Modal"}
        >
          <div>
            {carid.map((elem, id) => {
              return (
                <div key={id} className="modal">
                  <p id="desc">
                    {elem.headlines.description},{elem.headlines.shortSubline}
                  </p>
                  <div className="modDesc">
                    <p>{elem.carGroupInfo.maxPassengers} Sieges</p>
                    <p>{elem.carGroupInfo.doors} Portes</p>

                    {elem.carGroupInfo.automatic === false ? (
                      <p>Manuelle</p>
                    ) : (
                      <p>Automatique</p>
                    )}
                    <p>{elem.carGroupInfo.baggage} bagages</p>
                    {elem.carGroupInfo.airCondition === true ? (
                      <p>climatisation</p>
                    ) : (
                      <p></p>
                    )}
                    <p>{elem.carGroupInfo.driverMinAge} Ans</p>
                  </div>
                  <div className="separe">
                    <img src={elem.images.small} alt="" />
                    <div className="modalBtn">
                      <button id="close" onClick={closeModal}>
                        X
                      </button>
                      <div className="Finmadal">
                        <p id="finalPrice">
                          Total : {elem.prices.dayPrice.amount * days_Diff} €
                        </p>
                        <button
                          id="select"
                          onClick={async () => {
                            await setresa({
                              similaire: elem.headlines.shortSubline,
                              lieu: search,
                              prixjour: elem.prices.dayPrice.amount,
                              description: elem.headlines.description,
                              ageMin: elem.carGroupInfo.driverMinAge,
                              image: elem.images.small,
                              dateAller: pickupDate,
                              dateretour: returnDate,
                              jourTotal: days_Diff,
                              prixTotal:
                                elem.prices.dayPrice.amount * days_Diff,
                            });

                            navigate("/personnaldetails");
                          }}
                        >
                          Sélectionner
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Offerlist;
