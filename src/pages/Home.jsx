import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Moteur from "../components/Moteur";
import premiere from "../assets/premiere.jpeg";
import deux from "../assets/deuxieme.jpeg";
import trois from "../assets/dernierre.jpeg";
import world from "../assets/sixt-in-the-world.png";
import Footer from "../components/Footer";

const Home = ({
  search,
  setid,
  id,
  setsearch,
  setpickupDate,
  pickupDate,
  returnDate,
  setreturnDate,
  barre,
  setbarre,
}) => {
  const [data, setData] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` http://localhost:3000/?q=${search}
          `
        );

        setData(response.data);
        setChargement(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return chargement ? (
    <p>Chargement en cours...</p>
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
      <section className="carousel" aria-label="Gallery">
        <ol className="carousel__viewport">
          <li id="carousel__slide1" tabIndex="0" className="carousel__slide">
            <div className="carousel__snapper">
              <img src={premiere} alt="" />
              <a href="#carousel__slide4" className="carousel__prev"></a>
              <a href="#carousel__slide2" className="carousel__next"></a>
            </div>
          </li>
          <li id="carousel__slide2" tabIndex="0" className="carousel__slide">
            <div className="carousel__snapper">
              <img src={deux} alt="" />
            </div>
            <a href="#carousel__slide1" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide3" className="carousel__next">
              Go to next slide
            </a>
          </li>

          <li id="carousel__slide3" tabIndex="0" className="carousel__slide">
            <div className="carousel__snapper">
              <img src={trois} alt="" />
            </div>
            <a href="#carousel__slide2" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide1" className="carousel__next">
              Go to first slide
            </a>
          </li>
        </ol>
      </section>
      <div className="world">
        <img src={world} alt="" />
      </div>
      <div className="reseau">
        <h4>TÉLÉCHARGER L'APP SIXT</h4>

        <div className="logo">
          <div id="apple">
            <p> App Store</p>
          </div>
          <div id="google">
            <p>▶︎ Google play</p>
          </div>
        </div>
        <h4>SUIVEZ-NOUS</h4>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
