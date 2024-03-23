/* eslint-disable react/prop-types */
import { useContext } from "react";
import styles from "./player_card.module.css";
import user_context from "../../context/user_context/user_context";
import data_context from "../../context/data_context/data_context";
import socket_context from "../../context/socket_context/socket_context";

const Player_card = ({ name, role, index, clickable = false }) => {
  const { userType } = useContext(user_context);
  const { handle_selected_player_change } = useContext(socket_context);

  return (
    <div
      className={styles.frame}
      onClick={() => {
        if (clickable && userType == "organizer") {
          handle_selected_player_change(index);
        }
      }}
    >
      <div className={styles.name_img_container}>
        <div className={styles.rectangle} />
        <div className={styles.name}>{name.split(" ")[0]}</div>
      </div>
      <div className={styles.position}>{role}</div>
    </div>
  );
};

export default Player_card;
