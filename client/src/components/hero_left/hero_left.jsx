import Player_card from "../player_card/player_card";
import styles from "./hero_left.module.css";

const Hero_left = () => {
  return (
    <div className={styles.frame}>
      <div className={styles["text-wrapper"]}>YOUR TEAM</div>
      <Player_card name="addme" position="hentai" />
      <Player_card name="addme" position="hentai" />
    </div>
  );
};

export default Hero_left;
