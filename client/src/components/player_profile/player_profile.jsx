import { useContext, useEffect, useLayoutEffect } from "react";
import styles from "./player_profile.module.css";
import data_context from "../../context/data_context/data_context";
import socket_context from "../../context/socket_context/socket_context";

const Player_profile = ({ setSold }) => {
  const { data } = useContext(data_context);
  const { selected } = useContext(socket_context);
  const { name, department, year, role, sold = false } = data[selected];
  useLayoutEffect(() => {
    setSold(sold);
  });
  return (
    <div className={styles.frame}>
      {/* a image will be here */}
      <div className={styles.player_img}></div>
      <section className={styles.player_details}>
        <p className={styles.player_name}>
          Name: <span>{name}</span>
        </p>
        <p className={styles.player_dept}>
          Dept: <span>{department}</span>
        </p>
        <p className={styles.player_year}>
          Year: <span>{year}</span>
        </p>
        <p className={styles.player_role}>
          Role: <span>{role}</span>
        </p>
      </section>
    </div>
  );
};

export default Player_profile;
