import { useContext, useState } from "react";
import Player_profile from "../player_profile/player_profile";
import styles from "./hero_main.module.css";
import data_context from "../../context/data_context/data_context";
import Team_bid from "../team_bid/team_bid";

const Hero_main = () => {
  const { team } = useContext(data_context);
  const [sold, setSold] = useState(false);
  return (
    <div className={styles.frame}>
      <Player_profile setSold={setSold} />
      <div className={styles.team_bid}>
        {team.map(({ name }) => (
          <Team_bid name={name} key={name} />
        ))}
      </div>
      {sold && (
        <div className={styles.sold_img}>
          <img src="./R.png" alt="sold_image" />
        </div>
      )}
    </div>
  );
};

export default Hero_main;
