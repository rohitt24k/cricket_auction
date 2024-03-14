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

function App() {
  axios.get("http://localhost:3000/api/").then((data) => {
    console.log(data);
  });
  return (
    <div>
      <User_context_provider>
        <Data_context_provider>
          <Background />
          <Header />
          <main id="hero_main">
            <Hero_left />
            <Hero_right />
          </main>
        </Data_context_provider>
      </User_context_provider>
    </div>
  );
}

export default App;
