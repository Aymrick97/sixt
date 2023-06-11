import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "cornsilk",
    innerWidth: "80%",
  },
};

Modal.setAppElement("#root");
const Personnaldetails = ({ resa, carid }) => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [societe, setsociete] = useState("");
  const [prenom, setprenom] = useState("");
  const [mail, setmail] = useState("");
  const [rue, setrue] = useState("");
  const [pays, setpays] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [nom, setnom] = useState("");
  const [codePays, setcodePays] = useState("");
  const [phone, setphone] = useState("");
  const [codePostal, setcodePostal] = useState("");
  const [ville, setville] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <h1>INFORMATION PERSONNELLES</h1>
      <hr />
      <div>
        <form
          className="formPerso"
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage("");

            try {
              const {
                description,
                ageMin,
                lieu,
                dateAller,
                dateretour,
                image,
                jourTotal,
                prixTotal,
              } = resa;

              const response = await axios.post(
                ` http://localhost:3000/personnaldetails
                  `,
                {
                  description: description,
                  ageMin: ageMin,
                  dateAller: dateAller,
                  dateretour: dateretour,
                  image: image,
                  lieu: lieu,
                  jourTotal: jourTotal,
                  prixTotal: prixTotal,
                  societe: societe,
                  prenom: prenom,
                  mail: mail,
                  rue: rue,
                  pays: pays,
                  dateOfBirth: dateOfBirth,
                  nom: nom,
                  codePays: codePays,
                  phone: phone,
                  codePostal: codePostal,
                  ville: ville,
                }
              );

              setData(response.data);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <section className="formdesign">
            <div className="design1">
              <input
                id="societe"
                type="text"
                placeholder="Société"
                value={societe}
                onChange={(event) => {
                  setsociete(event.target.value);
                }}
              />
              <input
                id="prenom"
                type="text"
                placeholder="Prénom *"
                value={prenom}
                required
                onChange={(event) => {
                  setprenom(event.target.value);
                }}
              />
              <input
                id="mail"
                type="email"
                placeholder="Adress email *"
                value={mail}
                required
                onChange={(event) => {
                  setmail(event.target.value);
                }}
              />
              <input
                id="rue"
                type="text"
                placeholder="Rue *"
                value={rue}
                required
                onChange={(event) => {
                  setrue(event.target.value);
                }}
              />
              <input
                id="pays"
                type="text"
                placeholder="Pays *"
                value={pays}
                required
                onChange={(event) => {
                  setpays(event.target.value);
                }}
              />
              <label id="birthday" htmlFor="date-Naissance">
                Date de naissance *
              </label>
              <input
                id="date-Naissance"
                type="date"
                value={dateOfBirth}
                required
                onChange={(event) => {
                  setdateOfBirth(event.target.value);
                }}
              />
            </div>
            <div className="design2">
              <input
                id="nom"
                type="text"
                placeholder="Nom de famille *"
                value={nom}
                required
                onChange={(event) => {
                  setnom(event.target.value);
                }}
              />
              <div id="tel">
                <div id="codeP">
                  <label id="code" htmlFor="code-pays">
                    code pays
                  </label>
                  <input
                    type="text"
                    id="code-pays"
                    placeholder="+33"
                    value={codePays}
                    onChange={(event) => {
                      setcodePays(event.target.value);
                    }}
                  />
                </div>

                <input
                  id="phone"
                  type="text"
                  placeholder="Numéro de téléphone"
                  value={phone}
                  required
                  onChange={(event) => {
                    setphone(event.target.value);
                  }}
                />
              </div>
              <div className="lieu">
                <input
                  id="codePostal"
                  type="text"
                  placeholder="Code postal *"
                  value={codePostal}
                  required
                  onChange={(event) => {
                    setcodePostal(event.target.value);
                  }}
                />
                <input
                  id="ville"
                  type="text"
                  placeholder="Ville *"
                  value={ville}
                  required
                  onChange={(event) => {
                    setville(event.target.value);
                  }}
                />
              </div>
            </div>
          </section>
          <div>
            <h2>VÉRIFIER ET RÉSERVER</h2>
            <hr />
            <div>
              <div className="resume1">
                <div>
                  <h4>{resa.description}</h4>
                  <p>{resa.lieu}</p>
                  <p>
                    {resa.dateAller} - {resa.dateretour}
                  </p>
                </div>
                <div>
                  <img src={resa.image} alt="" />
                </div>
              </div>

              <div>
                <h2>EXIGENCES POUR LES CONDUCTEURS</h2>
                <p>
                  conducteur âgé d'au moins
                  {resa.ageMin} ans
                </p>
              </div>
              <div>
                <h2>PÉRIODE DE LOCATION</h2>
                <p>
                  Durée de {resa.jourTotal} ( jours x {resa.prixjour} )
                </p>
                <span>{resa.prixTotal} €</span>
              </div>
              <div id="finaly">
                <h2 id="total">TOTAL</h2>
                <p id="finalPrice">{resa.prixTotal} €</p>
              </div>
              <hr />
              <p>
                En cliquant sue le bouton, je confirme que j'ai lu et accepté
                les informations de location et les termes et conditions.
              </p>
            </div>
          </div>
          {prenom &&
          mail &&
          rue &&
          pays &&
          nom &&
          phone &&
          codePostal &&
          ville ? (
            <button
              id="select2"
              type="submt"
              onClick={() => {
                openModal();
              }}
            >
              RÉSERVER
            </button>
          ) : (
            <button id="select2dis" type="submt">
              RÉSERVER
            </button>
          )}
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={"Example Modal"}
      >
        <div className="modal2">
          <div className="closeIt">
            <div></div>
            <a href="">
              <button onClick={handleClick} href="/Home" id="closeIt">
                X
              </button>
            </a>
          </div>

          <h2>RÉSERVATION CONFIRMÉE</h2>
          <p>Voici la référence de votre dossier:</p>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default Personnaldetails;
