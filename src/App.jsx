import { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Offerlist from "./pages/Offerlist";
import Header from "./components/Header";
import Personnaldetails from "./pages/Personnaldetails";
import "./App.css";
import Backoffice from "./pages/Backoffice";
import Cookies from "js-cookie";

function App() {
  const [search, setsearch] = useState("");
  const [pickupDate, setpickupDate] = useState("");
  const [returnDate, setreturnDate] = useState("");
  const [id, setid] = useState("");
  const [carid, setcarid] = useState([]);
  const [barre, setbarre] = useState(false);
  const [resa, setresa] = useState("");
  const [_id, set_id] = useState(Cookies.get("_idSite") || null);

  const gestion = (_id) => {
    if (_id) {
      set_id(_id);
      Cookies.set("TokenSite", _id, { expires: 7 });
    } else {
      set_id(null);
      Cookies.remove("_idSite");
    }
  };
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setsearch={setsearch}
                pickupDate={pickupDate}
                setpickupDate={setpickupDate}
                returnDate={returnDate}
                setreturnDate={setreturnDate}
                id={id}
                setid={setid}
                barre={barre}
                setbarre={setbarre}
              />
            }
          />
          <Route
            path="/Offerlist"
            element={
              <Offerlist
                search={search}
                setsearch={setsearch}
                pickupDate={pickupDate}
                setpickupDate={setpickupDate}
                returnDate={returnDate}
                setreturnDate={setreturnDate}
                id={id}
                setid={setid}
                carid={carid}
                setcarid={setcarid}
                resa={resa}
                setresa={setresa}
                setbarre={setbarre}
                barre={barre}
              />
            }
          />
          <Route
            path="/personnaldetails"
            element={
              <Personnaldetails resa={resa} setresa={setresa} carid={carid} />
            }
          />
          <Route path="/backoffice" element={<Backoffice />} />
          <Route path="/login" element={<Login gestion={gestion} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
