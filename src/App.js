import NavBar from "./components/Nav/NavBar";
import ShopContainer from "./components/ShopContainer/ShopContainer";
import NoMatch from "./components/NoMatch";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  let navigate = useNavigate();
  const routeChange = (path) => {
    let newPath = path;
    navigate(newPath);
  };

  const loginSubmit = (userData) => {
    setUser(userData);
    routeChange("shop");
  };

  return (
    <>
      <NavBar routeChange={routeChange} />
      <div className="container">
        <Routes>
          <Route index element={<ShopContainer />} />
          <Route
            path="shop"
            element={<ShopContainer user={user} routeChange={routeChange} />}
          />
          <Route
            path="login"
            element={
              <LoginSignUp
                user={user}
                onSubmit={loginSubmit}
                routeChange={routeChange}
              />
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
