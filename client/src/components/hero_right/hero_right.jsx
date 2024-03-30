import { useContext } from "react";
import Bid_points from "../bid_points/bid_points";
import Player_card from "../player_card/player_card";
import styles from "./hero_right.module.css";
import user_context from "../../context/user_context/user_context";
import Hero_right_viewer from "../hero_right_viewer/hero_right_viewer";
import data_context from "../../context/data_context/data_context";

const Hero_right = () => {
  const { userType, team_name } = useContext(user_context);
  const { team } = useContext(data_context);

  if (userType == "viewer" || userType == "organizer") {
    return <Hero_right_viewer />;
  } else {
    return (
      <div className={styles.frame}>
        <div className={styles.player_card}>
          <div className={styles["text-wrapper"]}>YOUR TEAM</div>
          {team
            .find((d) => {
              return d.name === team_name;
            })
            .players.map(({ name, role, sold_price }, i) => (
              <Player_card
                name={name}
                role={role}
                sold_price={sold_price}
                key={i}
              />
            ))}
          {/* <Player_card name="Rohit" role="All Rounder" />
          <Player_card name="Anubhav" role="Bowler" />
          <Player_card name="player" role="Batsman" /> */}
        </div>
        <div className={styles.bid}>
          <Bid_points />
        </div>
      </div>
    );
  }
};

export default Hero_right;
