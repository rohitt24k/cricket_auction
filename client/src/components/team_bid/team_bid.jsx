import { useContext } from "react";
import styles from "./team_bid.module.css";
import socket_context from "../../context/socket_context/socket_context";

const Team_bid = ({ name }) => {
  const { current_player_bid } = useContext(socket_context);
  return (
    <div className={styles.main_frame}>
      <div className={styles.frame}>
        {name}
        <div>{current_player_bid[name]}</div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default Team_bid;
