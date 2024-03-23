import { useContext } from "react";
import Bid_points from "../bid_points/bid_points";
import Player_card from "../player_card/player_card";
import styles from "./hero_right.module.css";
import user_context from "../../context/user_context/user_context";
import Hero_right_viewer from "../hero_right_viewer/hero_right_viewer";

const Hero_right = () => {
  const { userType } = useContext(user_context);

  if (userType == "viewer" || userType == "organizer") {
    return <Hero_right_viewer />;
  } else {
    return (
      <div className={styles.frame}>
        <div className={styles.player_card}>
          <div className={styles["text-wrapper"]}>YOUR TEAM</div>
          <Player_card name="Rohit" role="All Rounder" />
          <Player_card name="Anubhav" role="Bowler" />
          <Player_card name="player" role="Batsman" />
        </div>
        <div className={styles.bid}>
          <Bid_points />
        </div>
      </div>
    );
  }
};

export default Hero_right;
