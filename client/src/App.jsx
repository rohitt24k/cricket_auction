// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Background from "./components/background/background";
import Header from "./components/header/header";
import Hero_left from "./components/hero_left/hero_left";
import Hero_right from "./components/hero_right/hero_right";

function App() {
  return (
    <div>
      <Background />
      <Header />
      <main id="hero_main">
        <Hero_left />
        <Hero_right />
      </main>
    </div>
  );
}

export default App;
