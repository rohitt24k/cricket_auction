/* eslint-disable react/prop-types */
import styles from "./player_card.module.css";

const Player_card = ({ name, position }) => {
  return (
    <div className={styles.frame}>
      <div className={styles.name_img_container}>
        <div className={styles.rectangle} />
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.position}>{position}</div>
    </div>
  );
};

export default Player_card;
