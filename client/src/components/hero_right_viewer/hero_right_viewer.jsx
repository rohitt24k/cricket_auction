/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import styles from "./hero_right_viewer.module.css";
import data_context from "../../context/data_context/data_context";
import Player_card from "../player_card/player_card";
import user_context from "../../context/user_context/user_context";
import Bid_points from "../bid_points/bid_points";

const Hero_right_viewer = () => {
  const Team = ({ name, players }) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <div
          className={styles.team_frame}
          onClick={() => {
            setShow((p) => !p);
          }}
        >
          <h3>
            <div className={styles.name}>
              <span>{name}</span>
              <span>{show && (players?.length || 0) + "/17"}</span>
            </div>
            <div className={`${styles.dropdown} ${show && styles.active}`}>
              {">"}
            </div>
          </h3>
        </div>
        {show &&
          players?.map(({ name, role, image, department, year }, i) => (
            <Player_card
              name={name}
              role={role}
              image={image}
              department={department}
              year={year}
              key={-i}
            />
          ))}
      </>
    );
  };

  const { team } = useContext(data_context);
  return (
    <>
      <div className={styles.frame}>
        <div className={styles.inner_frame}>
          {team.map(({ name, players }, i) => (
            <Team name={name} players={players} key={i} />
          ))}
        </div>
        <Bid_points />
      </div>
    </>
  );
};

export default Hero_right_viewer;
