// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import "./App.css";
import axios from "axios";
import Background from "./components/background/background";
import Header from "./components/header/header";
import Hero_left from "./components/hero_left/hero_left";
import Hero_right from "./components/hero_right/hero_right";
import User_context_provider from "./context/user_context/user_context_provider";
import Data_context_provider from "./context/data_context/data_context_provider";
import Hero_main from "./components/hero_main/hero_main";
import Hero_right_viewer from "./components/hero_right_viewer/hero_right_viewer";
import { useContext } from "react";
import Socket_context_provider from "./context/socket_context/socket_context_provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Player_detail_upload from "./components/player_detail_upload/player_detail_upload";

function App() {
  axios.get("https://cricket-auction-api.vercel.app/api/").then((data) => {
    console.log(data);
  });
  // axios.get("http://localhost:3000/api/").then((data) => {
  //   console.log(data);
  // });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Data_context_provider>
                <User_context_provider>
                  <Socket_context_provider>
                    <Background />
                    <Header />
                    <main id="hero_main">
                      <Hero_left />
                      <Hero_main />
                      <Hero_right />
                    </main>
                  </Socket_context_provider>
                </User_context_provider>
              </Data_context_provider>
            }
          />
          <Route path="/admin" element={<Player_detail_upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
