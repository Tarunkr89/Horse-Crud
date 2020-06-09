import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import HorseDetail from "./pages/HorseDetail";
import EditDetail from "./pages/EditDetail";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";
import "./App.css";
import "./Intercepter";

function App(props) {
  const existingToken = JSON.parse(localStorage.getItem("token"));
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/horse-detail" component={EditDetail} />
          <PrivateRoute path="/create-horse" component={HorseDetail} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
