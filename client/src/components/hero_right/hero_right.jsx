import Player_card from "../player_card/player_card";
import styles from "./hero_right.module.css";

const Hero_right = () => {
  return (
    <div className={styles.frame}>
      <div className={styles["text-wrapper"]}>YOUR TEAM</div>
      <Player_card name="Rohit" position="All Rounder" />
      <Player_card name="Anubhav" position="Bowler" />
      <Player_card name="player" position="Batsman" />
    </div>
  );
};

export default Hero_right;
