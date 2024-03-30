import { useContext } from "react";
import Player_card from "../player_card/player_card";
import styles from "./hero_left.module.css";
import data_context from "../../context/data_context/data_context";
import socket_context from "../../context/socket_context/socket_context";

const Hero_left = () => {
  const { data } = useContext(data_context);
  const { selected } = useContext(socket_context);

  return (
    <div className={styles.frame}>
      <div className={styles["text-wrapper"]}>PLAYERS</div>
      {/* <Player_card name="addme" role="hentai" />
      <Player_card name="addme" role="hentai" /> */}
      <div className={styles.player_cards}>
        {data.map(({ name, email, role, position, image }, i) => {
          if (position != "leader") {
            return (
              <Player_card
                name={name}
                role={role}
                key={email}
                index={i}
                clickable={true}
                selected={i === selected}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Hero_left;
