import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function Config() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          ` https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create
              `,
          {
            paylaod: {
              offerId: "971bca92-244b-4737-b1aa-3af3bde9e6f8-CLAR",
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
    fetchData();
  }, []);

  return <div></div>;
}

export default Config;
