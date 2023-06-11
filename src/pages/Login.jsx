import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ gestion }) => {
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  return (
    <div>
      <h3>Se connecter</h3>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");

          try {
            const response = await axios.post(
              "http://localhost:3000/user/connexion",
              {
                password: password,
              }
            );
            if (response.data._id) {
              gestion(response.data._id);
              navigate("/Backoffice");
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
